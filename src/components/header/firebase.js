// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRXsqdtGfdr8q8nrNLE3RDMmhOyLZL5s8",
  authDomain: "movie-review-login.firebaseapp.com",
  projectId: "movie-review-login",
  storageBucket: "movie-review-login.appspot.com",
  messagingSenderId: "842495885419",
  appId: "1:842495885419:web:01fc4a00cf00d929e6312e",
  measurementId: "G-0RZLDC235H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
