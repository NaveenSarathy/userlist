// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXtPlbjrkc2xxFIqTYy7k87hGI-EO-Y6Y",
  authDomain: "userlist-846ee.firebaseapp.com",
  projectId: "userlist-846ee",
  storageBucket: "userlist-846ee.firebasestorage.app",
  messagingSenderId: "761617287576",
  appId: "1:761617287576:web:8674c229e0db86fb9303ed",
  measurementId: "G-7DV6S7XY4M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
