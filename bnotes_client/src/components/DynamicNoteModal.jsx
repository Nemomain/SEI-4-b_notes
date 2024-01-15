import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { noteCreate } from '../utils/helpers/noteHelpers'

export default function DynamicNoteModal({ showNoteModal, setShowNoteModal, userData, noteToBook }){
  const [ noBueno, setNoBueno ] = useState('')

  const navigate = useNavigate()


  async function validate(e){
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const parsedData = Object.fromEntries(formData.entries())
      console.log(parsedData)
      await noteCreate(userData.id, parsedData)
      navigate(`/${userData.id}/book/${noteToBook}/`)
    } catch (error) {
      console.log(error)
    }
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
              <form className="form" action="" onSubmit={(e) => validate(e)}>
                <input className="textinput" type="text" name="title" placeholder="Note Title" />
                <label>
                  Write your note:
                  <textarea
                    name="text"
                    rows={12}
                    cols={37}
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