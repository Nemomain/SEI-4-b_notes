
import { useEffect, useState } from "react"
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"

import Header from "./Header"


export default function SingleBook(){ //! Y Not Loading the notes??

  const bookData = useLoaderData()

  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const [show, setShow] = useState(false)

  function openModal(){
    setShow(!show)
  }


  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <h2>{bookData.name}</h2>
        <div className="row">
          <div className="sticky">
            <img src={bookData.cover} alt="" />
          </div>
          <div className="spacer"></div>
          <div className="notes_list">
            {bookData.notes && bookData.notes > 0 ?
            bookData.notes.map((note) => (
              <section className="note_instance" key={note.id}>
                <p>{note.title}</p>
                <p>{note.text}</p>
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