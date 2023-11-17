import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZZvsHLzSEEb3vtwetZonvwsFlCrL_lGg",
  authDomain: "anu1o-firebasecourse.firebaseapp.com",
  projectId: "anu1o-firebasecourse",
  storageBucket: "anu1o-firebasecourse.appspot.com",
  messagingSenderId: "1125319775",
  appId: "1:1125319775:web:b7e9cb5947cd947aa2c7ea",
  measurementId: "G-T70PQP8ZWH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
