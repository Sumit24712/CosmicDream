<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA8XmdLwGRxPGctJz20V1tPUBngV45ljhs",
    authDomain: "cosmicdream-web.firebaseapp.com",
    projectId: "cosmicdream-web",
    storageBucket: "cosmicdream-web.firebasestorage.app",
    messagingSenderId: "1034874028656",
    appId: "1:1034874028656:web:5dea95a5e24d3ebb0c2ab5",
    measurementId: "G-H574YRJ5DX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>