import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8XmdLwGRxPGctJz20V1tPUBngV45ljhs",
  authDomain: "cosmicdream-web.firebaseapp.com",
  projectId: "cosmicdream-web",
  storageBucket: "cosmicdream-web.appspot.com",
  messagingSenderId: "1034874028656",
  appId: "1:1034874028656:web:5dea95a5e24d3ebb0c2ab5",
  measurementId: "G-H574YRJ5DX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
