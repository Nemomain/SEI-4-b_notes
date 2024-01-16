
import { useEffect, useState } from "react"
import { useLoaderData, useOutletContext } from "react-router-dom"

import Header from "./Header"
import DynamicNoteModal from "./DynamicNoteModal"


export default function SingleBook(){ //! Y Not Loading the notes??

  const bookData = useLoaderData()
  console.log(bookData)

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const [show, setShow] = useState(false)
  const [whichField, setWhichField] =useState('')
  const [fieldValue, setFieldValue] =useState('')
  const [noteToMod, setNoteToMod] =useState('')

  function openModal(note, which, what){
    //which refers to which field to modify what refers to the value of that field
    setNoteToMod(note)
    setWhichField(which)
    setFieldValue(what)
    setShow(!show)
  }


  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <DynamicNoteModal noteToMod={noteToMod} whichField={whichField} fieldValue={fieldValue} show={show} setShow={setShow} userData={userData} noteToBook={bookData.id} />
        <div className="row">
          <div className="book_hero">
            <img src={bookData.cover} alt="" />
            <h2>{bookData.name}</h2>
          </div>
          <div className="notes_list">
            {bookData.notes && bookData.notes.length > 0 ?
            bookData.notes.map((note) => (
              <section className="note_instance" key={note.id}>
                <div className="note_title">
                  <p className="note_p">{note.title}</p>
                  <button className="edit_title" onClick={() => openModal(note.id, 'title', note.title)}>Edit</button>
                  {/* <img src="/assets/b_logo.png" alt="" /> */}
                </div>
                <div className="note_text">
                  <p>{note.text}</p>
                  <button className="edit_text" onClick={() => openModal(note.id, 'text', note.text)}>Edit</button>
                </div>
              </section>
            ))
            :
            <p>No notes</p>
            }
          </div>
        </div>

      </div>
    </>
  )
}