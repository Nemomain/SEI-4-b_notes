
import axios from "axios"

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

export async function bookLibraryList(token, libraryId) {
  try {
    const res = await axios.get(`/api/books/1/${libraryId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}