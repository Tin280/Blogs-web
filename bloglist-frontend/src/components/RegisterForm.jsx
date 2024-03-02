/* eslint-disable */
import { useState } from 'react'

const RegisterForm = ({ handleCancelRegistration, handleRegister }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [skipValidation, setSkipValidation] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        handleRegister(username, name, password)
        setUsername('')
        setPassword('')
        setName('')
    }

    // const Hash = async (e) => {
    //     const saltRounds = 10
    //     const passwordHash = await bcrypt.hash(password, saltRounds)

    //     const user = { username, name, passwordHash }
    //     return user
    // }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className='heading'>Register</h2>
            <div>
                <label htmlFor="register-username"></label>
                <input
                    type="text"
                    id="register-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'

                />
                <div>
                    <label htmlFor="register-name"></label>
                    <input
                        type="text"
                        id="register-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'

                    />
                </div>
            </div>
            <div>
                <label htmlFor="register-password"></label>
                <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'

                />
            </div>
            <button type="submit" className='button'>Register</button>
            <a onClick={handleCancelRegistration} className='link'>Already Have An Account ? Log In Here</a>

        </form>
    )
}

export default RegisterForm
