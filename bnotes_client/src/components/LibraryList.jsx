import { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom"

import { libraryLister } from '../utils/helpers/libraryHelpers'


import Header from './Header'
import LibraryModal from './LibraryModal'

export default function LibraryList(){
  // List is meant to be the list of libraries to be rendered
  const [list, setList] = useState('')
  // show is to control the visibility of the modal
  const [show, setShow] = useState(false)

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  function openModal(){
    setShow(!show)
  }

  useEffect(() => {
    async function fetchData(){
      setList(await libraryLister(userData.token))
    }
    if (!list) fetchData()
  }, [list])


  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <h2>Your Libraries</h2>
        <button className="add_lib" onClick={openModal}>New Library</button>
        <LibraryModal list={list} setList={setList} show={show} setShow={setShow} userData={userData} setUserData={setUserData} />
        {list ?
        list.data.map((lib) => (
          <section className="library_instance" key={lib.id}>
              <h3 className="lib_name">{lib.name} ({lib.books ? lib.books.length() : '0'} books)</h3>
              <button className="add_book">Add Book</button>
          </section>
        ))
        :
        <p>No libraries yet</p>
        }
      </div>
    </>
  )
}