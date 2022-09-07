import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

function App() {
  const [showDialog, setShowDialog] = React.useState(false);
  const [openModal, setOpenModal] = React.useState("none");
  const close = () => setShowDialog(false);

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>

      <div>
        <button onClick={() => {
          setShowDialog(true)
          setOpenModal("Login")
        }}>Login</button>
      </div>

      <div>
        <button onClick={() => {
          setShowDialog(true)
          setOpenModal("Register")
        }}>Register</button>
      </div>

      <Dialog aria-label="Registration form" isOpen={showDialog} onDismiss={close}>
        <button 
          className="close-button" 
          onClick={() => {
            setShowDialog(false);
            setOpenModal("none")
          }}
        >
          Close
        </button>
        <p>{openModal}</p>
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
