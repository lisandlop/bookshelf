import React from 'react'
import {createRoot} from 'react-dom/client'
import { Logo } from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
const App = () => {
  return (
    <>
      <Logo width="80" height='80'></Logo>
      <h1>Bookshelf</h1>
      <button onClick={() => {console.log('login')}}>Login</button>
      <button onClick={() => {console.log('register')}}>Register</button>
    </>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}