/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { libPatch } from '../utils/helpers/libraryHelpers'

export default function RenameLibraryModal({ showRenameModal, setShowRenameModal, actualLibraryName, bookToLibrary, userData }){
  const [ noBueno, setNoBueno ] = useState('')

  const navigate = useNavigate()

  async function validate(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    
    // validating every field has been fulfilled
    if (!Object.values(parsedData)[0]){
      return setNoBueno('Your Library needs a name!')
    }
    console.log(parsedData)
    await libPatch(bookToLibrary, userData.token, parsedData)
    navigate(`/${userData.id}/library/${bookToLibrary}/`)
  }

  function exit(){
    setNoBueno('')
    setShowRenameModal(false)
  }

  return (
    <Modal centered show={showRenameModal}>
      <div className="outer_modal">
        {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
        <div className="form_modal">
          <button className='exit' onClick={exit}>x</button>
          <div>
            {
              <form className="form" action="" onSubmit={(e) => validate(e)}>
                <input className="textinput" type="text" name="name" defaultValue={actualLibraryName} />
                <input className="submit" type="submit" value="Ok" />
              </form>
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}