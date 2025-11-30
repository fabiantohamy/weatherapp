import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAbYdJXeXUVYM-fk2SfrE8dHBLdnW4evFU",
  authDomain: "weatherapp-4d117.firebaseapp.com",
  projectId: "weatherapp-4d117",
  storageBucket: "weatherapp-4d117.firebasestorage.app",
  messagingSenderId: "853450141276",
  appId: "1:853450141276:web:2c9201aa1670ce68f0c099"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);