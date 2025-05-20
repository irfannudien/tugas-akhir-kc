const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Yakin mau logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "login.html";
      }
    });
  });
}
