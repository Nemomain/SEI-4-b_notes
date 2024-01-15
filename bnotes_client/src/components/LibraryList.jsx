import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"

import { useNavigate } from 'react-router-dom'
import { libraryLister } from '../utils/helpers/libraryHelpers'
import { bookLibraryList } from '../utils/helpers/bookHelpers'


import Header from './Header'
import LibraryModal from './LibraryModal'
import BookModal from './BookModal'

export default function LibraryList(){
  // List is meant to be the list of libraries to be rendered
  const [list, setList] = useState('')
  // show is to control the visibility of the Library modal
  const [show, setShow] = useState(false)
  const [showBookModal, setShowBookModal] = useState(false)
  const [bookToLibrary, setBookToLibrary] = useState('')
  const [bookCounting, setBookCounting] = useState([])

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

  async function bookCount(libraryId){
    const res = await bookLibraryList(userData.token, libraryId)
    return res.length
  }

  useEffect(() => {
    async function fetchData(){
      setList(await libraryLister(userData.token))
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
        <LibraryModal list={list} setList={setList} show={show} setShow={setShow} userData={userData} setUserData={setUserData} />
        <BookModal showBookModal={showBookModal} setShowBookModal={setShowBookModal} userData={userData} bookToLibrary={bookToLibrary} />
        {list ?
        list.data.map((lib, run) => (
          <section className="library_instance" key={lib.id}>
            <div className="lib_info" onClick={() => navigate(`/${userData.id}/library/${lib.id}/`)}>
              <h3 className="lib_name">{lib.name} ({bookCounting.length > 0 ? bookCounting[run] : '0'} books)</h3>
            </div>
            <div className="lib_buttons">
              <button className="add_book" onClick={() => openModal(lib.id)}>Add Book</button>
            </div>
          </section>
        ))
        :
        <p>No libraries yet</p>
        }
      </div>
    </>
  )
}