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
  this.books.push(new Book(id, title, author, pages, isRead));
  library.render();
};

Library.prototype.deleteBook = function (elTableRow, elButton, deleteId) {
  elButton.addEventListener("click", () => {
    elTableRow.remove();
    const index = this.books.findIndex((book) => book.id === deleteId);
    this.books.splice(index, 1);
    library.render();
  });
};

Library.prototype.render = function () {
  // Clearing the table body before rendering
  elTableBody.innerHTML = "";

  for (const book of this.books) {
    const elTableRow = document.createElement("tr");

    const elTableDataIndex = document.createElement("td");
    elTableDataIndex.textContent = book.id;

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

    const elTableDataButton = document.createElement("td");
    const elBtnDelete = document.createElement("button");
    elBtnDelete.textContent = "Delete";
    elBtnDelete.classList.add("btn", "btn--red");
    elTableDataButton.append(elBtnDelete);

    library.deleteBook(elTableRow, elBtnDelete, book);

    elTableRow.append(
      elTableDataIndex,
      elTableDataTitle,
      elTableDataAuthor,
      elTableDataPages,
      elTableDataIsRead,
      elTableDataButton,
    );
    elTableBody.append(elTableRow);
  }

  if (library.length === 0) {
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

  const id = library.length + 1;
  const title = elInputTitle.value;
  const author = elInputAuthor.value;
  const pages = Number(elInputPages.value);
  const isRead = elInputIsRead.checked;

  library.addBook(id, title, author, pages, isRead);
});

let library = new Library();
library.addBook(1, "Game of Thrones", "George R.R. Martin", 900, true);
library.addBook(2, "A Clash of Kings", "George R.R. Martin", 900, true);
library.addBook(3, "A Storm of Swords", "George R.R. Martin", 900, false);
library.render();
