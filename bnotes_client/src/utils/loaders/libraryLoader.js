
import axios from "axios"

export async function getSingleLibrary(libraryId) {
  try {
  const userData = JSON.parse(sessionStorage.getItem('data'));
  const token = userData.token;
  const res = await axios.get(`/api/libraries/${libraryId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
  } catch (error) {
    console.log(error)
  }
}