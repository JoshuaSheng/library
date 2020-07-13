
const library = []
const tableDOM = document.querySelector("table")
console.log(tableDOM)

function book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function updateLibrary() {
  let newBook = library[library.length - 1]
  let newBookDOM = document.createElement("tr")
  for (let i in newBook) {
    let newBookInfo = document.createElement("td")
    if (i == "read") {
      let checkbox = document.createElement("input")
      checkbox.setAttribute("type", "checkbox")
      checkbox.checked = newBook[i]
      newBookInfo.appendChild(checkbox)
    }
    else {
      newBookInfo.textContent = newBook[i]
    }
    newBookDOM.appendChild(newBookInfo)
  }

  var deleteButton = document.createElement("button")
  deleteButton.setAttribute("data-bookIndex", library.length - 1)
  deleteButton.textContent = "delete"

  deleteButton.addEventListener("click", (e) => {
    let bookIndex = e.target.getAttribute("data-bookindex")
    library.splice(bookIndex, 1)
    let allIndex = document.querySelectorAll("button[data-bookindex]")
    for(let i = 0; i < allIndex.length; i++) {
      let button = allIndex[i]
      if (button.getAttribute("data-bookindex") > bookIndex) {
        button.setAttribute("data-bookindex", button.getAttribute("data-bookindex") - 1)
      }
    }
    let tableEntry = e.target.parentNode
    tableEntry.parentNode.removeChild(tableEntry)
  })
  newBookDOM.appendChild(deleteButton)
  tableDOM.appendChild(newBookDOM)
}

function getBook() {
  var info = document.querySelectorAll("input[name]")
  let bookInfo = []
  info.forEach((info) => {
    if(info.type == "checkbox") {
      bookInfo.push(info.checked)
    }
    else {
      bookInfo.push(info.value)
    }
  })
  library.push(new book(...bookInfo))
  updateLibrary()
}

const submitBook = document.querySelector("input[type='submit']")
submitBook.addEventListener("click", getBook)
