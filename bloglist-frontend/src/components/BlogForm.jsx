import { useState } from 'react'
const BlogForm = ({ handleCreateBlog, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()

    const newblog = {
      title: title,
      author: author,
      url: url

    }

    handleCreateBlog(newblog)
    setNotification(`a new blog ${title} by ${author} added`)

    setTimeout(() => {
      setNotification(null)
    }, 5000)


    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <h1 className='heading'>create new</h1>
        <span >title:</span>
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
          id='title'
          placeholder="write title here"
        /><br />
        <span>author:</span>
        <input
          type='text'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
          id='author'
          placeholder="write author here"
        /><br />
        <span>url:</span>
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
          id='url'
          placeholder="write url here"
        /><br />
        <button id='createblog' type='submit' className='button'>create</button>
      </form>

    </div>
  )
}
export default BlogForm