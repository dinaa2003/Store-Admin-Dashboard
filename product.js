
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
  });
}

if (closeSidebar) {
  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
}

const products = [
  {
    id: 1,
    name: "Diamond Ring",
    category: "Diamond",
    collection: "Luxury Collection",
    price: 5000,
    status: "available",
    stock: 12,
    image: "Images/DimondR.jpg",
    description: "Elegant diamond ring with a timeless sparkle and premium finish."
  },
  {
    id: 2,
    name: "Gold Bracelet",
    category: "Gold",
    collection: "Classic Collection",
    price: 1000,
    status: "available",
    stock: 18,
    image: "Images/GoldB.jpg",
    description: "Soft gold bracelet designed for classic luxury and everyday elegance."
  },
  {
    id: 3,
    name: "Pearl Earrings",
    category: "Pearl",
    collection: "Soft Shine",
    price: 145,
    status: "available",
    stock: 25,
    image: "Images/pearlE.jpg",
    description: "Delicate pearl earrings with a graceful feminine touch."
  },
  {
    id: 4,
    name: "Silver Necklace",
    category: "Silver",
    collection: "Modern Line",
    price: 220,
    status: "out of stock",
    stock: 0,
    image: "Images/Silver Necklace.jpg",
    description: "Refined silver necklace with a clean and sophisticated look."
  },
  {
    id: 5,
    name: "Diamond Pendant",
    category: "Diamond",
    collection: "Aura Signature",
    price: 1600,
    status: "available",
    stock: 9,
    image: "Images/Diamond Pendant.jpg",
    description: "Luxury pendant with a radiant diamond centerpiece and elegant shine."
  },
  {
    id: 6,
    name: "Pearl Charm Set",
    category: "Pearl",
    collection: "Soft Glow",
    price: 480,
    status: "available",
    stock: 15,
    image: "Images/Pearl Charm Set.jpg",
    description: "Beautiful pearl charm set with soft tones and graceful styling."
  },
  {
    id: 7,
    name: "Rose Gold Watch",
    category: "Gold",
    collection: "Modern Luxe",
    price: 1200,
    status: "available",
    stock: 7,
    image: "Images/Rose Gold Watch.jpg",
    description: "Rose gold watch with a polished finish and premium feminine elegance."
  },
  {
    id: 8,
    name: "Silver Hoop Earrings",
    category: "Silver",
    collection: "Daily Chic",
    price: 180,
    status: "available",
    stock: 21,
    image: "Images/Silver Hoop Earrings.jpg",
    description: "Minimal silver hoops designed for modern daily luxury."
  }
];

const tableBody = document.getElementById("productsTableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const priceFilter = document.getElementById("priceFilter");
const emptyState = document.getElementById("emptyState");
const paginationNumbers = document.getElementById("paginationNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/* image preview */
const preview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closePreview = document.querySelector(".close-preview");

/* edit modal */
const editModal = document.getElementById("editModal");
const closeEditBtn = document.getElementById("closeEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");

const editName = document.getElementById("editName");
const editPrice = document.getElementById("editPrice");
const editDesc = document.getElementById("editDesc");

/* toast */
const successToast = document.getElementById("successToast");

let currentPage = 1;
const itemsPerPage = 4;
let currentEditId = null;

function getFilteredProducts() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const selectedStatus = statusFilter.value;
  const selectedPrice = priceFilter.value;

  return products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;

    let matchesPrice = true;

    if (selectedPrice === "under500") {
      matchesPrice = product.price < 500;
    } else if (selectedPrice === "500to1500") {
      matchesPrice = product.price >= 500 && product.price <= 1500;
    } else if (selectedPrice === "above1500") {
      matchesPrice = product.price > 1500;
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (currentPage > totalPages && totalPages !== 0) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  tableBody.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  paginatedProducts.forEach((product) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="image-cell">
        <img src="${product.image}" alt="${product.name}">
      </td>

      <td>
        <div class="product-info">
          <span class="product-name">${product.name}</span>
          <span class="product-sub">${product.collection}</span>
        </div>
      </td>

      <td class="category-cell">
        ${product.category}
      </td>

      <td class="price">
        $${product.price}
      </td>

      <td class="stock">
        ${product.stock}
      </td>

      <td>
        <span class="status ${product.status === "available" ? "available" : "out"}">
          ${product.status === "available" ? "Available" : "Out"}
        </span>
      </td>

      <td>
        <div class="actions">
          <button class="edit" data-id="${product.id}" title="Edit">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="delete" data-id="${product.id}" title="Delete">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });

  renderPagination(totalPages);
  attachDeleteEvents();
  attachEditEvents();
  attachImagePreview();
}

function renderPagination(totalPages) {
  paginationNumbers.innerHTML = "";

  if (totalPages <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  }

  prevBtn.style.display = "inline-flex";
  nextBtn.style.display = "inline-flex";

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-number ${i === currentPage ? "active" : ""}`;
    pageBtn.textContent = i;

    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });

    paginationNumbers.appendChild(pageBtn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      const productIndex = products.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        const confirmed = confirm("Are you sure you want to delete this product?");

        if (confirmed) {
          products.splice(productIndex, 1);
          renderProducts();
        }
      }
    });
  });
}

function attachEditEvents() {
  const editButtons = document.querySelectorAll(".edit");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      openEdit(productId);
    });
  });
}

function openEdit(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  currentEditId = productId;

  editName.value = product.name;
  editPrice.value = product.price;
  editDesc.value = product.description;

  editModal.classList.add("active");
}

function closeEdit() {
  editModal.classList.remove("active");
}

function saveEdit() {
  const product = products.find((item) => item.id === currentEditId);
  if (!product) return;

  product.name = editName.value.trim();
  product.price = Number(editPrice.value);
  product.description = editDesc.value.trim();

  closeEdit();
  renderProducts();
  showSuccess();
}

function showSuccess() {
  successToast.classList.add("active");

  setTimeout(() => {
    successToast.classList.remove("active");
  }, 2500);
}

function attachImagePreview() {
  const images = document.querySelectorAll(".image-cell img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      if (!preview || !previewImg) return;
      preview.classList.add("active");
      previewImg.src = img.src;
    });
  });
}

/* search + filters */
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderProducts();
});

categoryFilter.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

priceFilter.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

/* pagination */
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

nextBtn.addEventListener("click", () => {
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderProducts();
  }
});

/* preview close */
if (closePreview) {
  closePreview.addEventListener("click", () => {
    preview.classList.remove("active");
  });
}

if (preview) {
  preview.addEventListener("click", (e) => {
    if (e.target === preview) {
      preview.classList.remove("active");
    }
  });
}

/* edit modal controls */
if (closeEditBtn) {
  closeEditBtn.addEventListener("click", closeEdit);
}

if (cancelEditBtn) {
  cancelEditBtn.addEventListener("click", closeEdit);
}

if (saveEditBtn) {
  saveEditBtn.addEventListener("click", saveEdit);
}

if (editModal) {
  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
      closeEdit();
    }
  });
}

renderProducts();