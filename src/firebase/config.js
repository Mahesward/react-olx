// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyAyanUb3KDR-K0fOSeqwCCw9irARSSTvrc",
    authDomain: "olx-clone-5f7b7.firebaseapp.com",
    projectId: "olx-clone-5f7b7",
    storageBucket: "olx-clone-5f7b7.appspot.com",
    messagingSenderId: "491878631385",
    appId: "1:491878631385:web:f009683e0b753deb457bc8",
    measurementId: "G-GP31Y44L60"
};

export const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase);