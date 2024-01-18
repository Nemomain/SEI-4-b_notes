
import axios from "axios"

// CREATE
export async function bookCreate(token, parsedData) {
  try {
    const res = await axios.post('/api/books/', parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

// GET SINGLE
export async function getBookSingle(bookId) { //!loader
  try {
    const userData = JSON.parse(sessionStorage.getItem('data'));
    const token = userData.token;
    const res = await axios.get(`/api/books/${bookId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// LIST FROM LIBRARY
export async function bookLibraryList(token, libraryId) {
  try {
    const res = await axios.get(`/api/books/library/${libraryId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function bookPatchLibrary(token, bookId, libraryId) {
  try {
    const res = await axios.patch(`/api/books/modlibrary/${bookId}/${libraryId}/`, {}, { //since its a patch, it needs some kind of data even if its an empty object
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}