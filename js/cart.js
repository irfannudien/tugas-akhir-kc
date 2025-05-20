let pesanan = JSON.parse(localStorage.getItem("cart")) || [];

function beli(kategori, nama, harga) {
  pesanan.push({ kategori, nama, harga });
  localStorage.setItem("cart", JSON.stringify(pesanan));
  renderPesanan();
}

function renderPesanan() {
  const listDiv = document.getElementById("list");
  listDiv.innerHTML = "";
  let subtotal = 0;

  pesanan.forEach((item) => {
    const row = document.createElement("div");
    row.textContent = `${item.kategori.toUpperCase()} - ${
      item.nama
    } : Rp${item.harga.toLocaleString()}`;
    listDiv.appendChild(row);
    subtotal += item.harga;
  });

  const pajak = Math.round(subtotal * 0.1);
  const total = subtotal + pajak;

  document.getElementById(
    "subtotal"
  ).textContent = `Subtotal: Rp${subtotal.toLocaleString()}`;
  document.getElementById(
    "pajak"
  ).textContent = `Pajak (10%): Rp${pajak.toLocaleString()}`;
  document.getElementById(
    "total"
  ).textContent = `Total Bayar: Rp${total.toLocaleString()}`;
}

function hitungTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce((acc, item) => acc + item.harga, 0);
  const pajak = Math.round(subtotal * 0.1);
  return subtotal + pajak;
}

function kosongkanCart() {
  pesanan = [];
  localStorage.removeItem("cart");
  renderPesanan();
}
