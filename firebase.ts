// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL1wabd3uFCcqUl3h4eovuIUqDQdwW_Ns",
    authDomain: "goodbooks-617fb.firebaseapp.com",
    projectId: "goodbooks-617fb",
    storageBucket: "goodbooks-617fb.appspot.com",
    messagingSenderId: "840324907933",
    appId: "1:840324907933:web:523398059322808a24a574"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);