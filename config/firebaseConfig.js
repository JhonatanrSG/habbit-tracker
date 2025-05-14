// config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase aquí
const firebaseConfig = {
    apiKey: "AIzaSyAjVREwpmAAR5mybswNRseIiBHCWCednck",
    authDomain: "habbitkonrad.firebaseapp.com",
    projectId: "habbitkonrad",
    storageBucket: "habbitkonrad.firebasestorage.app",
    messagingSenderId: "56159078091",
    appId: "1:56159078091:web:91761ae793da9a9cc0fd4e"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
