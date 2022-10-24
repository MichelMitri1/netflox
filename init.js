import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMjsjaCri63Iy9-Lg36LbNDjSPmlGPHjQ",
  authDomain: "netflix-clone-ed541.firebaseapp.com",
  projectId: "netflix-clone-ed541",
  storageBucket: "netflix-clone-ed541.appspot.com",
  messagingSenderId: "820080006174",
  appId: "1:820080006174:web:b9979841493925f2e24a0f",
  measurementId: "G-PT2J26NX10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth();
export const db = getFirestore();