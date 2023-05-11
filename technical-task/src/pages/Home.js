import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "./Home.css"
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(()=> {
    getBooks()
  },[])

  const getBooks = async () => {
    const response = await axios.get("http://localhost:5000/books")
    if(response.status === 200){
      setData(response.data)
    }
  }

  const onDeleteBook =async (id) => {
    if(window.confirm("Are you sure you want to delte the book")){
      const response = await axios.delete(`http://localhost:5000/book/${id}`)
      if (response.status === 200){
        toast.success(response.data)
        getBooks()
      }
    }
  }
  console.log("data", data)
  return (
    <div style = {{marginTop: "150px"}}>
      <table className = "styled-table">
        <thead>
          <tr>
            <th style = {{textAlign: 'center'}}>No.</th>
            <th style = {{textAlign: 'center'}}>Title</th>
            <th style = {{textAlign: 'center'}}>Author</th>
            <th style = {{textAlign: 'center'}}>No_of_pages</th>
            <th style = {{textAlign: 'center'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index +1}</th>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.no_of_pages}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                  <button className = "btn btn-edit">Edit</button>
                  </Link>
                  <button className = "btn btn-delete" onClick= {() => onDeleteBook(item.id)}>Delete</button>
                  <Link to={`/view/${item.id}`}>
                  <button className = "btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home