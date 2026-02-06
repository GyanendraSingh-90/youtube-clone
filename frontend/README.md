#  YouTube Clone – Frontend (React)

This is the **frontend** of the YouTube Clone project built using **React** as part of a Full Stack MERN Capstone Project.  
It consumes REST APIs from the backend to display videos, play videos, manage authentication, and show channels.

---

##  Tech Stack

- **React (Vite)**
- **React Router DOM**
- **Axios**
- **CSS (Responsive Grid Layout)**

---

## ✨ Features

-  User Login & Registration
-  Display videos in a responsive grid
-  Search videos by title
-  Play videos using YouTube embed / HTML5 video
-  Like & Dislike videos
-  View channel information
-  Fully responsive layout

---

##  Backend Connection

The frontend communicates with the backend using **Axios**.

**Base API URL** (configured in `api.js`):
http://localhost:5000/api

JWT tokens are stored in `localStorage` and automatically attached to requests.

---

##  Installation & Setup

###  Clone the repository

### Install dependencies 
npm install

### Start the development server
npm run dev