import Dom from "./miniDom.js";
export default class Card extends Dom {
  constructor(obj) {
    super();
    this.obj = obj;
  }

  render(container) {
    this.removeChilds(container);
    // const { datas, loading } = this.obj;
    const datas = this.obj;
    // console.log("datos",datas);
    datas.forEach((prod) => {
      this.creados = this.createMultiple([
        { tag: "h3", attrib: { textContent: `${prod.title}` } },
        { tag: "p", attrib: { textContent: `${prod.description}` } },
        { tag: "img", attrib: { src: `${prod.images[0]}` } }
      ]);
      this.card = this.create("div", { className: "card" });
      this.h3 = this.create("h3", { textContent: `${prod.title}` });
      this.p = this.create("p", { textContent: `${prod.description}` });
      this.img = this.create("img", { src: `${prod.images[0]}` });
      this.divimg = this.create("div", { className: "divimg" });
      this.append(this.img, this.divimg);
      this.boton = this.create("div", {
        className: "btn",
        id: prod.id,
        textContent: "Agregar Al Carrito",

        //innerHTML: "&lArr;",
        onclick: (e) => {
          e.preventDefault();
          console.log(typeof +e.target.id);
          alert(e.target.id);
        }
      });
      // this.divimg,
      this.append([this.h3, this.p, this.divimg, this.boton], this.card);
      this.append(this.card, container);
    });
  }

  static renderFilter(data, currentPage = 1, itemsPerPage = 10) {
    const scroll = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const dom = new Dom();
    const paginationContainer = document.querySelector(".pagination");
    let actual = currentPage;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Clear the container
    dom.removeChilds(paginationContainer);
    const page = dom.create("div", {
      className: "current-page",
      textContent: `${actual} of ${totalPages}`
    });
    const current = () => document.querySelector(".current-page");

    this.createPag(data, actual, itemsPerPage);

    // Implementing Next And Prev Buttons
    if (totalPages > 0) {
      const nextBtn = dom.create("button", { className: "right-arrow" });
      const prevBtn = dom.create("button", { className: "left-arrow" });

      nextBtn.addEventListener("click", () => {
        if (totalPages >= actual + 1) {
          actual += 1;
          this.createPag(data, actual, itemsPerPage);
          current().textContent = `${actual} of ${totalPages}`;
          scroll();
        } else {
          nextBtn.removeEventListener("click", () => {
            actual = 0;
            console.log("prev 0:", actual);
          });
        }
      });
      prevBtn.addEventListener("click", () => {
        if (0 < actual - 1) {
          actual += -1;
          // current.textContent=`${actual} of ${totalPages}`;
          this.createPag(data, actual, itemsPerPage);
          current().textContent = `${actual} of ${totalPages}`;
          scroll();
        } else {
          prevBtn.removeEventListener("click", () => {
            actual = 0;
            console.log("prev 0:", actual);
          });
        }
      });

      dom.append([prevBtn, page, nextBtn], paginationContainer);
    }
  }
  static createPag(api, page = 1, itemsPerPage = 5) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = api.slice(start, end);
    console.log(itemsToDisplay);
    let fill = new Card(itemsToDisplay);
    fill.render(document.querySelector(".card-container"));
  }
}
