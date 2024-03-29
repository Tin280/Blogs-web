import { useState } from 'react'
const Blog = ({ blog, updateBlog, deletebBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addlike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await updateBlog(newBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={showWhenVisible} className='whenShow'>
        Tittle: {blog.title}    Create by: {blog.author}
        <button id='view' onClick={toggleVisibility}>view</button>
      </div>
      <div style={hideWhenVisible} className='whenHidden'>

        Tittle: {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <div>URL: link{blog.url}   </div>
        <div className='likes'>
          <>likes: </>{blog.likes} <button id='like' onClick={addlike}>like</button>
        </div>
        Create by: {blog.author} <br />
        <button id='delete' onClick={() => { deletebBlog(blog) }}>remove</button>
      </div>

    </div>

  )
}
export default Blog