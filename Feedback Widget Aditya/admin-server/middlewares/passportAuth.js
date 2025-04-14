const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const passport = require('passport');

var jwtStrategyOptions = {}

jwtStrategyOptions.jwtFromRequest = function (req) {
  var token = null;
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  }
  return token;
};
jwtStrategyOptions.secretOrKey = process.env.JWT_SECRET_KEY;

const jwtTokenGenerator = (payload) => {
  let token = jwt.sign({
    data: payload
  }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
  return token
}

passport.use(new JwtStrategy(jwtStrategyOptions, function (jwt_payload, done) {
  return done(null, jwt_payload.data);
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// ===================   Middlewares for auth   =====================
const auth = passport.authenticate("jwt", {session: false})

const adminAuth = async (req, res, next) => {
  try {
    let user = req.user
    if (user.role !== 'admin') {
      throw new Error("")
    } else {
      next()
    }
  } catch (err) {
    res.send("Unauthorized access").status(403);
  }
  
}

module.exports = {
  auth,
  adminAuth,
  jwtTokenGenerator
};