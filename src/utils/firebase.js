// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  query,
  getDoc,
  getDocs,
  doc,
  collection,
  where,
} from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
=======
import { getApps, getApp, initializeApp  } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
>>>>>>> 0643571cdc2dc44168fc0573dc04c1eac357c608
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyAdo4Q5xZGEZjtwUVp1oJu1scggfj27zvg",
  authDomain: "bubbleteasort.firebaseapp.com",
  projectId: "bubbleteasort",
  storageBucket: "bubbleteasort.appspot.com",
  messagingSenderId: "336002245704",
  appId: "1:336002245704:web:91738e83d46b2e21e1e47d",
=======
  apiKey: "AIzaSyCxEVmGF2VmWalbmhYnFMpgimOJpG4-C78",
  authDomain: "bubbleteasort-vmp.firebaseapp.com",
  projectId: "bubbleteasort-vmp",
  storageBucket: "bubbleteasort-vmp.appspot.com",
  messagingSenderId: "342421018353",
  appId: "1:342421018353:web:f568f585138821c78efb50"
>>>>>>> 0643571cdc2dc44168fc0573dc04c1eac357c608
};

// Initialise Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialise Firebase Auth
export const auth = initializeAuth(app, {
<<<<<<< HEAD
  persistence: getReactNativePersistence(AsyncStorage),
});
=======
  persistence: getReactNativePersistence(AsyncStorage)
})
>>>>>>> 0643571cdc2dc44168fc0573dc04c1eac357c608

// Initialise Cloud Firestore
export const db = getFirestore(app);

// Initialise Cloud Storage
export const storage = getStorage(app);
<<<<<<< HEAD

export const getStoreData = async (id) => {
  const q = query(doc(db, "Store", id));
  const querySnapshot = await getDoc(q);
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  }
  return null;
};

export const getPostData = async (id) => {
  const q = query(doc(db, "Post", id));
  const querySnapshot = await getDoc(q);
  if (querySnapshot.exists()) {
    return querySnapshot.data();
  }
  return null;
};

export const getPostDataByStoreID = async (id) => {
  const q = query(collection(db, "Post"), where("store_id", "==", id));
  const querySnapshot = await getDocs(q);
  const queriedPostData = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    queriedPostData.push(doc.data());
  });
  return queriedPostData;
};
=======
>>>>>>> 0643571cdc2dc44168fc0573dc04c1eac357c608
