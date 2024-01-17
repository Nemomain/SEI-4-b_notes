import { useOutletContext,useNavigate } from "react-router-dom"
import { useState } from 'react'

import HomeModal from "./HomeModal"


export default function Homepage(){
  const data = useOutletContext()
  const [ userData, setUserData ] = data
  const [show, setShow] = useState(false)
  const [option, setOption] = useState('')

  const navigate = useNavigate()

  function loadModal(definition) {
    setOption(definition)
    setShow(true)
  }

  return (
    <div className="homemenu">
      <h1 className="logo">b_notes</h1>
      <div className="homeselect" onClick={() => navigate('/about/')}>
        <h3>About</h3>
      </div>
      <div className="homeselect" onClick={() => loadModal('Login')}>
        <h3>Login</h3>
      </div>
      <div className="homeselect" onClick={() => loadModal('Register')}>
        <h3>Register</h3>
      </div>
      <HomeModal show={show} setShow={setShow} option={option} setOption={setOption} userData={userData} setUserData={setUserData}/>
    </div>
  )
}