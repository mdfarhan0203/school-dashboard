// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDliRKjztuLxwqjWPtH4cipz2VK9iIP8Ec",
  authDomain: "school-dasgboard.firebaseapp.com",
  projectId: "school-dasgboard",
  storageBucket: "school-dasgboard.appspot.com",
  messagingSenderId: "493528133767",
  appId: "1:493528133767:web:df0ca13a6542d8882d0822",
  measurementId: "G-ST7XJRB6SH",
  // i have added
  databaseURL:"https://school-dasgboard-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app)
