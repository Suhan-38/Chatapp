import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCH6lpra0EAy9pv46wdiMZN92TVbOyVhUg",
  authDomain: "chatapp-98928.firebaseapp.com",
  projectId: "chatapp-98928",
  storageBucket: "chatapp-98928.appspot.com",
  messagingSenderId: "437675577063",
  appId: "1:437675577063:web:fa22cfd4f0fa41b48d5c42"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

