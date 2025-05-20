const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = e.target.nama.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    try {
      const res = await fetch(`http://localhost:8000/users?email=${email}`);
      const data = await res.json();
      console.log("DATA cek email:", data);

      if (data.length > 0) {
        errorMsg.textContent = "Email sudah digunakan.";
        return;
      }

      const postResponse = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, email, password, saldo: 0 }),
      });

      console.log("POST response:", postResponse);

      await Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Silakan login untuk melanjutkan.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      window.location.href = "login.html";
    } catch (error) {
      console.error(error);
      errorMsg.textContent = "Terjadi kesalahan. Coba lagi nanti.";
    }
  });
}
