/* eslint-disable react/prop-types */

import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

import { libraryCreate, libraryLister } from "../utils/helpers/libraryHelpers";



export default function HomeModal({ list, setList, show, setShow, userData, setUserData }) {

  const [ noBueno, setNoBueno ] = useState('')

  function exit(){
    setNoBueno('')
    setShow(false)
  }

  //validate function validates the user has written in the field and if so, generates the api request to create library, and updates local library list
  async function validate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    if (!parsedData.name){
      setNoBueno('Your new Library needs a name!')
    } else {
      const newLibrary = await libraryCreate(userData.token, parsedData)
      const updatedList = await libraryLister(userData.token);
      setList(updatedList)
      exit()
    } 
  }
  

  return (
    <Modal centered show={show}>
      <div className="outer_modal">
        {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
        <div className="form_modal">
          <button className='exit' onClick={exit}>x</button>
          <div>
            {
              <form className="form" action="" onSubmit={validate}>
                <input className="textinput" type="text" name="name" placeholder="New Library Name" />
                <input type="hidden" name="user_id" value={userData.id} />
                <input className="submit" type="submit" value="Ok" />
              </form>
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}
