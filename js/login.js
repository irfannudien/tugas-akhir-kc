const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const errorMsg = document.getElementById("errorMsg");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Format email tidak valid.";
      return;
    } else {
      emailError.textContent = "";
    }

    try {
      const res = await fetch(
        `http://localhost:8000/users?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (data.length === 0) {
        errorMsg.textContent = "Email atau password salah.";
        return;
      }

      const user = data[0];

      const { password: _, ...userWithoutPassword } = user;

      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "index.html";
      });
    } catch (err) {
      console.error("Login error:", err);
      errorMsg.textContent = "Terjadi kesalahan. Coba lagi.";
    }
  });
}
