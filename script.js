const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead === "have read";
    this.info = function(){
        let readStatus = this.haveRead ? "have read" : "have not read";
        let info = title + " by " + author + ", " + pages + " pages, " + readStatus;
        return info;
    }
    this.toggleRead = function() {
        this.haveRead = !this.haveRead;
    }
}

function addBookToLibrary(title, author, pages, haveRead){
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
}

addBookToLibrary("book1", "author1",278, "have not read");
addBookToLibrary("book2", "author2",78, "have read");
addBookToLibrary("book3", "author3",496, "have not read");
console.log(myLibrary);

function displayBooks(){
    const booksContainer = document.querySelector('.books');
    booksContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
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
        myLibrary.splice(index, 1);
        displayBooks();
    }
    if (e.target.classList.contains('toggle-read')) {
        const bookDiv = e.target.closest('.book');
        const index = parseInt(bookDiv.dataset.bookIndex);
        myLibrary[index].toggleRead();
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
        addBookToLibrary(title, author, pages, haveRead);
        displayBooks();
        document.getElementById('bookForm').close();
    } else {
        alert('Please fill out all fields');
    }
});




document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});