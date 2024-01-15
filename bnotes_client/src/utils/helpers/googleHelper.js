import axios from "axios"

export async function googleCall(libraryId, search) {
  try {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDCGApD4oGtGtzeRdq_Gfi8xMakpJfgTiI`)
    console.log(res)
    return [res.data, libraryId]
  } catch (error) {
    console.log(error)
  }
}