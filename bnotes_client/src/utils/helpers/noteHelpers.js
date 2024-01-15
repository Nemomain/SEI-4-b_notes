
import axios from "axios"

export async function noteFromBookList(token, bookId) {
  try {
    const res = await axios.get(`/api/notes/books/${bookId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function noteCreate(token, parsedData) {
  try {
    console.log('here')
    const res = await axios.post(`/api/notes/`, parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}