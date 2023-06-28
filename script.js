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

addBookToLibrary("Atomic Habits", "James Clear", 200, true);
addBookToLibrary("Prince Caspian", "C.S. Lewis", 170, false);
addBookToLibrary("The Voyage of the Dawn Treader", "Clive Staples Lewis", 140, true);

function libraryToDOM(books) {
  const bookContainer = document.createElement('main');
  bookContainer.classList.add('library');

  books.forEach(book => {
    const article = document.createElement('article');
    article.classList.add('book-card');

    const hgroup = document.createElement('hgroup');

    const title = document.createElement('h3');
    title.classList.add('book-title');
    title.textContent = book.title;

    const byline = document.createElement('h4');
    byline.classList.add('book-byline');
    byline.textContent = `by ${book.author}`;

    hgroup.appendChild(title);
    hgroup.appendChild(byline);

    const buttonDiv = document.createElement('div');

    const readButton = document.createElement('button');
    readButton.setAttribute('type', 'button');
    readButton.classList.add('read', book.wasRead ? 'true' : 'false');
    readButton.textContent = 'Read';

    const pages = document.createElement('p');
    pages.setAttribute('id', 'pages');
    pages.textContent = `${book.pages} pages`;

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('delete-btn');

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', 'assets/trash-can-solid.svg');
    deleteIcon.setAttribute('alt', 'delete');
    deleteIcon.setAttribute('height', '10px');

    const deleteText = document.createTextNode('Delete');

    deleteButton.appendChild(deleteIcon);
    deleteButton.appendChild(deleteText);

    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(pages);
    buttonDiv.appendChild(deleteButton);

    article.appendChild(hgroup);
    article.appendChild(buttonDiv);

    bookContainer.appendChild(article);
  });

  return bookContainer;
}

const libraryContainer = document.getElementById('library-container');
libraryContainer.appendChild(libraryToDOM(library));