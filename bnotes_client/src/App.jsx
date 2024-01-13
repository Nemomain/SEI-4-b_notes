import { Outlet, useNavigation } from 'react-router-dom'


import { Spinner } from 'react-bootstrap'
import { useState } from 'react'

function App() {
  const [userData, setUserData] = useState('')
  const navigation = useNavigation()

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
