
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
});

// Sales Bar Chart
const salesCtx = document.getElementById("salesChart");

new Chart(salesCtx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [3200, 4100, 3600, 5200, 4700, 6100, 5800],
        backgroundColor: [
          "#ece7f7",
          "#e8e1f5",
          "#e3daf3",
          "#6e5aa7",
          "#e7e0f5",
          "#ddd3ef",
          "#e6b0cb"
          
        ],
        borderRadius: 22,
        borderSkipped: false,
        barThickness: 30
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#3d3451",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#8a819b",
          font: {
            size: 12
          }
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#8a819b",
          font: {
            size: 12
          }
        },
        grid: {
          color: "#f5f1fa",
          drawBorder: false
        },
        border: {
          display: false
        }
      }
    }
  }
});

// Category Donut Chart
const categoryCtx = document.getElementById("categoryChart");

new Chart(categoryCtx, {
  type: "doughnut",
  data: {
    labels: ["Gold", "Silver", "Diamond", "Pearl"],
    datasets: [
      {
        data: [42, 28, 18, 12],
        backgroundColor: ["#d8b48a", "#cfc8dd", "#9f86d7", "#e4acc6"],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  },
  options: {
    cutout: "72%",
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#3d3451",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 12
      }
    }
  }
});