import {v4 as uuid} from "uuid"

let books = []

export const getBooks = (req, res) =>{
    res.send(books)
}

export const createBook = (req, res) => {
    const book = req.body
    books.push({...book, id: uuid()})
    res.send("Book added Successfully")
}

export const getBook = (req, res) => {
    const singleBook = books.filter((book) => book.id === req.params.id)
    res.send(singleBook)
}

export const deleteBook = (req, res)=> {
    books = books.filter((book) => book.id !== req.params.id)
    res.send("Book deleted Successfully")
}

export const updateBook = (req, res) => {
    const book = books.find((book) => book.id === req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.no_of_pages = req.body.no_of_pages
    book.published_at= req.body.published_at
    res.send("Book updated Successfully")
}