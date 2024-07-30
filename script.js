let lastID = 0

function getBooksOnDB() {
    const booksFromStorage = localStorage.getItem('books');
    
    if (booksFromStorage) 
        return JSON.parse(booksFromStorage)
    else {
        console.log("Não há livros armazenados !")
        return [];
    }
}

function fillBooksToSetOnDB() {
    let name = document.getElementById('book_name').value
    let author = document.getElementById('book_author').value
    let date = document.getElementById('book_date').value

    const newBook = {
        id: generateID(),
        name: name,
        author: author,
        date: date
    }

    setBooksOnDB(newBook);
}

function setBooksOnDB(newBook) {
    const books = getBooksOnDB()

    books.push(newBook);

    localStorage.setItem('books', JSON.stringify(books));
}

function showBooksFromDB() {
    let showBooks = " ";

    if(!getBooksOnDB) {
        console.log("Não há livros armazenados")
    }

    for (const book of getBooksOnDB()) {
        showBooks += 
        `
            </br>
            <div> 
                id: ${book.id}</br>
                Nome: ${book.name}</br>
                Autor: ${book.author}</br>
                Data: ${book.date}
                <button onclick="deleteBook(${book.id})">Apagar</button>
                <button onclick="updateBook(${book.id})">Atualizar</button>
                <button onclick="saveUpdate(${book.id})">Salvar Att</button>
            </div> 
        `
    }

    document.getElementById('htmlBooks').innerHTML = showBooks;
}

function deleteBook(id) {
    const books = getBooksOnDB();
    
    const bookIndex = books.findIndex(book => book.id == id);

    if(bookIndex != -1) {
        books.splice(bookIndex, 1)
        localStorage.setItem('books', JSON.stringify(books));
        showBooksFromDB();
    }
}

function generateID() {
    let books = getBooksOnDB()

    if (books.length > 0) {
        lastID = Math.max(...books.map(book => book.id));
        return lastID + 1
    }

    lastID = 0
    return lastID
}

function updateBook(id) {
    const books = getBooksOnDB()
    const bookIndex = books.findIndex(book => book.id == id);

    let name = document.getElementById('book_name').value = books[bookIndex].name; 
    let author = document.getElementById('book_author').value = books[bookIndex].author; 
    let date = document.getElementById('book_date').value = books[bookIndex].date; 
}

function saveUpdate(id) {
    const books = getBooksOnDB()
    const bookIndex = books.findIndex(book => book.id == id);

    let name = document.getElementById('book_name').value
    let author = document.getElementById('book_author').value
    let date = document.getElementById('book_date').value


    books[bookIndex].name = name
    books[bookIndex].author = author
    books[bookIndex]. date = date

    localStorage.setItem('books', JSON.stringify(books));

    showBooksFromDB()
}