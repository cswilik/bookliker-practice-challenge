document.addEventListener("DOMContentLoaded", function() {
// *****Variables*****
const ulTag = document.querySelector("ul#list")
const divPanel = document.querySelector('#show-panel')


// *****Renders*****

function RenderBookList(book) {
    const liTag = document.createElement("li")
    liTag.textContent = book.title
    liTag.dataset.id = book.id
    ulTag.append(liTag)
}

function RenderBookShowPanel(book) {
    divPanel.innerHTML = ""

    const imgTag = document.createElement('img')
    imgTag.src = book.img_url

    const titleHeader = document.createElement('h2')
    titleHeader.textContent = book.title

    const subtitle = document.createElement('h2')
    subtitle.textContent = book.subtitle

    const author = document.createElement('h2')
    author.textContent = book.author

    const description = document.createElement('p')
    description.textContent = book.description

    const userUL = document.createElement('ul')
    userUL.classList.add('user-likes')

    const users = book.users 
    users.forEach(user => {
        const userLi = document.createElement('li')
        userLi.textContent = user.username 
        userUL.append(userLi)
    })
   
    const likeButton = document.createElement('button')
    likeButton.textContent = "Like"
    likeButton.dataset.id = book.id
    // likeButton.addEventListener('click', function(evt) {
    //     evt.preventDefault()
    //     usersArr = book.users
    //     usersArr.push({"id":1, "username":"pouros"})
    //     const id = evt.target.dataset.id
    //     fetch(`http://localhost:3000/books/${id}`, {
    //          headers:
    //             { "Content-Type": "application/json" },
    //             method: "PATCH",
    //             body:
    //                 JSON.stringify({users: usersArr})
    //     })
    //     .then(res => res.json())
    //     .then(bookObj => {
    //         bookObj.users
    //     })

    // })

    
    divPanel.append(imgTag, titleHeader, subtitle, author, description, userUL, likeButton)
   
}





// *****AddEventListeners*****

ulTag.addEventListener("click", function(event){
    if (event.target.matches('li')) {
        let id = event.target.dataset.id
        getBook(id)
    }
}) 



// *****fetches*****
function getBooks() {
    fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then(booksArr => {booksArr.forEach(bookObj =>
        RenderBookList(bookObj)
    
    )})
}

function getBook(id) {
    fetch(`http://localhost:3000/books/${id}`)
    .then(r => r.json())
    .then(book => RenderBookShowPanel(book))
}





// *****initialize*****
getBooks()























});
