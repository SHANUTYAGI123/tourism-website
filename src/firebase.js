// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCEsHOPkcr_8lCv3IJ0Fepcq6QbWr26fc",
  authDomain: "tourism-website-691fc.firebaseapp.com",
  projectId: "tourism-website-691fc",
  storageBucket: "tourism-website-691fc.firebasestorage.app",
  messagingSenderId: "995225504891",
  appId: "1:995225504891:web:1b844de98dcc02d2ace6de",
  measurementId: "G-H497WW3K0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and Auth
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-in function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    throw error;
  }
};