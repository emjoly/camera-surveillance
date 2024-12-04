import { initializeApp } from "firebase/app";
import firebaseConfig from "/./code/config";
import { getStorage } from "firebase/storage";

// Initialiser l'appli Firebase
const app = initializeApp(firebaseConfig);

// Storage
export const stockage = getStorage(app);