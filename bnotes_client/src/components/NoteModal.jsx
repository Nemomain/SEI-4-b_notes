import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { noteCreate } from '../utils/helpers/noteHelpers'

export default function NoteModal({ showNoteModal, setShowNoteModal, userData, noteToBook }){
  const [ noBueno, setNoBueno ] = useState('')

  const navigate = useNavigate()


  async function validate(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())

    let formKeys = []
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
    await noteCreate(userData.token, parsedData)
    navigate(`/${userData.id}/book/${noteToBook}/`)
  }

  function exit(){
    setNoBueno('')
    setShowNoteModal(false)
  }

  return (
    <Modal centered show={showNoteModal}>
      <div className="outer_modal">
        {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
        <div className="form_modal">
          <button className='exit' onClick={exit}>x</button>
          <div>
            {
              <form className="note_form" action="" onSubmit={(e) => validate(e)}>
                <input className="textinput" type="text" name="title" placeholder="Note Title" />
                <label>
                  Write your note:
                  <textarea
                    name="text"
                    rows={12}
                    cols={37}
                    className='textarea'
                  />
                </label>
                <input type="hidden" name="book" value={noteToBook} />
                <input className="submit" type="submit" value="Ok" />
              </form>
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}