const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Simulasi database user
let users = {
  "user1": { saldo: 50000 }
};

// Route halaman top up
app.get("/topup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "topup.html"));
});

// Proses top up (simulasi)
app.post("/topup", (req, res) => {
  const { username, amount } = req.body;

  if (!users[username]) {
    users[username] = { saldo: 0 };
  }

  const nominal = parseInt(amount);
  users[username].saldo += nominal;

  res.send(`
    <h2>Top Up Berhasil!</h2>
    <p>Username: ${username}</p>
    <p>Saldo Baru: Rp${users[username].saldo.toLocaleString()}</p>
    <a href="/topup">Kembali</a>
  `);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
