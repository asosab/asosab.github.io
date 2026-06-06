import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, setDoc, serverTimestamp, query, where, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCppukDnujCe-Yk5TGO22ydsqhDbnaULGI",
  authDomain: "somos10e7-a2e5a.firebaseapp.com",
  projectId: "somos10e7-a2e5a",
  storageBucket: "somos10e7-a2e5a.firebasestorage.app",
  messagingSenderId: "239752161887",
  appId: "1:239752161887:web:825de46f96d0ecfd2a49ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.usuariosActivos = 0;

async function refrescarContador() {
  try {
    const cincoMinutosAtras = new Date(Date.now() - 30 * 60 * 1000);
    const q = query(
      collection(db, "visitas"),
      where("fecha", ">=", Timestamp.fromDate(cincoMinutosAtras))
    );
    const querySnapshot = await getDocs(q);

    const nuevoCuenta = querySnapshot.size;
    if (nuevoCuenta !== window.usuariosActivos) {
      window.usuariosActivos = nuevoCuenta;
      console.log("Usuarios activos:", window.usuariosActivos);
      const el = document.getElementById('contador');
      if (el) el.innerText = window.usuariosActivos;
      renderizarAnillos(window.usuariosActivos);
    }
  } catch (e) {
    console.error("❌ Error al refrescar contador:", e);
  }
}

async function actualizarContador() {
  console.log("Registrando visita...");
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipRes.json();
    console.log("IP detectada:", ip);

    await setDoc(doc(db, "visitas", ip), {
      ip: ip,
      fecha: serverTimestamp()
    }, { merge: true });

    console.log("%c✅ Visita registrada", "color: green; font-weight: bold;");
    await refrescarContador();

    setInterval(refrescarContador, 30_000);

  } catch (e) {
    console.error("❌ Error al registrar visita:", e);
  }
}

renderizarAnillos(1);
actualizarContador();
