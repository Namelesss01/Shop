// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdS234NWLJ1g7XzjbirlEr1i5He9zToeQ",
  authDomain: "shop-ff356.firebaseapp.com",
  projectId: "shop-ff356",
  storageBucket: "shop-ff356.firebasestorage.app",
  messagingSenderId: "791104732316",
  appId: "1:791104732316:web:0bdcf610197042a5af8159",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // инициализация проекта Firesbase

const db = getFirestore(); //  инициализация и подключение к бд
const auth = getAuth(app); // инициализация аутентификации(авторизации системы верификации)
const storage = getStorage(app); // инициализация хранилища

export { db, auth, storage };
