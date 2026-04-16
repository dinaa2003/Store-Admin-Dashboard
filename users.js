
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

const users = [
  {
    id: 1,
    name: "Dina Hassan",
    email: "dina@aura.com",
    role: "admin",
    status: "active",
    joined: "Apr 10, 2026"
  },
  {
    id: 2,
    name: "Ahmad Kareem",
    email: "ahmad@aura.com",
    role: "manager",
    status: "active",
    joined: "Apr 08, 2026"
  },
  {
    id: 3,
    name: "Sara Ali",
    email: "sara@email.com",
    role: "customer",
    status: "inactive",
    joined: "Apr 06, 2026"
  },
  {
    id: 4,
    name: "Lina Noor",
    email: "lina@email.com",
    role: "customer",
    status: "active",
    joined: "Apr 04, 2026"
  },
  {
    id: 5,
    name: "Yara Sami",
    email: "yara@email.com",
    role: "customer",
    status: "banned",
    joined: "Apr 02, 2026"
  },
  {
    id: 6,
    name: "Omar Nabil",
    email: "omar@email.com",
    role: "manager",
    status: "active",
    joined: "Mar 29, 2026"
  },
  {
    id: 7,
    name: "Huda Adel",
    email: "huda@email.com",
    role: "customer",
    status: "active",
    joined: "Mar 27, 2026"
  },
  {
    id: 8,
    name: "Mona Khaled",
    email: "mona@email.com",
    role: "customer",
    status: "inactive",
    joined: "Mar 22, 2026"
  }
];

const usersTableBody = document.getElementById("usersTableBody");
const userSearchInput = document.getElementById("userSearchInput");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");
const emptyState = document.getElementById("emptyState");
const paginationNumbers = document.getElementById("paginationNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const totalUsersCount = document.getElementById("totalUsersCount");
const activeUsersCount = document.getElementById("activeUsersCount");
const adminUsersCount = document.getElementById("adminUsersCount");

const loadingSpinner = document.getElementById("loadingSpinner");

let currentPage = 1;
const itemsPerPage = 4;

function updateStats() {
  totalUsersCount.textContent = users.length;
  activeUsersCount.textContent = users.filter(
    (user) => user.status === "active"
  ).length;
  adminUsersCount.textContent = users.filter(
    (user) => user.role === "admin" || user.role === "manager"
  ).length;
}

function getFilteredUsers() {
  const searchValue = userSearchInput.value.toLowerCase().trim();
  const selectedRole = roleFilter.value;
  const selectedStatus = statusFilter.value;

  return users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesRole =
      selectedRole === "all" || user.role === selectedRole;

    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });
}

function getInitial(name) {
  return name.trim().charAt(0).toUpperCase();
}

function formatRole(role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function renderUsers() {
  if (loadingSpinner) {
    loadingSpinner.classList.add("show");
  }

  usersTableBody.innerHTML = "";

  setTimeout(() => {
    const filteredUsers = getFilteredUsers();
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    if (currentPage > totalPages && totalPages !== 0) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    usersTableBody.innerHTML = "";

    if (filteredUsers.length === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
    }

    paginatedUsers.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <div class="user-cell">
            <div class="avatar ${user.role}">
              ${getInitial(user.name)}
            </div>

            <div class="user-info">
              <div class="user-name">
                ${user.name}
                ${
                  user.role === "admin"
                    ? '<i class="fa-solid fa-crown admin-crown"></i>'
                    : ""
                }
              </div>
              <div class="user-email">${user.email}</div>
            </div>
          </div>
        </td>

        <td>
          <span class="role-badge ${user.role}">
            ${formatRole(user.role)}
          </span>
        </td>

        <td>
          <span class="status-badge ${user.status}">
            ${formatStatus(user.status)}
          </span>
        </td>

        <td>
          <span class="join-date">${user.joined}</span>
        </td>

        <td>
          <div class="actions-wrap">
            <button class="actions-toggle" data-id="${user.id}">
              <i class="fa-solid fa-ellipsis"></i>
            </button>

            <div class="actions-menu" id="menu-${user.id}">
              <button class="change-role-btn" data-id="${user.id}" data-role="admin">
                <i class="fa-solid fa-user-shield"></i> Make Admin
              </button>
              <button class="change-role-btn" data-id="${user.id}" data-role="manager">
                <i class="fa-solid fa-user-tie"></i> Make Manager
              </button>
              <button class="change-role-btn" data-id="${user.id}" data-role="customer">
                <i class="fa-solid fa-user"></i> Make Customer
              </button>
            </div>
          </div>
        </td>
      `;

      usersTableBody.appendChild(row);
    });

    attachDropdownEvents();
    attachRoleChangeEvents();
    renderPagination(totalPages);

    if (loadingSpinner) {
      loadingSpinner.classList.remove("show");
    }
  }, 500);
}

function attachDropdownEvents() {
  const toggleButtons = document.querySelectorAll(".actions-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const userId = button.dataset.id;
      const currentMenu = document.getElementById(`menu-${userId}`);
      const allMenus = document.querySelectorAll(".actions-menu");

      allMenus.forEach((menu) => {
        if (menu !== currentMenu) {
          menu.classList.remove("show");
        }
      });

      currentMenu.classList.toggle("show");
    });
  });
}

function attachRoleChangeEvents() {
  const roleButtons = document.querySelectorAll(".change-role-btn");

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userId = Number(button.dataset.id);
      const newRole = button.dataset.role;

      const user = users.find((item) => item.id === userId);
      if (!user) return;

      user.role = newRole;
      renderUsers();
    });
  });
}

document.addEventListener("click", () => {
  document.querySelectorAll(".actions-menu").forEach((menu) => {
    menu.classList.remove("show");
  });
});

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
      renderUsers();
    });

    paginationNumbers.appendChild(pageBtn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

userSearchInput.addEventListener("input", () => {
  currentPage = 1;
  renderUsers();
});

roleFilter.addEventListener("change", () => {
  currentPage = 1;
  renderUsers();
});

statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderUsers();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
});

nextBtn.addEventListener("click", () => {
  const filteredUsers = getFilteredUsers();
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderUsers();
  }
});

updateStats();
renderUsers();