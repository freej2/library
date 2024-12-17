class Book {
    constructor(title, author, pages, haveRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead === 'have read';
    }

    info() {
        let readStatus = this.haveRead ? "have read" : "have not read";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }

    toggleRead() {
        this.haveRead = !this.haveRead;
    }
    
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, haveRead) {
        const newBook = new Book (title, author, pages, haveRead);
        this.books.push(newBook);
    }

    removeBook(index){
        this.books.splice(index, 1);
    }

    toggleBookStatus(index) {
        this.books[index].toggleRead();
    }
}

const myLibrary = new Library();


myLibrary.addBook("book1", "author1",278, "have not read");
myLibrary.addBook("book2", "author2",78, "have read");
myLibrary.addBook("book3", "author3",496, "have not read");

function displayBooks(){
    const booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = '';
    myLibrary.books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.textContent = book.info();
        bookDiv.dataset.bookIndex = index;
        booksContainer.appendChild(bookDiv);
        
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.textContent = "Remove Book";
        bookDiv.appendChild(removeButton)

        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('toggle-read');
        toggleReadButton.textContent = "Toggle Read Status";
        bookDiv.appendChild(toggleReadButton);
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        const bookDiv = e.target.closest('.book');
        const index = parseInt(bookDiv.dataset.bookIndex);
        myLibrary.removeBook(index);
        displayBooks();
    }
    if (e.target.classList.contains('toggle-read')) {
        const bookDiv = e.target.closest('.book');
        const index = parseInt(bookDiv.dataset.bookIndex);
        myLibrary.toggleBookStatus(index);
        displayBooks();
    }
});


document.getElementById('addBookButton').addEventListener('click', () => {
    const dialog = document.getElementById('bookForm');
    dialog.showModal();
});

document.getElementById('submitBook').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const haveRead = document.getElementById('haveRead').value;

    if (title && author && pages) {
        myLibrary.addBook(title, author, pages, haveRead);
        displayBooks();
        document.getElementById('bookForm').close();
        document.getElementById('bookForm').reset();
    } else {
        alert('Please fill out all fields');
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});