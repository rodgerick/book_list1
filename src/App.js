import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm.js"

function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false)

  // [] will make this only run this when component mounts
  useEffect(() => {
    getBooks();
  }, []);

  // axios call to getUsers, with error handling, using async await
  const getBooks = async () => {
    try {
      let res = await axios.get("https://fakerapi.it/api/v1/books?_quantity=5");
      setBooks(res.data.data);
    } catch (err) {
      alert("error occured in getBooks need to debug");
    }
  };

  // helper method to loop over array of users and return array of JSX
  // also checks if we have users
  const renderBooks = () => {
    if (books.length === 0) return <p>no books</p>;

    // have users in out array map over them
    return books.map((book) => {
      return (
        <div key={book.isbn}>
          <h1 style={{ margin: "5px" }}>
            <img src={book.image} height="50" width="50" alt="" /> {book.title}
          </h1>
          <h3 style={{ margin: "5px" }}> By: {book.author}</h3>
          <p style={{ margin: "5px" }}>{book.description}</p>
          <button onClick={()=>{deleteBook(book.isbn)}}>delete</button>
          <br/><br/>
        </div>
      );
    });
  };

  const deleteBook = (isbn) => {
    let filteredBooks = books.filter(b=> b.isbn !== isbn)
    setBooks(filteredBooks)
  }


  const addBook = (book) => {
    // manually add id, email, avatar
    let image = `https://lh3.googleusercontent.com/proxy/DSVCXAZe5WWYlafn3gd7R0CMaJHRwyold1F8ye0XsZiHFDIQY-3-a89HzZVk5GdIkPWnXZggxqLz0jcIxgSNZD8nOhMfAOsozdK-Qasp4k_xCDI_gQ`
    let isbn = Math.floor(Math.random()*100000)

    // es6 practice
    let full_book = {...book, image, isbn}
    setBooks([full_book, ...books])
  }

  return (
    <div>
      { showForm && 
      <BookForm addBook={addBook} setShowForm={setShowForm}/>}
      <button 
        onClick={()=>setShowForm(!showForm)}>Add New Book</button>
      {renderBooks()}
    </div>
  );
}

export default App;
