class Book {
  constructor(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
  }

  toggleRead() {
    this.wasRead = !this.wasRead;
  }
}

function createBookCard(book, index) {
  const article = document.createElement('article');
  article.classList.add('book-card');
  article.setAttribute('data-index', index);

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
  readButton.textContent = `${!book.wasRead ? 'Not ' : ''}Read`;

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

  return article;
}

function addBookToLibrary(title, author, pages, wasRead) {
  const book = new Book(title, author, pages, wasRead);
  library.push(book);
  updateDOM();
}

function updateDOM() {
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear the previous contents

  library.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libraryContainer.appendChild(bookCard);
  });
}

function handleFormSubmission(event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById('form-title').value,
    author: document.getElementById('form-author').value,
    pages: parseInt(document.getElementById('form-pages').value),
    wasRead: document.getElementById('form-read').checked,
  };

  addBookToLibrary(formData.title, formData.author, formData.pages, formData.wasRead);
  resetForm();
}

function resetForm() {
  const form = document.getElementById('book-form');
  form.reset();
}

function deleteBook(event) {
  const bookCard = event.target.closest('.book-card');
  const index = bookCard.getAttribute('data-index');
  library.splice(index, 1);
  updateDOM();
}

function toggleRead(event) {
  const bookCard = event.target.closest('.book-card');
  const index = bookCard.getAttribute('data-index');
  const book = library[index];
  book.toggleRead();
  updateDOM();
}

const library = [];

const form = document.getElementById('book-form');
form.addEventListener('submit', handleFormSubmission);

const libraryContainer = document.getElementById('library');
libraryContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    deleteBook(event);
  } else if (event.target.classList.contains('read')) {
    toggleRead(event);
  }
});

updateDOM();