let library = [];
class Book{
  constructor(title, author, pages, wasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRead = wasRead;
  };
  toggleRead () {
    this.wasRead = !this.wasRead;
  }
};

function createBookCards(books) {
  const bookContainer = document.createElement('main');
  bookContainer.classList.add('library');

  books.forEach((book, index) => {
    const article = document.createElement('article');
    article.classList.add('book-card');
    article.setAttribute('data-index', `${index}`); // associate book card with index of actual book object

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
    readButton.textContent = `${!book.wasRead ? 'Not' : ''} Read`;

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

    deleteButtons.push(deleteButton);

    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(pages);
    buttonDiv.appendChild(deleteButton);

    article.appendChild(hgroup);
    article.appendChild(buttonDiv);

    bookContainer.appendChild(article);
    bookCards.push(article);
  });

  return bookContainer;
}

function addBookToLibrary(title, author, pages, wasRead) {
  let book = new Book(title, author, pages, wasRead);
  library.push(book);
  updateDOM();
}

function updateDOM() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; // Clear the previous contents

  const booksDOM = createBookCards(library);
  libraryContainer.appendChild(booksDOM);
  
  deleteButtons = [...document.getElementsByClassName('delete-btn')];
  bookCards = [...document.getElementsByClassName('book-card')];
}

function handleFormSubmission(event) {
  event.preventDefault();

  let formData = {
    title: document.getElementById("form-title").value,
    author: document.getElementById("form-author").value,
    pages: parseInt(document.getElementById("form-pages").value),
    wasRead: document.getElementById("form-read").checked
  };
  
  addBookToLibrary(formData.title, formData.author, formData.pages, formData.wasRead);
}

const form = document.getElementById('book-form');
form.addEventListener("submit", handleFormSubmission);

// Delete button functionality

const bookCardsContainer = document.getElementById('library-container');
let bookCards = [];
let deleteButtons = [];

// Event bubbling since book cards are dynamically added
bookCardsContainer.addEventListener('click', function(event) {
  const target = event.target;
  
  // deletion logic
  if (target.classList.contains('delete-btn')) {
    const deleteButtonIndex = deleteButtons.indexOf(target);

    if (deleteButtonIndex !== -1) {
      const bookCard = target.closest('.book-card');
      library.splice(bookCard.dataset.index);
      updateDOM();

      // Remove button corresponding to deleted book card
      deleteButtons.splice(deleteButtonIndex, 1);
    }
  }
  // Handle the "Read" button click
  else if (target.classList.contains('read')) {
    const bookCard = target.closest('.book-card');
    const index = bookCards.indexOf(bookCard);
    if (index !== -1) {
      const book = library[index];
      book.toggleRead();
      updateDOM();
    };
  }
});