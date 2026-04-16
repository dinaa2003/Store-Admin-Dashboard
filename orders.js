
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

const orders = [
  {
    id: "#1021",
    customer: "Sara Ali",
    email: "sara@email.com",
    date: "Apr 15, 2026",
    total: 480,
    status: "delivered",
    payment: "Visa",
    address: "Lakewood, Ohio",
    items: [
      { name: "Diamond Ring", qty: 1, price: 480 }
    ]
  },
  {
    id: "#1022",
    customer: "Lina Noor",
    email: "lina@email.com",
    date: "Apr 14, 2026",
    total: 610,
    status: "pending",
    payment: "Mastercard",
    address: "Cleveland, Ohio",
    items: [
      { name: "Pearl Earrings", qty: 2, price: 290 },
      { name: "Gift Wrap", qty: 1, price: 30 }
    ]
  },
  {
    id: "#1023",
    customer: "Huda Sami",
    email: "huda@email.com",
    date: "Apr 13, 2026",
    total: 390,
    status: "processing",
    payment: "PayPal",
    address: "Berea, Ohio",
    items: [
      { name: "Gold Bracelet", qty: 1, price: 390 }
    ]
  },
  {
    id: "#1024",
    customer: "Yara Nabil",
    email: "yara@email.com",
    date: "Apr 12, 2026",
    total: 145,
    status: "cancelled",
    payment: "Visa",
    address: "Parma, Ohio",
    items: [
      { name: "Pearl Earrings", qty: 1, price: 145 }
    ]
  },
  {
    id: "#1025",
    customer: "Omar Adel",
    email: "omar@email.com",
    date: "Apr 11, 2026",
    total: 1200,
    status: "shipped",
    payment: "Visa",
    address: "Lakewood, Ohio",
    items: [
      { name: "Rose Gold Watch", qty: 1, price: 1200 }
    ]
  },
  {
    id: "#1026",
    customer: "Mona Khaled",
    email: "mona@email.com",
    date: "Apr 10, 2026",
    total: 650,
    status: "delivered",
    payment: "Cash",
    address: "Westlake, Ohio",
    items: [
      { name: "Golden Layered Necklace", qty: 1, price: 650 }
    ]
  },
  {
    id: "#1027",
    customer: "Ahmad Kareem",
    email: "ahmad@email.com",
    date: "Apr 09, 2026",
    total: 1600,
    status: "shipped",
    payment: "Mastercard",
    address: "Rocky River, Ohio",
    items: [
      { name: "Diamond Pendant", qty: 1, price: 1600 }
    ]
  },
  {
    id: "#1028",
    customer: "Mira Saeed",
    email: "mira@email.com",
    date: "Apr 08, 2026",
    total: 180,
    status: "pending",
    payment: "Visa",
    address: "Cleveland Heights, Ohio",
    items: [
      { name: "Silver Hoop Earrings", qty: 1, price: 180 }
    ]
  }
];

const ordersList = document.getElementById("ordersList");
const orderSearchInput = document.getElementById("orderSearchInput");
const statusChips = document.querySelectorAll(".chip");
const emptyState = document.getElementById("emptyState");
const paginationNumbers = document.getElementById("paginationNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const totalOrdersCount = document.getElementById("totalOrdersCount");
const pendingOrdersCount = document.getElementById("pendingOrdersCount");
const shippedOrdersCount = document.getElementById("shippedOrdersCount");
const deliveredOrdersCount = document.getElementById("deliveredOrdersCount");

let currentPage = 1;
const itemsPerPage = 4;
let currentStatus = "all";

function updateStats() {
  totalOrdersCount.textContent = orders.length;
  pendingOrdersCount.textContent = orders.filter(order => order.status === "pending").length;
  shippedOrdersCount.textContent = orders.filter(order => order.status === "shipped").length;
  deliveredOrdersCount.textContent = orders.filter(order => order.status === "delivered").length;
}

function getFilteredOrders() {
  const searchValue = orderSearchInput.value.toLowerCase().trim();

  return orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.toLowerCase().includes(searchValue);

    const matchesStatus =
      currentStatus === "all" || order.status === currentStatus;

    return matchesSearch && matchesStatus;
  });
}

function getProgressLabels(status) {
  const labels = {
    pending: "Placed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };

  return labels[status] || "Placed";
}

function renderOrders() {
  const filteredOrders = getFilteredOrders();
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (currentPage > totalPages && totalPages !== 0) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  ordersList.innerHTML = "";

  if (filteredOrders.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  paginatedOrders.forEach((order, index) => {
    const card = document.createElement("article");
    card.className = "order-card card";

    const itemsHtml = order.items
      .map(item => `<li><span>${item.name} × ${item.qty}</span><strong>$${item.price}</strong></li>`)
      .join("");

    card.innerHTML = `
      <div class="order-top">
        <div class="order-main">
          <h3>${order.id}</h3>
          <div class="order-sub">
            <span><i class="fa-regular fa-calendar"></i> ${order.date}</span>
            <span><i class="fa-regular fa-clock"></i> ${getProgressLabels(order.status)}</span>
          </div>
        </div>

        <div class="order-customer">
          <strong>${order.customer}</strong>
          <span>${order.email}</span>
        </div>

        <div class="order-price-status">
          <div class="order-price">$${order.total}</div>
          <span class="order-status ${order.status}">
            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div class="order-progress-wrap">
        <div class="order-progress-labels">
          <span>Placed</span>
          <span>Processing</span>
          <span>Shipped</span>
          <span>${order.status === "cancelled" ? "Cancelled" : "Delivered"}</span>
        </div>

        <div class="order-progress-bar">
          <div class="order-progress-fill ${order.status}"></div>
        </div>
      </div>

      <div class="order-bottom">
        <div class="order-mini">
          <span><i class="fa-solid fa-credit-card"></i> ${order.payment}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${order.address}</span>
          <span><i class="fa-solid fa-box"></i> ${order.items.length} item(s)</span>
        </div>

        <div class="order-actions">
          <button class="view-details-btn">View Details</button>
          <button class="expand-btn" data-index="${index}">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>

      <div class="order-details" id="details-${index}">
        <div class="details-grid">
          <div class="detail-block">
            <h4>Ordered Items</h4>
            <ul>${itemsHtml}</ul>
          </div>

          <div class="detail-block">
            <h4>Shipping</h4>
            <p>${order.address}</p>
          </div>

          <div class="detail-block">
            <h4>Payment</h4>
            <p>${order.payment}</p>
          </div>
        </div>
      </div>
    `;

    ordersList.appendChild(card);
  });

  attachExpandEvents();
  renderPagination(totalPages);
}

function attachExpandEvents() {
  const expandButtons = document.querySelectorAll(".expand-btn");

  expandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      const details = document.getElementById(`details-${index}`);

      details.classList.toggle("show");
      button.classList.toggle("active");
    });
  });
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
      renderOrders();
    });

    paginationNumbers.appendChild(pageBtn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

orderSearchInput.addEventListener("input", () => {
  currentPage = 1;
  renderOrders();
});

statusChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    statusChips.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    currentStatus = chip.dataset.status;
    currentPage = 1;
    renderOrders();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderOrders();
  }
});

nextBtn.addEventListener("click", () => {
  const filteredOrders = getFilteredOrders();
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderOrders();
  }
});

updateStats();
renderOrders();