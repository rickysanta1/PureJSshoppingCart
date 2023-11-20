export default class addItem {
  static cart = [];
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
    // this.cart = [];
  }
  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(addItem.cart));
  }

  static loadCart() {
    addItem.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  static addItemToCart(name, price, count) {
    for (let item in addItem.cart) {
      if (addItem.cart[item].name === name) {
        addItem.cart[item].count++;
        addItem.saveCart();
        return;
      }
    }

    this.item = new addItem(name, price, count);
    addItem.cart.push(this.item);
    addItem.saveCart();
  }
  static setCountForItem(name, count) {
    for (let i in addItem.cart) {
      if (addItem.cart[i].name === name) {
        addItem.cart[i].count = count;
        break;
      }
    }
  }
  static removeItemFromCart(name) {
    for (let item in addItem.cart) {
      if (addItem.cart[item].name === name) {
        addItem.cart[item].count--;
        if (addItem.cart[item].count === 0) {
          addItem.cart.splice(item, 1);
        }
        break;
      }
    }
    addItem.saveCart();
  }
  static removeItemFromCartAll(name) {
    for (let item in addItem.cart) {
      if (addItem.cart[item].name === name) {
        addItem.cart.splice(item, 1);
        break;
      }
    }
    addItem.saveCart();
  }
  static clearCart() {
    addItem.cart = [];
    addItem.saveCart();
  }
}
