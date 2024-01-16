
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function BookModal({ showBookModal, setShowBookModal, userData, bookToLibrary}) {
  const [ noBueno, setNoBueno ] = useState('')
  //states for camp select
  const [author, setAuthor] = useState(true)
  const [title, setTitle] = useState(false)
  //state to define query parameters

  const navigate = useNavigate()

  //validate function validates the user has written in the field and if so, generates the api request to create library, and updates local library list
  async function validate(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    let str = ''
    //constructor of the string for google query
    Object.entries(parsedData).forEach(([key, value]) => {
      if (value) str += `${key}:${value.replace(/ /g, '%20')}+`
    })
    str = str.substring(0, str.length - 1);
    navigate(`/${userData.id}/library/${bookToLibrary}/${str}/`)
  }

  //this function is to make visible the camps the user wants to fill
  function campSelect(camp){
    if (camp === 'author'){
      setAuthor(true)
      setTitle(false)
    } else if (camp === 'title') {
      setAuthor(false)
      setTitle(true)
    } else if (camp === 'both') {
      setAuthor(true)
      setTitle(true)
    }
  }
  
  function exit(){
    setNoBueno('')
    setShowBookModal(false)
  }

  return (
    <Modal centered show={showBookModal}>
      <div className="outer_modal">
        {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
        <div className="form_modal">
          <button className='exit' onClick={exit}>x</button>
          <div>
            {
              <>
              <div className='select'>
                <select name="camp" onChange={(e) => campSelect(e.target.value)}>
                  <option value="" disabled hidden>{'--> Search Terms <--'}</option>
                  <option value="author">Search Author</option>
                  <option value="title">Search Title</option>
                  <option value="both">Search Both</option>
                </select>
              </div>
              <form className="form" action="" onSubmit={validate}>
                <input className={`textinput ${author ? '' : 'hidden'}`} type="text" name="inauthor" placeholder="Author" />
                <input className={`textinput ${title ? '' : 'hidden'}`} type="text" name="intitle" placeholder="Title" />
                <input className="submit" type="submit" value="Ok" />
              </form>
              </>
            }
          </div>
          
        </div>
      </div>
    </Modal>
  )
}
