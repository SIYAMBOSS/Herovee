import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEl8t2m_HZ1oNOC49lmpiiM4-XhGzWRfE",
  authDomain: "herovee.firebaseapp.com",
  projectId: "herovee",
  storageBucket: "herovee.firebasestorage.app",
  messagingSenderId: "700112828047",
  appId: "1:700112828047:web:988f0598b5341a29bba2fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.classList.add('active');
    setTimeout(() => t.classList.remove('active'), 3000);
}

// Check if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "../vault/vault.html";
});

// Login Logic
document.getElementById('loginBtn').onclick = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('passKey').value;
    
    if(!email || !pass) return showToast("Enter Gmail & Password");

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => window.location.href = "../vault/vault.html")
        .catch(err => showToast("Failed: " + err.code));
};
