// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTja781DzOCIYKoUK-MgJ870pG45ZrNY0",
  authDomain: "travelapp-30169.firebaseapp.com",
  projectId: "travelapp-30169",
  storageBucket: "travelapp-30169.appspot.com",
  messagingSenderId: "54123122307",
  appId: "1:54123122307:web:08c82916d7fd60a82615b6",
  measurementId: "G-NR7B5R36BV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  db = getFirestore(app);