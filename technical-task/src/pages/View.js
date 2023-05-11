import React, {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom'
import axios from 'axios'
import "./View.css"


const View = () => {
  const[book, setBook] = useState(null)

  const {id} = useParams()

  useEffect(() => {
    if(id) {
      getSingleBook(id)
    }
  }, [id])

  const getSingleBook = async (id) => {
    const response = await axios.get(`http://localhost:5000/book/${id}`)
      if (response.status === 200){
        setBook({...response.data[0]})
      }
  }

  return (
    <div style = {{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Book Title Detail</p>
        </div>
        <div className ="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Title:</strong>
          <span>{book && book.title}</span>
          <br/>
          <br/>
          <strong>Author:</strong>
          <span>{book && book.author}</span>
          <br/>
          <br/>
          <strong>No_of_pages:</strong>
          <span>{book && book.no_of_pages}</span>
          <br/>
          <br/>
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View