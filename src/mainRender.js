import Card from "./card.js";
import Nav from "./nav.js";
import Dom from "./miniDom.js";
export default class {
  static mainRender(datos, event = null) {
    const DOM = new Dom();
    const eventElement = DOM.query(event);
    const { datas, loading } = datos;
    if (event) {
      eventElement.addEventListener("click", (e) => {
        e.preventDefault();
        Card.renderFilter(datas);
      });
    } else {
      let nav = new Nav(datas);
      nav.render(document.querySelector(".nav"));
      Card.renderFilter(datas);
    }
  }
}
