// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkBNPUcA0wKxM1D495-dlWZvPPHeSz8oc",
  authDomain: "hacktopia-3ae75.firebaseapp.com",
  projectId: "hacktopia-3ae75",
  storageBucket: "hacktopia-3ae75.appspot.com",
  messagingSenderId: "712792331897",
  appId: "1:712792331897:web:14381d253dad743e57e6a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db=getFirestore(app);
export default app;