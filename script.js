let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  document.getElementById("cartCount").textContent = cart.length;
  alert(name + " কার্টে যোগ হয়েছে!");
}

function showCart() {
  const section = document.getElementById("cartSection");
  section.hidden = !section.hidden;

  if (!section.hidden) {
    renderCart();
    section.scrollIntoView({behavior: "smooth"});
  }
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  items.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.textContent =
      item.name + " - ৳ " + item.price + " ";

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.onclick = () => {
      cart.splice(index, 1);
      document.getElementById("cartCount").textContent = cart.length;
      renderCart();
    };

    div.appendChild(remove);
    items.appendChild(div);
  });

  totalElement.textContent = total;
}

function searchProducts() {
  const search = document.getElementById("searchInput")
    .value.toLowerCase();

  document.querySelectorAll(".product").forEach(product => {
    const name = product.dataset.name.toLowerCase();
    product.style.display = name.includes(search) ? "" : "none";
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("আপনার কার্ট খালি!");
    return;
  }

  let message = "MUBARAK - New Order%0A";
  let total = 0;

  cart.forEach(item => {
    message += encodeURIComponent(item.name) +
      " - ৳" + item.price + "%0A";
    total += item.price;
  });

  message += "Total: ৳" + total;

  const phone = "8801731467967";
  window.open(
    "https://wa.me/" + phone + "?text=" + message,
    "_blank"
  );
}
