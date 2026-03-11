import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Toast Message
function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.classList.add('active');
    setTimeout(() => t.classList.remove('active'), 3000);
}

// Pass Toggle Logic
window.togglePass = (id, icon) => {
    const el = document.getElementById(id);
    if(el.type === 'password') {
        el.type = 'text'; icon.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
        el.type = 'password'; icon.classList.replace('fa-eye', 'fa-eye-slash');
    }
}

// Switch Tabs
window.switchTab = (mode) => {
    document.getElementById('loginSection').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('signupSection').style.display = mode === 'signup' ? 'block' : 'none';
}

// Forgot Password
window.forgotPass = () => {
    const email = document.getElementById('loginEmail').value;
    if(!email) return showToast("Enter your email first!");
    sendPasswordResetEmail(auth, email).then(() => showToast("Reset link sent to Gmail!")).catch(err => showToast(err.code));
}

// Sign In
document.getElementById('loginBtn').onclick = () => {
    const e = document.getElementById('loginEmail').value;
    const p = document.getElementById('loginPass').value;
    signInWithEmailAndPassword(auth, e, p).catch(err => showToast("Failed: " + err.code));
};

// Sign Up
document.getElementById('registerBtn').onclick = () => {
    const e = document.getElementById('regEmail').value;
    const p = document.getElementById('regPass').value;
    const cp = document.getElementById('confirmPass').value;
    if(p !== cp) return showToast("Passwords don't match!");
    createUserWithEmailAndPassword(auth, e, p).catch(err => showToast(err.code));
};

onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "../vault/vault.html";
});
