// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHAkZz3-WOooqDTnz6SumFs6G_d2JfifI",
    authDomain: "netflix-clone-45a3a.firebaseapp.com",
    projectId: "netflix-clone-45a3a",
    storageBucket: "netflix-clone-45a3a.appspot.com",
    messagingSenderId: "991124360763",
    appId: "1:991124360763:web:f717a447b68ac6c7bdd61e"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app

export {auth, db}