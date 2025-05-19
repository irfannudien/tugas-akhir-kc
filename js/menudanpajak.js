let pesanan = [];

    function beli(jenis, nama, harga) {
      pesanan.push({ jenis, nama, harga });
      renderPesanan();
    }

    function renderPesanan() {
      const listDiv = document.getElementById("list");
      listDiv.innerHTML = "";

      let subtotal = 0;


    pesanan.forEach(item => {
    subtotal += item.harga; // akumulasi harga setiap item
    });
    //   pesanan.forEach(item => {
    //     const row = document.createElement("div");
    //     row.textContent = `${item.jenis.toUpperCase()} - ${item.nama} : Rp${item.harga.toLocaleString()}`;
    //     listDiv.appendChild(row);
    //     subtotal += item.harga;
    //   });

      const pajak = Math.round(subtotal * 0.1);
      const total = subtotal + pajak;

      document.getElementById("subtotal").textContent = `Subtotal: Rp${subtotal.toLocaleString()}`;
      document.getElementById("pajak").textContent = `Pajak (10%): Rp${pajak.toLocaleString()}`;
      document.getElementById("total").textContent = `Total Bayar: Rp${total.toLocaleString()}`;
    }

    const subtotal = items.reduce((acc, item) => acc + item.qty * item.harga, 0);
  const total = Math.round(subtotal * (1 + .1));


//   yg ridhooooo
document.getElementById("topupForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const amount = parseInt(document.getElementById("amount").value);
      const resultDiv = document.getElementById("result");

      if (!username || isNaN(amount) || amount <= 0) {
        alert("Mohon isi data dengan benar.");
        return;
      }

      // Ambil saldo lama dari localStorage
      let saldo = parseInt(localStorage.getItem(username)) || 0;

      // Tambah saldo baru
      saldo += amount;

      // Simpan ke localStorage
      localStorage.setItem(username, saldo);

      // Tampilkan hasil
      resultDiv.innerHTML = `
        <h2>Top Up Berhasil!</h2>
        <p>Username: <strong>${username}</strong></p>
        <p>Saldo Saat Ini: <strong>Rp${saldo.toLocaleString()}</strong></p>
      `;
      resultDiv.style.display = "block";

      // Reset form
      document.getElementById("topupForm").reset();
    });