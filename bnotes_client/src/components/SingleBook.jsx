
import { useState } from "react"
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"

import Header from "./Header"
import DynamicNoteModal from "./DynamicNoteModal"
import NoteModal from "./NoteModal"
import BookLibraryManagerModal from "./BookLibraryManagerModal"

import { noteDestroy } from "../utils/helpers/noteHelpers"


export default function SingleBook(){

  const bookData = useLoaderData()

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [whichField, setWhichField] = useState('')
  const [fieldValue, setFieldValue] = useState('')
  const [noteToMod, setNoteToMod] = useState('')
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteToBook, setNoteToBook] = useState('')

  const [showManager, setShowManager] = useState(false)
  
  
  function openModal(note, which, what){
    //which refers to which field to modify what refers to the value of that field
    setNoteToMod(note)
    setWhichField(which)
    setFieldValue(what)
    setShow(!show)
  }
  
  function openLibraryManager(){
    setNoteToBook(bookData.id)
    setShowManager(!showManager)
  }
  
  async function deleteNote(id) {
    try {
      await noteDestroy(id, userData.token)
      navigate(`/${userData.id}/book/${bookData.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  function newNote(){
    setNoteToBook(bookData.id)
    setShowNoteModal(!showNoteModal)
  }
  
  
  
  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <DynamicNoteModal noteToMod={noteToMod} whichField={whichField} fieldValue={fieldValue} show={show} setShow={setShow} userData={userData} noteToBook={bookData.id} />
        <NoteModal showNoteModal={showNoteModal} setShowNoteModal={setShowNoteModal} userData={userData} noteToBook={noteToBook} />
        <BookLibraryManagerModal bookData={bookData} showManager={showManager} setShowManager={setShowManager} userData={userData} />
        <div className="row">
          <div className="book_hero">
            <img src={bookData.cover} alt="" />
            <h2>{bookData.name}</h2>
          </div>
          <div className="two_buttons">
            <button className="add_lib many_button" onClick={newNote}>New Note</button>
            <button className="add_lib many_button" onClick={openLibraryManager}>Libraries</button>
          </div>
          <div className="notes_list">
            {bookData.notes && bookData.notes.length > 0 ?
            bookData.notes.map((note) => (
              <section className="note_instance" key={note.id}>
                <div className="note_title">
                  <p className="note_p">{note.title}</p>
                  <button className="edit_title" onClick={() => openModal(note.id, 'title', note.title)}>Edit</button>
                </div>
                <div className="note_text">
                  <p>{note.text}</p>
                </div>
                <div className="note_buttons">
                  <button className="delete-note" onClick={() => deleteNote(note.id)}>Delete Note</button>
                  <button className="edit_title" onClick={() => openModal(note.id, 'text', note.text)}>Edit</button>
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