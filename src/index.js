import datos from "./api.js";
import Search from "./search.js";
import Render from "./mainRender.js";
import Add from "./addCard.js";
const api = new datos(`https://dummyjson.com/products`);

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  console.log("Loading...");
}

api.dataApi().then((data) => {
  Render.mainRender(data);
  Search.search(data, ".search", "#icon");
});

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("[aria-label ='open']");
// const closeButton = document.querySelector("dialog button");
showButton.addEventListener("click", () => {
  dialog.show();
});

if (localStorage.getItem("cart") != null) {
  Add.loadCart();
}

Add.addItemToCart("un item", "2323.3", 1);

console.log(localStorage.getItem("cart"));

// "Close" button closes the dialog
// closeButton.addEventListener("click", () => {
//   dialog.close();
// });

// Muestra u oculta el botón según la posición de la página
// window.onscroll = function() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     scrollButton.style.display = 'block';
//   } else {
//     scrollButton.style.display = 'none';
//   }
// };
