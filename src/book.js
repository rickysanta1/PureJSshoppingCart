class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
          `;

    list.appendChild(row);
  }

  static showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    // Get parent
    const container = document.querySelector(".container");
    div.appendChild(document.createTextNode(message));
    // Get form
    const form = document.querySelector("#book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      return true;
    }
    return false;
  }

  static clearFields() {
    document.getElementById(`title`).value = "";
    document.getElementById(`author`).value = "";
    document.getElementById(`isbn`).value = "";
  }
}

// Local Storage class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      // Add book to UI
      UI.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate a book
  const book = new Book(title, author, isbn);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    UI.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    UI.addBookToList(book);

    // Add to localStorage
    Store.addBook(book);

    // Show success
    UI.showAlert("Book added!", "success");

    // Clear fields
    UI.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Delete book
  const result = UI.deleteBook(e.target);

  if (result) {
    // Remove from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message
    UI.showAlert("Book Removed", "success");
  }
  e.preventDefault();
});
