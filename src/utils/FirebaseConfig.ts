// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMlzxmI6IgVx08lWHrwctPCPFkUd_knY4",
  authDomain: "flickzoom-7407d.firebaseapp.com",
  projectId: "flickzoom-7407d",
  storageBucket: "flickzoom-7407d.appspot.com",
  messagingSenderId: "425203543094",
  appId: "1:425203543094:web:aa2c8c2aeb3e613fc03c97",
  measurementId: "G-8EDX9RVM7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)

export const userRef = collection(firebaseDB, "users")