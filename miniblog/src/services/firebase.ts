import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDT42tOxRLNEveUShvFdZsNBdm5ZaIPeUA",
	authDomain: "miniblog-79ce8.firebaseapp.com",
	projectId: "miniblog-79ce8",
	storageBucket: "miniblog-79ce8.appspot.com",
	messagingSenderId: "916888053775",
	appId: "1:916888053775:web:27f7a9f8f7a0426ba71b7a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
