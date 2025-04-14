const router = require("express").Router();
const userDb = require("../models/user.model");
const bcrypt = require("bcrypt");
const {jwtTokenGenerator} = require('../middlewares/passportAuth');

router
    .post("/login-admin", async (req, res) => {
        try {
            let user = await loginUser(req.body);
            let jwtToken = jwtTokenGenerator(user);
            let response = {
              success: true,
              data: {user, jwtToken}
            }
            return res.status(201).json(response);
          
        } catch (err) {
            return res.json({
                err: err.message,
            }).status(400)
        }
    })

    .post("/register-admin", async (req, res) => {
        try {
            let user = await registerAdminUser(req.body);
            let jwtToken = jwtTokenGenerator(user);
            let response = {
              success: true,
              data: {user, jwtToken}
            }
            return res.status(201).json(response);
          
        } catch (err) {
            return res.json({
                err: err.message,
            }).status(400)
        }
    })


// Helper funcsiont
registerAdminUser = async (userData) => {
    
    if (userData.password !== userData.confirmPassword)
        throw new Error("Passwords do not match.");

    userData.role = 'admin';
    const existingUser = await userDb.getUserByEmail(userData.email);
    if (existingUser) throw new Error("Email already in use.");

    const bcryptSalt = await bcrypt.genSalt(10);
    console.log(userData.password)
    const hashedPassword = await bcrypt.hash(userData.password, bcryptSalt);
    userData.password = hashedPassword;

    var newUser = await await userDb.createUser(userData);
    const { password, ...newUserData } = newUser._doc;

    return newUserData;
};

loginUser = async (userData) => {
    const existingUser = await userDb.getUserByEmail(userData.email);
    if (!existingUser) throw new Error("Account not found.");
    const isCorrectPassword = await bcrypt.compare(userData.password, existingUser.password);
    if (!isCorrectPassword) throw new Error("Entered Password is incorrect.");

    const isAdmin = existingUser.role === 'admin'
    if(!isAdmin) throw new Error("Unauthorized access to admin dashboard");

    const { password, ...user } = existingUser._doc;
    return user;
}

module.exports = router;
