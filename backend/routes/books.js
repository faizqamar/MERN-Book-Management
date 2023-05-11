import express from "express"

import {getBooks, createBook, getBook, deleteBook, updateBook} from "../controllers/books.js"

const router = express.Router()

router.get("/books", getBooks)
router.post("/book", createBook)
router.get("/book/:id", getBook)
router.delete("/book/:id", deleteBook)
router.put("/book/:id", updateBook)

export default router