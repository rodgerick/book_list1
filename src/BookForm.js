import { useState } from 'react'

function BookForm(props) {
  const [title, set_title] = useState('')
  const [author, set_author] = useState('')
  const [description, set_description] = useState('')

  const handleSubmit = (e) => {
     //prevent page from reloading
     e.preventDefault()
     // pass the user obj to my App component to be added
     // to users state
     props.addBook({title, author, description})
     // hide form in App UI
     props.setShowForm(false)
     set_title('')
     set_author('')
     set_description('')
  }


  // return JSX for Form component
  return (
    <div style={{padding:'20px'}}>
      <h1>New Book</h1>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <p>Title</p>
        <input 
          value={title}
          onChange={(e)=> set_title(e.target.value)}
        />
         <p>Author</p>
        <input 
          value={author}
          onChange={(e)=> set_author(e.target.value)}
        />
        <p>Description</p>
        <input 
          value={description}
          onChange={(e)=> set_description(e.target.value)}
        />
        <button className = "btn btn-dark">add </button>
      </form>
    </div>
  );
}
export default BookForm;

const styles = {
  formContainer: {
    width:'600px',
    margin:'20px auto'
  },
}