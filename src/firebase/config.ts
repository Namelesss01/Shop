// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1vgjrblWl3-64tnSuZW8VuaY_ydnsEdg",
  authDomain: "musicplay-bda81.firebaseapp.com",
  projectId: "musicplay-bda81",
  storageBucket: "musicplay-bda81.appspot.com",
  messagingSenderId: "861393610584",
  appId: "1:861393610584:web:2638bbe99a2f431a4da72d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(); //  инициализация и подключение к бд
const auth = getAuth(app); // инициализация аутентификации(авторизации системы верификации)
const storage = getStorage(app); // инициализация хранилища

export { db, auth, storage };
