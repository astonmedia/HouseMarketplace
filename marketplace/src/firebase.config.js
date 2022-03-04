// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/store"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmEiBwP7EEXDV_8H1Y0TKDqKYZSMv6iWI",
  authDomain: "house-marketplace-app-74bb3.firebaseapp.com",
  projectId: "house-marketplace-app-74bb3",
  storageBucket: "house-marketplace-app-74bb3.appspot.com",
  messagingSenderId: "325938109090",
  appId: "1:325938109090:web:42ed9e815dba87c4f615fb",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
