//variables
let myLib = [];

let inputTitle = document.querySelector(".book-title-input");
let inputAuthor = document.querySelector(".book-author-input");
let inputPages = document.querySelector(".book-pages-input");
let isRead = document.querySelector(".isRead");
let addNewBookBtn = document.querySelector(".add-new-book");
let library = document.querySelector(".book-container");

//Book object constructor
class Book {
  constructor(title, author, pages, read, id) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.read = read),
      (this.id = id = Date.now());
  }
}
//check if already read or not
function checkRead() {
  return isRead.checked;
}

//add book to lib and to div book-container
function addBookToLib() {
  const newBook = new Book(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    isRead.checked
  );

  //check input validity
  if (inputTitle.checkValidity()) {
    if (inputAuthor.checkValidity()) {
      if (inputPages.checkValidity()) {
        Book.id = Date.now();
        //check book title and author if existed
        function checkBookTitle() {
          return myLib.some(myLib => myLib.title == inputTitle.value);
        }
        function checkBookAuthor() {
          return myLib.some(myLib => myLib.author == inputAuthor.value);
        }
        if (checkBookTitle() && checkBookAuthor()) {
          let errorMsg = document.querySelector(".error-msg");
          errorMsg.classList.add("active");
          console.log("This book already exists in your library");
        } else {
          errorMsg.classList.remove("active");
          console.log("This book is not in your library");

          //put a new book in library
          myLib.push(newBook);
          //create span
          let spanTitle = document.createElement("span");
          spanTitle.className = "book-title";
          spanTitle.appendChild(
            document.createTextNode('"' + newBook.title + '"')
          );

          let spanAuthor = document.createElement("span");
          spanAuthor.className = "book-author";
          spanAuthor.appendChild(
            document.createTextNode(" by " + newBook.author)
          );

          let spanPages = document.createElement("span");
          spanPages.className = "book-pages";
          spanPages.appendChild(
            document.createTextNode("with " + newBook.pages + " pages")
          );

          let buttonRead = document.createElement("button");
          buttonRead.className = "readBtn";

          //check if read or not read
          if (checkRead()) {
            buttonRead.textContent = "Read";
            buttonRead.classList.add("read");
          } else {
            buttonRead.textContent = "Not Read";
            buttonRead.classList.add("not-read");
          }

          let remove = document.createElement("button");
          remove.className = "delete";
          remove.appendChild(document.createTextNode("Remove"));
          //create div book
          let divBook = document.createElement("div");
          divBook.className = "book";
          divBook.setAttribute("data-id", Book.id);
          divBook.appendChild(spanTitle);
          divBook.appendChild(spanAuthor);
          divBook.appendChild(spanPages);
          divBook.appendChild(buttonRead);
          divBook.appendChild(remove);
          library.appendChild(divBook);
          //read and not read togle
          buttonRead.onclick = function () {
            //check if the book div has the same
            console.log("click button read-not read");
            if (buttonRead.classList.contains("read")) {
              buttonRead.classList.replace("read", "not-read");
              buttonRead.textContent = "Not Read";
              newBook.read = false;
              addBookToLocalStorage();
            } else {
              buttonRead.classList.replace("not-read", "read");
              buttonRead.textContent = "Read";
              newBook.read = true;
              addBookToLocalStorage();
            }
          };
          //remove book from book container
          remove.onclick = function () {
            divBook.remove();
            myLib.splice(0, 1);
            addBookToLocalStorage();
          };
          //close modal
          closeModal();
        }
      }
    }
  }
}

//add new book button
addNewBookBtn.onclick = function () {
  addBookToLib();
  //put to local storage
  addBookToLocalStorage();
};

//add book to local storage
function addBookToLocalStorage() {
  localStorage.setItem("Book", JSON.stringify(myLib));
}
restoreBookByLocalStorage();
//restore book in local storage if there is
function restoreBookByLocalStorage() {
  let book = localStorage.getItem("Book");
  myLib = JSON.parse(book);
  if (book === null) {
    myLib = [];
  } else {
    myLib = JSON.parse(book);
  }
  showBook();
}
function showBook() {
  for (let i = 0; i < myLib.length; i += 1) {
    //create span
    let spanTitle = document.createElement("span");
    spanTitle.className = "book-title";
    spanTitle.appendChild(document.createTextNode('"' + myLib[i].title + '"'));

    let spanAuthor = document.createElement("span");
    spanAuthor.className = "book-author";
    spanAuthor.appendChild(document.createTextNode(" by " + myLib[i].author));

    let spanPages = document.createElement("span");
    spanPages.className = "book-pages";
    spanPages.appendChild(
      document.createTextNode("with " + myLib[i].pages + " pages")
    );

    let buttonRead = document.createElement("button");
    buttonRead.className = "readBtn";

    let remove = document.createElement("button");
    remove.className = "delete";
    remove.appendChild(document.createTextNode("Remove"));
    //create div book
    let divBook = document.createElement("div");
    divBook.className = "book";
    divBook.setAttribute("data-id", myLib[i].id);
    divBook.appendChild(spanTitle);
    divBook.appendChild(spanAuthor);
    divBook.appendChild(spanPages);
    divBook.appendChild(buttonRead);
    divBook.appendChild(remove);
    library.appendChild(divBook);

    function checkReadOnLocal() {
      return myLib[i].read;
    }
    //check if read or not read
    if (checkReadOnLocal()) {
      buttonRead.textContent = "Read";
      buttonRead.classList.add("read");
    } else {
      buttonRead.textContent = "Not Read";
      buttonRead.classList.add("not-read");
    }
    //read and not read togle
    buttonRead.onclick = function () {
      //check if the book div has the same
      console.log("click button read-not read");
      if (buttonRead.classList.contains("read")) {
        buttonRead.classList.replace("read", "not-read");
        buttonRead.textContent = "Not Read";
        myLib[i].read = false;
        addBookToLocalStorage();
      } else {
        buttonRead.classList.replace("not-read", "read");
        buttonRead.textContent = "Read";
        myLib[i].read = true;
        addBookToLocalStorage();
      }
    };

    //remove book from book container
    remove.onclick = function () {
      divBook.remove();
      myLib.splice(0, 1);
      addBookToLocalStorage();
    };
  }
}
//prevent reload after submitting
let form = document.querySelector("#form");
form.addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
}
//reset the form modal
let btn = document.querySelector(".btn");
btn.onclick = function () {
  form.reset();
};

//close modal if the input validity is true
function closeModal() {
  if (inputTitle.checkValidity()) {
    if (inputAuthor.checkValidity()) {
      if (inputPages.checkValidity()) {
        $("#exampleModal").modal("hide");
      }
    }
  }
}
