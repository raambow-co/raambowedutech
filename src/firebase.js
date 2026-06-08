// ─── Firebase Configuration ──────────────────────────────────────
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "RaamBow LMS"
// 3. Go to Project Settings (⚙️) → "Your apps" → Add Web App (</>)
// 4. Copy the firebaseConfig object and paste your values below
// 5. In Firebase Console → Authentication → Sign-in method:
//    → Enable "Email/Password"
//    → Enable "Google"

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDaD8WD-vov26-mRWjWi0cFriVOEEN3sWY",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "raambow-lms.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID || "raambow-lms",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "raambow-lms.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "107262227848",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID || "1:107262227848:web:3d6e35355fcc3194c3363d",
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2EKTDFE2CE",
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export {
  auth,
  db,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp
};
