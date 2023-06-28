let library = [];
class Book{
  constructor(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
  };
};

function addBookToLibrary (title, author, pages, wasRead) {
  let book = new Book(title, author, pages, wasRead);
  library.push(book);
}

// test
addBookToLibrary("Prince Caspian", "C.S. Lewis", 185, true);
console.log(library);