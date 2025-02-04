// DOM Elements
const elTableBody = document.querySelector(".tbody");
const elForm = document.querySelector(".form");
const elInputTitle = document.querySelector(".title");
const elInputAuthor = document.querySelector(".author");
const elInputPages = document.querySelector(".pages");
const elInputIsRead = document.querySelector(".read");

// Constructor Functions
function Library() {
  this.books = [];
}

function Book(id, title, author, pages, isRead) {
  // The Constructor
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Adding methods to prototypes
Library.prototype.addBook = function (id, title, author, pages, isRead) {
  const newBook = new Book(id, title, author, pages, isRead);
  this.books = [...this.books, newBook];
  library.render();
};

Library.prototype.deleteBook = function (deleteId) {
  this.books = this.books.filter((book) => book.id !== deleteId);
  library.render();
};

Library.prototype.editBook = function (newBook) {
  this.books = this.books.map((book) => {
    return book.id === newBook.id ? newBook : book;
  });
};

Library.prototype.render = function () {
  // Clearing the table body before rendering
  elTableBody.innerHTML = "";

  for (const book of this.books) {
    const elTableRow = document.createElement("tr");

    const elTableDataTitle = document.createElement("td");
    elTableDataTitle.textContent = book.title;

    const elTableDataAuthor = document.createElement("td");
    elTableDataAuthor.textContent = book.author;

    const elTableDataPages = document.createElement("td");
    elTableDataPages.textContent = book.pages;

    const elTableDataIsRead = document.createElement("td");
    const elIsReadCheckbox = document.createElement("input");
    elIsReadCheckbox.type = "checkbox";
    elIsReadCheckbox.checked = book.isRead;
    elTableDataIsRead.append(elIsReadCheckbox);

    elIsReadCheckbox.addEventListener("change", () => {
      library.editBook({ ...book, isRead: elIsReadCheckbox.checked });
    });

    const elTableDataButton = document.createElement("td");
    const elBtnDelete = document.createElement("button");
    elBtnDelete.textContent = "Delete";
    elBtnDelete.classList.add("btn", "btn--red");
    elTableDataButton.append(elBtnDelete);

    elBtnDelete.addEventListener("click", () => {
      elTableRow.remove();
      library.deleteBook(book.id);
    });

    elTableRow.append(
      elTableDataTitle,
      elTableDataAuthor,
      elTableDataPages,
      elTableDataIsRead,
      elTableDataButton,
    );
    elTableBody.append(elTableRow);
  }

  if (this.books.length === 0) {
    const elTableRow = document.createElement("tr");
    const elTableDataMessage = document.createElement("td");
    elTableDataMessage.textContent = "No books in the library";
    elTableDataMessage.colSpan = 6;
    elTableRow.append(elTableDataMessage);
    elTableBody.append(elTableRow);
  }
};

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = crypto.randomUUID();
  const title = elInputTitle.value;
  const author = elInputAuthor.value;
  const pages = Number(elInputPages.value);
  const isRead = elInputIsRead.checked;
  library.addBook(id, title, author, pages, isRead);

  // Resetting input values
  elInputTitle.value = "";
  elInputAuthor.value = "";
  elInputPages.value = "";
  elInputIsRead.checked = false;
});

let library = new Library();
library.addBook(
  crypto.randomUUID(),
  "Game of Thrones",
  "George R.R. Martin",
  900,
  true,
);
library.addBook(
  crypto.randomUUID(),
  "A Clash of Kings",
  "George R.R. Martin",
  900,
  true,
);
library.addBook(
  crypto.randomUUID(),
  "A Storm of Swords",
  "George R.R. Martin",
  900,
  false,
);
library.render();
