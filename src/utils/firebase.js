// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp  } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxEVmGF2VmWalbmhYnFMpgimOJpG4-C78",
  authDomain: "bubbleteasort-vmp.firebaseapp.com",
  projectId: "bubbleteasort-vmp",
  storageBucket: "bubbleteasort-vmp.appspot.com",
  messagingSenderId: "342421018353",
  appId: "1:342421018353:web:f568f585138821c78efb50"
};

// Initialise Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialise Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

// Initialise Cloud Firestore
export const db = getFirestore(app);

// Initialise Cloud Storage
export const storage = getStorage(app);
