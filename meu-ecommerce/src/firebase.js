import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-3AZ9C3iI6KvH1MGOzJAbcBWQtf87v4g",
    authDomain: "techbusiness-1ebaf.firebaseapp.com",
    projectId: "techbusiness-1ebaf",
    storageBucket: "techbusiness-1ebaf.firebasestorage.app",
    messagingSenderId: "484188311248",
    appId: "1:484188311248:web:b8591ed210d39030da58d5",
    measurementId: "G-M1TC178BWJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)