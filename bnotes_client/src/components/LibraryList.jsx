import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"

import { useNavigate } from 'react-router-dom'
import { libraryLister } from '../utils/helpers/libraryHelpers'
import { bookLibraryList } from '../utils/helpers/bookHelpers'
import { Spinner } from 'react-bootstrap'


import Header from './Header'
import LibraryModal from './LibraryModal'
import BookModal from './BookModal'
import RenameLibraryModal from './RenameLibraryModal'

export default function LibraryList(){
  // List is meant to be the list of libraries to be rendered
  const [list, setList] = useState('')
  // show is to control the visibility of the Library modal
  const [show, setShow] = useState(false)
  // States for adding books
  const [showBookModal, setShowBookModal] = useState(false)
  const [bookToLibrary, setBookToLibrary] = useState('')
  // States for renaming Library
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [actualLibraryName, setActualLibraryName] = useState('')
  // For book counting in the sections
  const [bookCounting, setBookCounting] = useState([])
  const [spinnerControl, setSpinnerControl] = useState(true)

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const navigate = useNavigate()

  function openModal(option){
    // if-else makes a distinction as to which modal to open and the variable 'option' allows for specificity for as to which library a book is to be added in the else camp
    if (option == 'lib') {
      setShow(!show) 
    } else {
      setBookToLibrary(option)
      setShowBookModal(!showBookModal)
    }
  }

  function openRename(name, id){
    setActualLibraryName(name)
    // bookToLibrary always represents a Library Id so it's reused
    setBookToLibrary(id)
    setShowRenameModal(true)
  }

  async function bookCount(libraryId){
    const res = await bookLibraryList(userData.token, libraryId)
    return res.length
  }

  useEffect(() => {
    async function fetchData(){
      setList(await libraryLister(userData.token))
      setSpinnerControl(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchCounts(){
      if (list && list.data) {
        const bookNum = await Promise.all(list.data.map((lib) => bookCount(lib.id)))
        setBookCounting([...bookNum])
      }
    }
    fetchCounts()
  }, [list])


  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <h2>Your Libraries</h2>
        <button className="add_lib" onClick={() => openModal('lib')}>New Library</button>
        <RenameLibraryModal showRenameModal={showRenameModal} setShowRenameModal={setShowRenameModal} actualLibraryName={actualLibraryName} bookToLibrary={bookToLibrary} userData={userData} />
        <LibraryModal list={list} setList={setList} show={show} setShow={setShow} userData={userData} setUserData={setUserData} />
        <BookModal showBookModal={showBookModal} setShowBookModal={setShowBookModal} userData={userData} bookToLibrary={bookToLibrary} />
        <div className='listing'>
          {list ?
          list.data.map((lib, run) => (
            <section className="library_instance" key={lib.id}>
              <div className="lib_info" onClick={() => navigate(`/${userData.id}/library/${lib.id}/`)}>
                <h3 className="lib_name">{lib.name} ({bookCounting.length > 0 ? bookCounting[run] : '0'} books)</h3>
              </div>
              <div className="lib_buttons">
                <button className="add_book" onClick={() => openModal(lib.id)}>Add Book</button>
                <button className="add_book" onClick={() => openRename(lib.name, lib.id)}>Rename</button>
              </div>
            </section>
          ))
          :
          spinnerControl ? 
          <Spinner animation='border' />
          :
          <p>No libraries yet</p>
          }
        </div>
      </div>
    </>
  )
}