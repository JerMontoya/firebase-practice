// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Lj9tVoLWV7AMPwGdjpm_y0hP8e4iupA",
  authDomain: "fir-practice-68a46.firebaseapp.com",
  projectId: "fir-practice-68a46",
  storageBucket: "fir-practice-68a46.firebasestorage.app",
  messagingSenderId: "653989057618",
  appId: "1:653989057618:web:5ad7bec69035317e11fb8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();