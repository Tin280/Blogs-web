
import Notification from './Notification'
import PropTypes from 'prop-types'
const LoginForm = ({ handleRegisterForm, errorMessage, handleLogin, username, setUsername, password, setPassword, handleCancel, handRegister }) => (
  <div id='loginForm' >
    <Notification message={errorMessage} classname='error' />
    <h1 className='heading'>Login</h1>
    <form onSubmit={handleLogin} >
      <div>
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}

          placeholder='Username'
        />
      </div>
      <div>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}

          placeholder='Password'
        />
      </div>
      <button className='button' type="submit" >log in</button> <br />
      {/* <button onClick={handleCancel}>cancel</button> */}
      <a onClick={handleRegisterForm} className='link'>Don't Have An Account? Register One</a>
    </form>
  </div>
)

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired

}

export default LoginForm