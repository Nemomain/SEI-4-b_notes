
import { useEffect, useState } from "react"
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"


import BookModal from "./BookModal"
import NoteModal from "./NoteModal"
import Header from "./Header"



import { bookLibraryList } from "../utils/helpers/bookHelpers"

export default function SingleLibrary(){

  const libraryData = useLoaderData()

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const [showBookModal, setShowBookModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [bookToLibrary, setBookToLibrary] = useState('')
  const [noteToBook, setNoteToBook] = useState('')
  const [bookList, setBookList] = useState([])

  const navigate = useNavigate()

  function openModal(){
    setShowBookModal(!showBookModal)
  }

  function openNoteModal(bookId){
    setNoteToBook(bookId)
    setShowNoteModal(!showNoteModal)
  }

  useEffect(() => {
    async function setup(){
      setBookList(await bookLibraryList(userData.token, libraryData.id))
    }
    setup()
    setBookToLibrary(libraryData.id)
  }, [])
  
  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <h2>{libraryData.name}</h2>
        <button className="add_lib" onClick={openModal} >Add Book</button>
        <BookModal showBookModal={showBookModal} setShowBookModal={setShowBookModal} userData={userData} bookToLibrary={bookToLibrary} />
        <NoteModal showNoteModal={showNoteModal} setShowNoteModal={setShowNoteModal} userData={userData} noteToBook={noteToBook} />
        {bookList.length > 0 ?
        bookList.map((book) => (
          <section key={book.id} className="book_instance">
            <div className="book_info">
              {book.cover === 'Not Available' ?
              <div className="fake_cover">
                <p>No cover available</p>
              </div>
              :
              <img src={book.cover} alt={`Cover for ${book.name} by ${book.author}`} />}
              <div className="book_datapoints">
                <p>{`Title: ${book.name}`}</p>
                <p>{`Author: ${book.author}`}</p>
                <p>{`Notes: ${book.notes.length}`}</p>
              </div>
              <div className="book_buttons">
                <button className="add_book" onClick={() => openNoteModal(book.id)}>Add Note</button>
              </div>
            </div>
          </section>
        ))
        :
        <p>No Books Yet</p>
        }
      </div>
    </>
  )
}