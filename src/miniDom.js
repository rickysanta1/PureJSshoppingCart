export default class MiniDom {
  constructor() {
    this.id = (i) => document.getElementById(i);
    this.query = (sel) => document.querySelector(sel);
    this.queryAll = (sel) => document.querySelectorAll(sel);

    this.create = (tag, attrs = {}) =>
      Object.assign(document.createElement(tag), attrs);

    this.append = (hijo, parent = document.body) => {
      if (Array.isArray(hijo)) {
        this.removeChilds(parent);
        let fragment = document.createDocumentFragment();
        hijo.forEach((h) => {
          fragment.appendChild(h);
        });
        parent.appendChild(fragment);
      } else {
        parent.appendChild(hijo);
      }
    };
    this.createMultiple = (array) => {
      array.forEach((data, index) => {
        Object.assign(document.createElement(data.tag), data.attrib);
      });
    };
    this.removeChilds = (parent) =>
      [...parent.childNodes].forEach((el) => el.remove());
  }
}
