// DOM Elements
const elTableBody = document.querySelector(".tbody") as HTMLTableSectionElement;
const elForm = document.querySelector(".form") as HTMLFormElement;
const elInputTitle = document.querySelector(".title") as HTMLInputElement;
const elInputAuthor = document.querySelector(".author") as HTMLInputElement;
const elInputPages = document.querySelector(".pages") as HTMLInputElement;
const elInputIsRead = document.querySelector(".read") as HTMLInputElement;

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  isRead: boolean;
}

class Library {
  books: Book[];

  constructor() {
    this.books = [];
  }

  addBook(
    id: string,
    title: string,
    author: string,
    pages: number,
    isRead: boolean,
  ) {
    const book = {
      id,
      title,
      author,
      pages,
      isRead,
    };
    this.books = [...this.books, book];
    this.render();
  }

  deleteBook(deleteId: string) {
    this.books = this.books.filter((book) => book.id !== deleteId);
    this.render();
  }

  editBook(newBook: Book) {
    this.books = this.books.map((book) => {
      return book.id === newBook.id ? newBook : book;
    });
    this.render();
  }

  render() {
    elTableBody.innerHTML = "";

    for (const book of this.books) {
      const elTableRow = document.createElement("tr");

      const elTableDataTitle = document.createElement("td");
      elTableDataTitle.textContent = book.title;

      const elTableDataAuthor = document.createElement("td");
      elTableDataAuthor.textContent = book.author;

      const elTableDataPages = document.createElement("td");
      elTableDataPages.textContent = String(book.pages);

      const elTableDataIsRead = document.createElement("td");
      const elIsReadCheckbox = document.createElement("input");
      elIsReadCheckbox.type = "checkbox";
      elIsReadCheckbox.checked = book.isRead;
      elTableDataIsRead.append(elIsReadCheckbox);

      elIsReadCheckbox.addEventListener("change", () => {
        this.editBook({ ...book, isRead: elIsReadCheckbox.checked });
      });

      const elTableDataButton = document.createElement("td");
      const elBtnDelete = document.createElement("button");
      elBtnDelete.textContent = "Delete";
      elBtnDelete.classList.add("btn", "btn--red");
      elTableDataButton.append(elBtnDelete);

      elBtnDelete.addEventListener("click", () => {
        elTableRow.remove();
        this.deleteBook(book.id);
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
  }
}

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

const library = new Library();
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
