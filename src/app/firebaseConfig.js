// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyANt17azoMd9huKWjaIUHvnrAXypai5YqE",
  authDomain: "pantry-tracker-763c9.firebaseapp.com",
  projectId: "pantry-tracker-763c9",
  storageBucket: "pantry-tracker-763c9.appspot.com",
  messagingSenderId: "1000820833366",
  appId: "1:1000820833366:web:4532b9043c7e9d1c0d0ff7",
  measurementId: "G-735576JXE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(db);
export { db };

