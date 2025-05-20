document.getElementById("topupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseInt(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Input Tidak Valid",
      text: "Mohon isi nominal top up dengan benar.",
    });
    return;
  }

  let saldo = parseInt(localStorage.getItem("saldo")) || 0;

  saldo += amount;

  localStorage.setItem("saldo", saldo);

  Swal.fire({
    icon: "success",
    title: "Top Up Berhasil!",
    text: `Saldo Anda sekarang Rp${saldo.toLocaleString()}`,
    timer: 2000,
    showConfirmButton: false,
  });

  tampilkanSaldo();

  document.getElementById("topupForm").reset();
});

amount.addEventListener("keydown", function (e) {
  if (["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
});

function tampilkanSaldo() {
  const saldoEl = document.getElementById("saldoSekarang");
  const saldo = parseInt(localStorage.getItem("saldo")) || 0;
  saldoEl.textContent = `Rp${saldo.toLocaleString()}`;
}

tampilkanSaldo();
