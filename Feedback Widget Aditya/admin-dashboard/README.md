# To install & start the project do: 
rm -rf node_modules package-lock.json
npm install
npm run start

# Admin Dashboard - Feedback Management System  

A React.js Admin Dashboard for managing feedback questions, allowing admins to:  
✅ Sign Up & Login 🔑  
✅ View All Feedback Questions 📜  
✅ Add, Edit, Delete Questions ✏️ ❌  
✅ Publish & Unpublish Questions 📢  
✅ View Feedback Responses 📊  

This system interacts with a Node.js API using Axios for authentication and CRUD operations.  

---

### 🔐 Authentication  
- Admin Signup & Login using JWT-based authentication  
- Secure API requests with auth tokens stored in localStorage  
- Prevents unauthorized access  

### ❓ Manage Questions  
- View all feedback questions in a list  
- Add new questions with different answer types:  
  - ✅ Yes/No (Boolean)  
  - 📝 Description (Text)  
  - ⭐ Rating (Number)  
- Edit existing questions  
- Delete questions  

### 📢 Publish / Unpublish Questions  
- Admins can toggle the publish status  
- Published questions are visible to users  

### 📊 View Feedback Responses  
- Displays responses collected from users  

---

## 🛠 Tech Stack  

### 🔹 Frontend (React.js)
- React.js for UI  
- React Router for navigation  
- Axios for API requests  
- SCSS for styling  

### 🔹 Backend
- Node.js + Express.js  
- MongoDB (Database)  

---

## 📂 Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 Signup.js
 ┃ ┣ 📜 Login.js
 ┃ ┣ 📜 ManageQuestions.js
 ┃ ┣ 📜 ViewFeedback.js
 ┣ 📂 styles
 ┃ ┣ 📜 Signup.scss
 ┃ ┣ 📜 Login.scss
 ┃ ┣ 📜 ManageQuestions.scss
 ┃ ┗ 📜 ViewFeedback.scss
 ┣ 📜 App.js
 ┗ 📜 index.js
```

---

## 🔥 API Endpoints  

### 🔐 Authentication
- Signup: `POST /api/v1/register-admin`  
- Login: `POST /api/v1/login`  

### ❓ Manage Questions
- Get all questions: `GET /api/v1/questions`  
- Add a question: `POST /api/v1/questions`  
- Edit a question: `PUT /api/v1/questions/:id`  
- Delete a question: `DELETE /api/v1/questions/:id`  
- Publish/Unpublish a question: `PUT /api/v1/questions/:id` (with `published: true/false`)  

### 📊 View Feedback
- Get feedback responses: `GET /api/v1/feedbacks`  

---

## 🖥 Usage  

### 🔐 Admin Signup & Login  
1. Sign up using name, email, password, and confirm password  
2. If signup is successful, log in with email and password  
3. After login, admins can manage questions  

### ❓ Managing Questions  
1. Add new questions by entering text and selecting the answer type  
2. Edit existing questions by clicking "Edit"  
3. Delete questions by clicking "Delete"  

### 📢 Publishing & Unpublishing Questions  
1. Click "Publish" to make a question visible  
2. Click "Unpublish" to hide it  

### 📊 Viewing Feedback Responses  
1. Navigate to the View Feedback page  
2. See user-submitted responses  

---

## 🎨 Screenshots  

### 📌 Signup Page  
![Signup Page](https://drive.google.com/file/d/18k-x508MHhXivGAtbhf0RyuEpuoOA6pY/view?usp=sharing)  

### 📌 Login Page  
![Login Page](https://drive.google.com/file/d/1nu_TS3nO0vCM5_AlLYq4TFbpyFYGfymv/view?usp=sharing)  

### 📌 Dashboard
![Dashboard] (https://drive.google.com/file/d/1ju4xnk6rjvbpelDQDtNPqk829e3_eGR_/view?usp=sharing)

### 📌 Manage Questions  
![Manage Questions](https://drive.google.com/file/d/1wXwnkHXhsYJ2vKvp_zXmIRMQsXEz6jGn/view?usp=drive_link)  

### 📌 View Feedback  
![View Feedback](https://drive.google.com/file/d/1DfufoB74XeFlpGi9YimZPNJEBob4xpax/view?usp=sharing)  

---

### 💡 Need Help?
If you have any issues, feel free to create an issue on the repository or contact me. 🚀  