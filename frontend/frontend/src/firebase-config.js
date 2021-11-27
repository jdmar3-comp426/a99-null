import { initializeApp } from "firebase/app";  // creates connection
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
import { useRef } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBTcV6Gz8j34oH1JpX49ZQaRNafIe3xCQk",
    authDomain: "dev-9ba72.firebaseapp.com",
    projectId: "dev-9ba72",
    storageBucket: "dev-9ba72.appspot.com",
    messagingSenderId: "426621217106",
    appId: "1:426621217106:web:d8c01ed2260c88bded328b",
    measurementId: "G-2NRY2H64WD"
};
  
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

