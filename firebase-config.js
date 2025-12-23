var firebaseConfig = {
    apiKey: "AIzaSyDyqxpH-WYqWwY3MS_C8KjzhZkXJ_ltkqg",
    authDomain: "school-management-a97b0.firebaseapp.com",
    projectId: "school-management-a97b0",
    storageBucket: "school-management-a97b0.firebasestorage.app",
    messagingSenderId: "861652935784",
    appId: "1:861652935784:web:7c629ecde968c38df9c7dd",
    measurementId: "G-V6RYBR434P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Services
const auth = firebase.auth();
const db = firebase.firestore();
