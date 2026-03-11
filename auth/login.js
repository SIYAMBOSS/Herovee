import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// ট্যাব সুইচ লজিক
window.switchTab = (mode) => {
    document.getElementById('loginSection').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('signupSection').style.display = mode === 'signup' ? 'block' : 'none';
}

// লগইন লজিক
document.getElementById('loginBtn').onclick = () => {
    const e = document.getElementById('loginEmail').value;
    const p = document.getElementById('loginPass').value;
    signInWithEmailAndPassword(auth, e, p).catch(err => alert(err.code));
};

// ইউজার লগইন থাকলে রিডাইরেক্ট
onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "../vault/vault.html";
});
