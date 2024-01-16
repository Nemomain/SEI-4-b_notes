import { Navbar, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ userData, setUserData }){
  const[ visible, setVisible ] = useState(false)
  const navigate = useNavigate()

  function toggleVisible(){
    setVisible(!visible)
  }

  function logOut(){
    setUserData('')
    sessionStorage.clear()
    navigate('/')
  }

  // user must be logged in
  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem('data')) ) {
      navigate('/')
    }
  }, [])

  return (
    <header>
      <Navbar className="pe-5 ps-5" expand="lg" style={{padding: '40px 0'}}>
        <h1 id='nav_title' style={{fontSize: 70}}>b_notes</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{borderColor: '#682B2B'}} onClick={toggleVisible} />
        <Navbar.Collapse className={visible ? 'show' : ''}>
          <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link style={{color: '#682B2B', marginLeft: 'auto'}} href={`/${userData.id}/`}>Libraries</Nav.Link>
            <Nav.Link style={{color: '#682B2B', marginLeft: 'auto'}} href="#">About</Nav.Link>
            <Nav.Link style={{color: '#682B2B', marginLeft: 'auto'}} onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}