/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { notePatch } from '../utils/helpers/noteHelpers'

export default function DynamicNoteModal({ noteToMod, whichField, fieldValue, show, setShow, userData, noteToBook }){
  const [ noBueno, setNoBueno ] = useState('')

  const navigate = useNavigate()


  async function validate(e){
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const parsedData = Object.fromEntries(formData.entries())
      console.log(parsedData)
      await notePatch(noteToMod, userData.token, parsedData)
      navigate(`/${userData.id}/book/${noteToBook}/`)
    } catch (error) {
      console.log(error)
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
              <form className="form" action="" onSubmit={(e) => validate(e)}>
                {whichField == 'title' ?
                <label>
                  Edit your note title:
                  <input className="textinput" type="text" name="title" defaultValue={fieldValue} />
                </label>
                :
                <label>
                  Edit your note:
                  <textarea
                    name="text"
                    rows={12}
                    cols={37}
                    defaultValue={fieldValue}
                    />
                </label>
                }
                <input className="submit" type="submit" value="Ok" />
              </form>
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}