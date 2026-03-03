// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXgqVifesowidcPgeH1L3Z6nXOAudah3Q",
  authDomain: "innovation-one-4de73.firebaseapp.com",
  projectId: "innovation-one-4de73",
  storageBucket: "innovation-one-4de73.firebasestorage.app",
  messagingSenderId: "548925442300",
  appId: "1:548925442300:web:90d4854934c96efbb92f79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);