import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'


import { libraryLister } from '../utils/helpers/libraryHelpers'
import { bookPatchLibrary } from '../utils/helpers/bookHelpers'


export default function BookLibraryManagerModal({bookData, showManager, setShowManager, userData}){
  const [list, setList] = useState('')
  const [ noBueno, setNoBueno ] = useState('')
  const [libraryTally, setLibraryTally] = useState('')
  
  const navigate = useNavigate()

  async function modify(libraryId){
    console.log(bookData.id)
    await bookPatchLibrary(userData.token, bookData.id, libraryId)
    navigate(`/${userData.id}/book/${bookData.id}`)
  }


  function exit(){
    setNoBueno('')
    setShowManager(false)
  }
  
  useEffect(() => {
    async function fetchData(){
      setList(await libraryLister(userData.token))
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    const tally = {included: [], notIncluded: []}
    const mapper = list.data
    //this line is to avoid doing anything on first render, and wait for list to be called from API
    if (mapper) {
      // we map over the list of libraries
      mapper.map((lib) => {
        // we check if the library id is among the libraries included in our book
        bookData.libraries_id.some((bookLib) => bookLib.id === lib.id) ?
        // we organise the data in two arrays
        tally.included.push(lib) : tally.notIncluded.push(lib)
      })
      setLibraryTally(tally)
    }
    
  }, [list])


  return(
    <Modal centered show={showManager}>
      <div className="outer_modal">
      {noBueno && <div className="disclaimer"><p>{noBueno}</p></div>}
      <div className="option_wrap">
        <div className='exit_placer'>
          <button className='exit' onClick={exit}>x</button>
        </div>
        {libraryTally ?
        <div>
          <div>
            {libraryTally.notIncluded.length > 0 && (
              <>
                <p>Select a Library to add this Book to it</p>
                {libraryTally.notIncluded.map((lib) => (
                  <article className='lib_include' key={lib.id} onClick={() => modify(lib.id)}>
                    <p>{lib.name}</p>
                  </article>
                ))}
              </>
            )}
          </div>
          <div>
            {libraryTally.included.length > 1 && (
              <>
                <p>Select a Library to remove the Book from it</p>
                {libraryTally.included.map((lib) => (
                  <article className='lib_exclude' key={lib.id} onClick={() => modify(lib.id)}>
                    <p>{lib.name}</p>
                  </article>
                ))}
              </>
            )}
          </div>
        </div>
        :
        <Spinner animation='border' />}
      </div>
      </div>
    </Modal>
  )
}