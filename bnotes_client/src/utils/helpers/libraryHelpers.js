import axios from "axios"

export async function libraryLister(token) {
  try {
    const res = await axios.get('/api/libraries/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function libraryCreate(token, parsedData) {
  try {
    const res = await axios.post('/api/libraries/', parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}