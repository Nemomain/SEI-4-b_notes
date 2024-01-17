import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

export default function HomeModal({ show, setShow, option, setOption, userData, setUserData }) {

  const [ noBueno, setNoBueno ] = useState('')
  // navigation
  const navigate = useNavigate()

  async function login(parsedData) {
    try {
      const res = await axios.post('/api/users/login/', parsedData)
      if (res.status != 200) {
        setNoBueno('Something went wrong. Check your credentials.')
      } else {
        //res.data.access is a JWT token
        const token = res.data.access
        // decode token
        const decoded = jwtDecode(token)
        setUserData({id: decoded.user_id, token: token}) 
        sessionStorage.setItem('data', JSON.stringify(userData))
        setTimeout(() => { // Timeout is needed because if sessionStorage is not properly set, user is immediately taken to url ('/') by useEffect in component Header
          navigate(`/${decoded.user_id}`) //want to decode JWT to find user id to include in navigate
        }, 200)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function register(parsedData) {
    try {
      const res = await axios.post('/api/users/register/', parsedData)
      res.status === 201 ? setOption('Confirmation') : setNoBueno('Something went wrong. Try using a different username/email.')
    } catch (error) {
      console.log(error)
    }
  }

  function validate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    const formKeys = []
    let str = ''
    
    // validating every field has been fulfilled
    for (const [key, value] of Object.entries(parsedData)) {
      if (!value) formKeys.push(key)
    }
    if (formKeys.length > 0){
      // If empty values were found we make a string with them to add to an error message
      formKeys.map(val => str = `${str}${val} ,`)
      str = str.substring(0, str.length - 2)
      return setNoBueno('Seems you have missed some fields: \n' + str)
    } else {
      setNoBueno('')
    }

    // Client side authentication
    if (option === 'Register' && parsedData.password !== parsedData.password_confirmation) {
      return setNoBueno('Password confirmation must match password')
    }
    
    if (option === 'Register') {
      register(parsedData)
    } else if (option === 'Login') {
      login(parsedData)
    }
  }
  
  function exit(){
    setNoBueno('')
    setShow(false)
  }

  return (
    <Modal centered show={show}>
      <div className="outer_modal">
        {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
        <div className="form_modal">
          <button className='exit' onClick={exit}>x</button>
          <div>
            {
              option === "Login" ?
              <form className="form" action="" onSubmit={validate}>
                <input className="textinput" type="text" name="username" placeholder="Username" />
                <input className="textinput" type="password" name="password" placeholder="Password" />
                <input className="submit" type="submit" value="Ok" />
              </form>
              : option === "Register" ?
              <form className="form" action="" onSubmit={validate}>
                <input className="textinput" type="text" name="name" placeholder="Username" />
                <input className="textinput" type="text" name="email" placeholder="Email" />
                <input className="textinput" type="password" name="password" placeholder="Password" />
                <input className="textinput" type="password" name="password_confirmation" placeholder="Confirm Password" />
                <input className="submit" type="submit" value="Ok" />
              </form>
              : option === "Confirmation" ?
              <section className="reg_confirm">Registration Successful!</section>
              :
              () => setShow(false)
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}
