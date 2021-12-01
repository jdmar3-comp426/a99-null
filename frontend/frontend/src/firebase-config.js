import { initializeApp } from "firebase/app";  // creates connection
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'
import { useRef } from "react";

const firebaseConfig = {
    ///* Peter api
    apiKey: "AIzaSyBfwGCiKlsdHW83GtoVDCHCr1R4ZXUiwME",
    authDomain: "project-test-c81c1.firebaseapp.com",
    databaseURL: "https://project-test-c81c1-default-rtdb.firebaseio.com",
    projectId: "project-test-c81c1",
    storageBucket: "project-test-c81c1.appspot.com",
    messagingSenderId: "1057503905122",
    appId: "1:1057503905122:web:455c6ee459825f9e45d83b"
    //*/
//    // Han api
//     apiKey: "AIzaSyBfwGCiKlsdHW83GtoVDCHCr1R4ZXUiwME",
//     authDomain: "project-test-c81c1.firebaseapp.com",
//     projectId: "project-test-c81c1",
//     storageBucket: "project-test-c81c1.appspot.com",
//     messagingSenderId: "1057503905122",
//     appId: "1:426621217106:web:d8c01ed2260c88bded328b",
//     measurementId: "G-2NRY2H64WD"
};
  
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

