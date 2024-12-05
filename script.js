const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function(){
        let info = title + " by " + author + ", " + pages + " pages, " + haveRead;
        return info;
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
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.textContent = book.info();
        booksContainer.appendChild(bookDiv);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});