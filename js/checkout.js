document.getElementById("checkoutBtn").addEventListener("click", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalHarga = hitungTotal();
  const saldo = parseInt(localStorage.getItem("saldo")) || 0;

  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Keranjang Kosong!",
      text: "Silakan tambahkan item terlebih dahulu.",
    });
    return;
  }

  if (saldo < totalHarga) {
    Swal.fire({
      icon: "error",
      title: "Saldo Tidak Cukup!",
      text: "Silakan top up terlebih dahulu.",
    });
    return;
  }

  const saldoBaru = saldo - totalHarga;
  localStorage.setItem("saldo", saldoBaru);
  document.getElementById(
    "saldoSekarang"
  ).textContent = `Rp${saldoBaru.toLocaleString()}`;

  Swal.fire({
    icon: "success",
    title: "Checkout Berhasil!",
    showConfirmButton: false,
    timer: 1500,
  });

  kosongkanCart();
});

// Tampilkan saldo saat load halaman
document.getElementById("saldoSekarang").textContent = `Rp${(
  parseInt(localStorage.getItem("saldo")) || 0
).toLocaleString()}`;

renderPesanan();
