import Dom from "./miniDom.js";
import Card from "./card.js";
export default class Nav extends Dom {
  constructor(obj) {
    super();
    this.obj = obj;
  }
  render(container) {
    const datas = this.obj;

    // console.log("datos",datas);
    let uniqueCat = [...new Set(datas.map((obj) => obj.category))];
    this.ul = this.create("ul", { className: "nav-ul" });
    this.liCat = this.create("li", { innerText: `CATEGORIES:` });
    this.append(this.liCat, this.ul);
    uniqueCat.forEach((prod) => {
      this.li = this.create("li", {
        innerText: `${prod}`,
        onclick: (e) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return Card.renderFilter(
            datas.filter(
              (obj) => obj.category == e.target.childNodes[0].textContent
            )
          );
          //  return Card.renderFilter(datas);
        }
      });
      this.append(this.li, this.ul);
    });
    this.append(this.ul, container);
  }
}
