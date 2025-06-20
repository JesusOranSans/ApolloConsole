const apiURL = "https://apollo-console-back.onrender.com";
const token = localStorage.getItem("token");

// Protege esta página: si no hay token, vuelve al login
if (!token) {
  window.location.href = "index.html";
}

// Validar token y cargar datos del perfil
fetch(`${apiURL}/api/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  if (data.email) {
    document.getElementById("profile").innerText = JSON.stringify(data, null, 2);
  } else {
    // Token inválido o expirado
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
})
.catch(err => {
  console.error("Error cargando perfil:", err);
  window.location.href = "index.html";
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
