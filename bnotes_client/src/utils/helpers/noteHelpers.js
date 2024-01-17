
import axios from "axios"


// GET all notes from a single book
export async function noteFromBookList(token, bookId) {
  try {
    const res = await axios.get(`/api/notes/books/${bookId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// CREATE note
export async function noteCreate(token, parsedData) {
  try {
    const res = await axios.post(`/api/notes/`, parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// UPDATE note
export async function notePatch(noteToMod, token, parsedData) {
  try {
    const res = await axios.patch(`/api/notes/${noteToMod}/`, parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

//! DELETE note
export async function noteDestroy(id, token) {
  try {
    const res = await axios.delete(`/api/notes/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}