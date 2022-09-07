import '@reach/dialog/styles.css'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

function LoginForm({onSubmit, buttonText}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const {username, password} = event.target.elements
    console.log(username.value)

    onSubmit({
      username: username.value, 
      password: password.value, 
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username"></input>
      <label htmlFor="password">Password</label>
      <input type="text" id="password" name="password"></input>
      <input type="submit" value={buttonText} />
    </form>
  )
}

function App() {
  const [openModal, setOpenModal] = React.useState('none')

  const login = (formData) => {
    console.log('login', formData)
  }
  const register = (formData) => {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText={'Login'}></LoginForm>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText={'Register'}></LoginForm>
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}

