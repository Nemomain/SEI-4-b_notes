
import { useOutletContext, useLoaderData, useNavigate } from "react-router-dom"

import Header from "./Header"

import { bookCreate } from "../utils/helpers/bookHelpers"


export default function BookSearch(){

  const [searchData, libraryId] = useLoaderData()
  console.log('here', searchData, libraryId)
  const data = useOutletContext()
  const [ userData, setUserData ] = data

  const navigate = useNavigate()

  async function add(bookData){
    const dataToSend = {
      google_id: bookData[0],
      name: bookData[1],
      author: bookData[2],
      cover: bookData[3],
      libraries_id: [libraryId]
    }
    await bookCreate(userData.token, dataToSend)
    navigate(`/${userData.id}/library/${libraryId}`)
  }
  
  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <div className="wrapper">
        <h2>Search Results</h2>
        <div className="search_wrapper">
          {searchData.items ?
          searchData.items.map((book) => (
            <section key={book.id} className="search_instance">
              <div className="no_button">
                <div className="book_display">
                {
                book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ?
                <img className="invis_small" src={book.volumeInfo.imageLinks.smallThumbnail} alt={`Cover for ${book.volumeInfo.title} by ${book.volumeInfo.authors && book.volumeInfo.authors[0]}`} />
                :
                <div className="fake_cover invis_small">
                  <p>No cover available</p>
                </div>
                }
                  <p className="info_piece"><span className="bold">Title:</span> {`${book.volumeInfo.title}`}</p>
                  <p className="info_piece"><span className="bold">Author:</span> {`${book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'None Available'}`}</p>
                </div>
                  <p className="info_piece description"><span className="bold">Description:</span> {`${book.volumeInfo.description ? book.volumeInfo.description : 'No description available'}`}</p>
              </div>
              <button onClick={() => {
                add([book.id,
                book.volumeInfo.title,
                book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'None Available',
                book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : 'Not Available'])}}
                className="add_book">Add to Library
              </button>
            </section>
          ))
          :
          <p>No Results</p>
          }
        </div>
      </div>
    </>
  )
}