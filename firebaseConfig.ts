import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebaseAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOKTsptUvQyW8HSpoD2jdlqMJh1MMaOmE",
  authDomain: "addis-code.firebaseapp.com",
  projectId: "addis-code",
  storageBucket: "addis-code.firebasestorage.app",
  messagingSenderId: "78811583926",
  appId: "1:78811583926:web:eef251018f46cbf3f11d17",
  measurementId: "G-3F79XCK1BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebaseAuth.getAuth(app);
const db = getFirestore(app);
const googleProvider = new firebaseAuth.GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider };