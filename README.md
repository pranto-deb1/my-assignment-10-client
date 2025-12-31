# Local Food Lovers

## Live Website

[https://leafy-croissant-a86748.netlify.app/](https://leafy-croissant-a86748.netlify.app/)

## Project Description

**Local Food Lovers** is a blog platform where users can share their food experiences, post reviews, and connect with others who love local cuisine. The platform is fully responsive, secure, and provides role-based access for Admins, Creators, and Users.

## Key Features

- Firebase authentication for secure login and registration
- Create, edit, and manage reviews
- Fully responsive design for mobile, tablet, and desktop
- Dark/Light theme toggle with persistence
- Interactive sliders and carousels for content browsing

## Technologies Used

- **Frontend:** React, React DOM, React Router, Tailwind CSS, DaisyUI
- **Animations & UI Enhancements:** Framer Motion, Swiper.js, React Icons, React Toastify
- **Forms & Validation:** React Hook Form, React Datepicker
- **Backend & Auth:** Firebase (Authentication, Firestore, Storage)
- **Build Tools:** Vite

## Dependencies

- react
- react-dom
- react-router-dom
- firebase
- react-hook-form
- react-datepicker
- framer-motion
- react-icons
- react-toastify
- three
- swiper
- tailwindcss
- daisyui

## Installation & Running Locally

1. **Clone the repository**  
   "git clone https://github.com/YourUsername/local-food-lovers.git"

2. **Navigate to the project directory**
   "cd local-food-lovers"

3. **Install dependencies**
   "npm install"

4. **Set up Firebase**
   _Go to Firebase Console and create a new project._
   _Enable Authentication (Email/Password login) and Firestore Database._
   _Copy your Firebase configuration._
   _Create a .env file in the project root and add your Firebase config:_

VITE_API_KEY="Your api key"
VITE_AUTHDOMAIN="auth domain"
VITE_PROJECT_ID="your project id"
VITE_STORAGE_BUCKET="storage bucket"
VITE_MESSAGING_SENDER_ID="your sender id"
VITE_APP_ID="your app id"

5. **Start the development server**
   "npm run dev"

6. **Open your browser and go to "http://localhost:5173"**
