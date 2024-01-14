import { Outlet, useNavigation } from 'react-router-dom'


import { Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function App() {
  let stage = sessionStorage.getItem('data')
  const [userData, setUserData] = useState(stage ? JSON.parse(stage) : '')
  const navigation = useNavigation()

  useEffect(() => {
    sessionStorage.setItem('data', JSON.stringify(userData))
  }, [userData])

  return (
    <>
      {
      navigation.state === 'idle' ?
      <Outlet context={[userData, setUserData]} />
      :
      <div className='centered'>
        <Spinner animation='border' />
      </div>
      }
    </>
  )
}

export default App
