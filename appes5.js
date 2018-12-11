//book constructor. creating the book object
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }

//UI constructor. a set of prototype methods
function UI (){}
//create prototype to add book to list.
UI.prototype.addBookToList = function (book){
    const list = document.getElementById('book-list');
    //create a tr element
    const row = document.createElement('tr');
    //insert columns
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href="#" class="delete" >X</a> </td>
    `
    list.appendChild(row);
}

//Show Alert Prototype
UI.prototype.showAlert = function(message, className) {
    //construct the elements. create div. 
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    //add text ... create a text node
    div.appendChild(document.createTextNode(message));
    //get parent to insert it into the DOM
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    //insert alert. saying to insert it before the div in the form
    container.insertBefore(div, form);
    //disappear after a certain amount of seconds
    setTimeout(clearError, 2000);
}
//helper function for clearError
function clearError(){
    document.querySelector('.alert').remove();
  }

//delete book entries prototype
UI.prototype.deleteBook = function (target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Clear input fields
UI.prototype.clearFields = function (){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e){
    //get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    //instantiating a new book. This creates a new object with book. 
    const book = new Book (title, author, isbn);

    //instantiate a UI object. This will make the new book show up in the booklist. 
    const ui = new UI();

    //VALIDATE to make sure fields are not empty
    if(title === '' || author === '' || isbn === ''){
        // error alert, not stupid windows alert. 
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);
        //show success
        ui.showAlert ('Book Added!', 'success');
        //clear input fields
        ui.clearFields();
    }
    e.preventDefault();
});

//create event listener to delete books on the list 
document.getElementById('book-list').addEventListener('click', function (e){
    const ui = new UI();
    //delete book
    ui.deleteBook(e.target);
    //show an alert when deleted. 
    ui.showAlert('Book Removed!', 'success');
});
