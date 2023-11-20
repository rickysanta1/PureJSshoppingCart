import Card from "./card.js";
import Dom from "./miniDom.js";
export default class {
  static search(datos, inputValue, event) {
    const DOM = new Dom();
    const eventIcon = DOM.query(event);
    const search = DOM.query(inputValue);
    const { datas, loading } = datos;
    eventIcon.addEventListener("click", (e) => {
      e.preventDefault();

      const searchValue = search.value.toLowerCase().trim();
      console.log(searchValue);
      const arrayFiltered = datas.filter(
        (element) =>
          element.title.toLowerCase().includes(searchValue) ||
          element.description.toLowerCase().includes(searchValue)
      );
      console.log(arrayFiltered);
      Card.renderFilter(arrayFiltered);
    });
  }
}
