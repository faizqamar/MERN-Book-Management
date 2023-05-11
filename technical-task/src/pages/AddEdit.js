import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import './AddEdit.css'


const initialState = {
  title: "",
  author: "",
  no_of_pages: "",
}

const AddEdit = () => {
  const [state, setstate] = useState(initialState)

  const {title , author, no_of_pages} = state

  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(() => {
    if(id) {
      getSingleBook(id)
    }
  }, [id])

  const getSingleBook = async (id) => {
    const response = await axios.get(`http://localhost:5000/book/${id}`)
      if (response.status === 200){
        setstate({...response.data[0]})
      }
  }
  
  const addNoOfPages = async (data) => {
    const response = await axios.post("http://localhost:5000/book", data)
    if(response.status === 200){
      toast.success(response.data)
    }
  }

  const updateBook = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/book/${id}`, data)
    if(response.status === 200){
      toast.success(response.data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNoOfPages(state)
    if(id){
      updateBook(state, id)
    }
    setTimeout(()=> navigate("/"),500)
  }

  const handleInputChange = (e) => {
    let {name, value} = e.target
    setstate({...state, [name]: value})
  }
  return (
    <div style ={{marginTop: "100px"}}>
    <form
      style = {{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <label htmlform = "title">Title     </label>
      <br/>
      <input type ="text" 
      id="title" 
      name="title"
      placeholder="Enter Title ....." 
      onChange={handleInputChange}
      value= {title}
      />
      <br/>
      <label htmlform = "author">Author   </label>
      <br/>
      <input type ="text" 
      id="author" 
      name="author"
      placeholder="Enter Author ....." 
      onChange={handleInputChange}
      value= {author}
      />
      <br/>
      <label htmlform = "no_of_pages">no_of_pages   </label>
      <br/>
      <input type ="number" 
      id="no_of_pages" 
      name ="no_of_pages"
      placeholder="Enter no_of_pages ....." 
      onChange={handleInputChange}
      value= {no_of_pages}
      />
      <br/>
      <input type="submit" value={id ? "Update" : "Add"}/>
    </form>
    </div>
  )  
}


export default AddEdit