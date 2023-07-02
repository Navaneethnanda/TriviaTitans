// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlXsqdPwMQWXUFsHf4u5CkNTctcyPRNmY",
  authDomain: "serverless-551e0.firebaseapp.com",
  projectId: "serverless-551e0",
  storageBucket: "serverless-551e0.appspot.com",
  messagingSenderId: "1003656375713",
  appId: "1:1003656375713:web:c657cfbb2436c9e6b86fe0",
  measurementId: "G-BXRXS9M884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;