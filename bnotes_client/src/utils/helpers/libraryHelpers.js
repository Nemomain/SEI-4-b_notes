import axios from "axios"

// GET list of libraries belonging to user
export async function libraryLister(token) {
  try {
    const res = await axios.get('/api/libraries/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

// CREATE library
export async function libraryCreate(token, parsedData) {
  try {
    const res = await axios.post('/api/libraries/', parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

// UPDATE library
export async function libPatch(id, token, parsedData) {
  try {
    const res = await axios.patch(`/api/libraries/${id}/`, parsedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('id', id, 'res', res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
