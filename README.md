# 🪑 SitSpace

SitSpace is a web application built with the MERN stack (MongoDB, Express.js, React, Node.js) designed to help schools manage classroom seating plans easily and efficiently. Teachers and administrators can create, view, and manage dynamic seating arrangements for any number of classes and students.

---

## 🚀 Features

- Create and edit classroom seating charts  
- Assign students to specific seats  
- Store and retrieve data using MongoDB    

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Styling:** SCSS 
- **Version Control:** Git & GitHub  

---

## 📦 Installation

To get SitSpace running locally, make sure you have **Node.js**, **npm**, and **MongoDB** installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/slavikovq/SitSpace.git
cd SitSpace
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `server` folder and add the following:

```env
MONGODB_URL="your_mongodb_connection_string"
```

Replace `your_mongodb_connection_string` with your actual MongoDB URL.

### 4. Start the backend server

```bash
npm start
```


### 5. Install frontend dependencies

In a new terminal:

```bash
cd client
npm install
```

### 6. Start the frontend development server

```bash
npm run dev
```

> The frontend will run on `http://localhost:5176`

---

## 🧪 Example Use Cases

- A teacher wants to assign students to seats and visualize their arrangement.  

