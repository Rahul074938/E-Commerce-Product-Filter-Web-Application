// script.js
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999, inStock: true, description: "High-performance laptop", image: "https://media.johnlewiscontent.com/i/JohnLewis/laptop-carousel1-010323?fmt=auto" },
    { id: 2, name: "TShirt", category: "Clothing", price: 349, inStock: true, description: "Comfortable cotton t-shirt", image: "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_640.png" },
    { id: 3, name: "Book", category: "Books", price: 149, inStock: false, description: "Bestseller novel", image: "https://m.media-amazon.com/images/I/81Dky+tD+pL._SY466_.jpg" },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799, inStock: true, description: "Latest smartphone model", image: "https://images-cdn.ubuy.co.in/633a87dfd6b53a07f76e0460-crazypig-13-pro-max-smart-phones-1-8gb.jpg" },
    { id: 5, name: "Jeans", category: "Clothing", price: 499, inStock: true, description: "Stylish denim jeans", image: "https://bayrue.com/cdn/shop/files/BAYRUE_-_2024-05-27T175710.576.png?v=1716854242&width=3840" },
    { id: 6, name: "Shirt" ,category: "clothing", price: 549, inStock: true, description: "Stylish checks shirt" , image: "https://uathayam.in/cdn/shop/files/VEGAS_10218.jpg?v=1740833493"},
    { id: 7, name: "Ear buds" ,category: "Electronics" , price: 649, instock: true, description: "comfortable and long duration play time" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxGEcw9bkyg504RhyyDzUtIhNmZC4PCHKB0w&s"},
    { id: 8, name: "Keyboard" ,category: "Electronics" , price: 469, instock: true, description: "USB support keyboard for professionalsand gamers" , image: " https://www.amkette.com/cdn/shop/collections/A_Keyboard_1_1b91dcd8-665b-4048-886f-4587ea5ee8a6.png?v=1713250076"},
  ];
  
const productList = document.getElementById("productList");
  const searchBar = document.getElementById("searchBar");
  const categoryFilters = document.querySelectorAll(".filter input[type='checkbox']");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const inStockFilter = document.getElementById("inStock");
  const sortOptions = document.getElementById("sortOptions");
  const clearFiltersBtn = document.getElementById("clearFilters");
  
  // Modal Elements
  const modal = document.getElementById("productModal");
  const modalImage = document.getElementById("modalImage");
  const modalName = document.getElementById("modalName");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const modalStock = document.getElementById("modalStock");
  const closeModal = document.querySelector(".close");
  
  // Display all products initially
  displayProducts(products);
  
  // Event Listeners
  searchBar.addEventListener("input", filterProducts);
  categoryFilters.forEach(filter => filter.addEventListener("change", filterProducts));
  priceRange.addEventListener("input", () => {
    priceValue.textContent = priceRange.value;
    filterProducts();
  });
  inStockFilter.addEventListener("change", filterProducts);
  sortOptions.addEventListener("change", filterProducts);
  clearFiltersBtn.addEventListener("click", clearFilters);
  
  // Open Modal when a product is clicked
  productList.addEventListener("click", (e) => {
    const productElement = e.target.closest(".product");
    if (productElement) {
      const productId = productElement.dataset.id;
      const product = products.find(p => p.id === parseInt(productId));
      openModal(product);
    }
  });
  
  // Close Modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Close Modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  // Filter Products Function
  function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategories = Array.from(categoryFilters)
      .filter(filter => filter.checked)
      .map(filter => filter.value.toLowerCase());
    const maxPrice = parseInt(priceRange.value);
    const inStockOnly = inStockFilter.checked;
    const sortBy = sortOptions.value;
  
    let filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  
    // Sorting
    if (sortBy === "priceLowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filteredProducts.sort((a, b) => b.id - a.id);
    }
  
    displayProducts(filteredProducts);
  }
  
  // Display Products Function
  function displayProducts(products) {
    productList.innerHTML = products.map(product => `
      <div class="product" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>${product.inStock ? "In Stock" : "Out of Stock"}</p>
      </div>
    `).join("");
  }
  
  // Open Modal Function
  function openModal(product) {
    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `Price: $${product.price}`;
    modalStock.textContent = product.inStock ? "In Stock" : "Out of Stock";
    modal.style.display = "flex";
  }
  
  // Clear Filters Function
  function clearFilters() {
    searchBar.value = "";
    categoryFilters.forEach(filter => filter.checked = false);
    priceRange.value = 1000;
    priceValue.textContent = 1000;
    inStockFilter.checked = false;
    sortOptions.value = "default";
    filterProducts();
  }
