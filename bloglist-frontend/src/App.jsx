import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import resgisterService from './services/register'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import RegisterForm from './components/RegisterForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState('')
  const [refreshBlog, setRefreshBlog] = useState(false)

  const [showRegisterForm, setShowRegisterForm] = useState(false)


  const handleRegisterForm = (event) => {
    setShowRegisterForm(true)
    event.preventDefault()
  }

  const handleCancelRegistration = (event) => {
    event.preventDefault()
    setShowRegisterForm(false)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlog])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(blogs)
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      // console.log(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
        setUsername('')
        setPassword('')
      }, 3000)
    }

  }
  const handleRegister = async (username, name, password) => {
    event.preventDefault()
    console.log()
    const createuser = await resgisterService.register({ username, name, password })
    setShowRegisterForm(false)
  }


  const handleCancel = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    await setUser(null)
    // window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
  }


  // Handle create
  const handleCreateBlog = async (newBlog) => {
    try {
      BlogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      await setBlogs([...blogs, createdBlog])
      setRefreshBlog(!refreshBlog)
    }
    catch (exception) {
      console.log(exception)
    }
  }


  const handleKeyPress = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      handleLogin(event)

    }
  }


  const updateBloglikes = async (newBlog) => {

    const updatedBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: newBlog.user.id, // Use only the user ID
      id: newBlog.id,
    }
    await blogService.update(updatedBlog)
    setRefreshBlog(!refreshBlog)
  }

  const deletebBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      setRefreshBlog(!refreshBlog)
    }
  }

  const BlogFormRef = useRef()


  const blogForm = () => (
    <div id='loginForm'>
      <h1 className='heading'>blogsList</h1>
      <div>
        {notification && <Notification message={notification} classname='notification' />}
      </div>

      <span className="logged-in-user">{user.name} </span>logged in.
      <button id='logout' onClick={handleLogout} className='Bloglistbtn'>logout</button>
      <br />
      <br />
      <div>
        <Togglable buttonLabel="create new blog" ref={BlogFormRef}
        >
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            setNotification={setNotification}
          />
        </Togglable>
        <br />
        {blogs.filter(blog => blog.user !== undefined && blog.user !== null).filter(blog => blog.user.username === user.username).sort((a, b) => {
          return -(a.likes - b.likes)
        }).map(blog =>

          <Blog key={blog.id} blog={blog} updateBlog={updateBloglikes} deletebBlog={deletebBlog} user={user} />
        )}
      </div>
    </div>
  )




  const registerForm = () => (
    <RegisterForm
      username={username}
      setUsername={setUsername}
      name={name}
      setName={setName}
      password={password}
      setPassword={setPassword}
      handleCancelRegistration={handleCancelRegistration}
      handleRegister={handleRegister}
    />
  )

  const loginForm = () => (

    <LoginForm
      errorMessage={errorMessage}
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleCancel={handleCancel}
      handleRegisterForm={handleRegisterForm}
    />

  )

  return (
    <div>
      {showRegisterForm ? (
        <RegisterForm handleCancelRegistration={handleCancelRegistration}
          handleRegister={handleRegister} />
      ) : (
        user === null ? (
          loginForm()
        ) :
          blogForm()
      )
      }
    </div>
  )


}


export default App