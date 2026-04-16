
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

const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const imageUpload = document.getElementById("imageUpload");
const successMessage = document.getElementById("successMessage");

const productName = document.getElementById("productName");
const category = document.getElementById("category");
const collection = document.getElementById("collection");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const status = document.getElementById("status");
const description = document.getElementById("description");

const previewImage = document.getElementById("previewImage");
const previewName = document.getElementById("previewName");
const previewCollection = document.getElementById("previewCollection");
const previewPrice = document.getElementById("previewPrice");
const previewStock = document.getElementById("previewStock");
const previewStatus = document.getElementById("previewStatus");
const previewDescription = document.getElementById("previewDescription");

let uploadedImageSrc = "";

function updatePreview() {
  previewName.textContent = productName.value.trim() || "Diamond Ring";
  previewCollection.textContent = collection.value.trim() || "Luxury Collection";
  previewPrice.textContent = `$${price.value.trim() || "500"}`;
  previewStock.textContent = `Stock ${stock.value.trim() || "10"}`;
  previewDescription.textContent =
    description.value.trim() || "A graceful jewelry piece preview will appear here as you type.";

  if (status.value === "Out of Stock") {
    previewStatus.textContent = "Out of Stock";
    previewStatus.style.background = "rgba(251, 239, 244, 0.96)";
    previewStatus.style.color = "#bf7897";
  } else {
    previewStatus.textContent = "Available";
    previewStatus.style.background = "rgba(238, 248, 241, 0.96)";
    previewStatus.style.color = "#4a8d67";
  }
}

function setError(input, errorId, message) {
  input.classList.add("error");
  document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
  input.classList.remove("error");
  document.getElementById(errorId).textContent = "";
}

function validateForm() {
  let isValid = true;

  clearError(productName, "nameError");
  clearError(category, "categoryError");
  clearError(collection, "collectionError");
  clearError(price, "priceError");
  clearError(stock, "stockError");
  clearError(status, "statusError");
  clearError(description, "descriptionError");
  document.getElementById("imageError").textContent = "";

  if (!productName.value.trim()) {
    setError(productName, "nameError", "Product name is required.");
    isValid = false;
  }

  if (!category.value) {
    setError(category, "categoryError", "Please select a category.");
    isValid = false;
  }

  if (!collection.value.trim()) {
    setError(collection, "collectionError", "Collection is required.");
    isValid = false;
  }

  if (!price.value.trim()) {
    setError(price, "priceError", "Price is required.");
    isValid = false;
  } else if (isNaN(price.value) || Number(price.value) <= 0) {
    setError(price, "priceError", "Enter a valid price.");
    isValid = false;
  }

  if (!stock.value.trim()) {
    setError(stock, "stockError", "Stock is required.");
    isValid = false;
  } else if (isNaN(stock.value) || Number(stock.value) < 0) {
    setError(stock, "stockError", "Enter a valid stock number.");
    isValid = false;
  }

  if (!status.value) {
    setError(status, "statusError", "Please select a status.");
    isValid = false;
  }

  if (!description.value.trim()) {
    setError(description, "descriptionError", "Description is required.");
    isValid = false;
  } else if (description.value.trim().length < 10) {
    setError(description, "descriptionError", "Description must be at least 10 characters.");
    isValid = false;
  }

  if (!uploadedImageSrc) {
    document.getElementById("imageError").textContent = "Please upload a product image.";
    isValid = false;
  }

  return isValid;
}

function resetFormCompletely() {
  form.reset();
  uploadedImageSrc = "";
  previewImage.src = "https://via.placeholder.com/500x500/f6f2fa/8d79b8?text=Preview";
  previewName.textContent = "Diamond Ring";
  previewCollection.textContent = "Luxury Collection";
  previewPrice.textContent = "$500";
  previewStock.textContent = "Stock 10";
  previewStatus.textContent = "Available";
  previewStatus.style.background = "rgba(238, 248, 241, 0.96)";
  previewStatus.style.color = "#4a8d67";
  previewDescription.textContent = "A graceful jewelry piece preview will appear here as you type.";

  [
    ["nameError", productName],
    ["categoryError", category],
    ["collectionError", collection],
    ["priceError", price],
    ["stockError", stock],
    ["statusError", status],
    ["descriptionError", description]
  ].forEach(([errorId, input]) => {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("error");
  });

  document.getElementById("imageError").textContent = "";
}

[productName, category, collection, price, stock, status, description].forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    document.getElementById("imageError").textContent = "Please upload a valid image file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImageSrc = event.target.result;
    previewImage.src = uploadedImageSrc;
    document.getElementById("imageError").textContent = "";
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    successMessage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 3000);

    resetFormCompletely();
  }
});

resetBtn.addEventListener("click", () => {
  resetFormCompletely();
});