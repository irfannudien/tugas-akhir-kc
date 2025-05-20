const container = document.getElementById("menuContainer");
const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

let allMenu = [];

function renderMenu(menu) {
  container.innerHTML = "";
  if (menu.length === 0) {
    container.innerHTML = "<p>Tidak ada menu yang sesuai.</p>";
    return;
  }
  menu.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" />
      <div class="item-name">${item.nama}</div>
      <div class="item-price">Rp${item.harga.toLocaleString()}</div>
      <button onclick="beli('${item.kategori}', '${item.nama}', ${item.harga})">
        Masukan keranjang
      </button>`;
    container.appendChild(card);
  });
}

function categoryDropdown(menu) {
  const uniqueCategories = [...new Set(menu.map((item) => item.kategori))];

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    filterCategory.appendChild(option);
  });
}

async function loadMenu() {
  try {
    const res = await fetch("http://localhost:8000/menu");

    const data = await res.json();
    allMenu = data;
    categoryDropdown(allMenu);
    renderMenu(allMenu);
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Gagal memuat menu. Silakan coba lagi nanti.</p>";
  }
}

function applyFilterSearch() {
  const selectedCategory = filterCategory.value.toLowerCase();
  const searchKeyword = searchInput.value.toLowerCase();

  const filteredMenu = allMenu.filter((item) => {
    const isCategoryMatch =
      selectedCategory === "" ||
      item.kategori.toLowerCase() === selectedCategory;

    const isNameMatch = item.nama.toLowerCase().includes(searchKeyword);

    return isCategoryMatch && isNameMatch;
  });

  renderMenu(filteredMenu);
}

filterCategory.addEventListener("change", applyFilterSearch);
searchInput.addEventListener("input", applyFilterSearch);
loadMenu();
