import axios from "axios"

export async function libraryLister(change) {
  try {
    await axios.put('/api/profile', change, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
  } catch (error) {
    console.log(error)
  }
}