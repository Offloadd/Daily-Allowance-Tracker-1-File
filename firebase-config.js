// Firebase configuration for Allowance Tracker
const firebaseConfig = {
    apiKey: "AIzaSyABey4UWE_B-i7Fh0STJA1vOHuzhdYzfMw",
    authDomain: "allowance-trackers.firebaseapp.com",
    projectId: "allowance-trackers",
    storageBucket: "allowance-trackers.firebasestorage.app",
    messagingSenderId: "61226188478",
    appId: "1:61226188478:web:c961975945d4dc5075a8ef"
};

// Initialize Firebase
console.log('Initializing Firebase...');
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Make globally available
window.auth = auth;
window.db = db;
window.currentUser = null;

console.log('Firebase initialized successfully');
console.log('Auth object:', auth);
console.log('DB object:', db);

// Auth state listener
auth.onAuthStateChanged(user => {
    console.log('Auth state changed:', user ? user.email : 'No user');
    if (user) {
        console.log('User authenticated:', user.email);
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('appSection').style.display = 'block';
        document.getElementById('userEmail').textContent = user.email;
        window.currentUser = user;
        
        // Load user data from Firestore
        loadUserData();
    } else {
        console.log('No user authenticated');
        document.getElementById('authSection').style.display = 'block';
        document.getElementById('appSection').style.display = 'none';
        window.currentUser = null;
    }
});
