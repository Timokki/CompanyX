import axios from 'axios'
const baseUrl = 'http://localhost:5259/ERPData/'

const getAll = () => {
  console.log("GetAll funktiossa")
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteProduct = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Olion nimet vastaavat exportattavien muuttujien nimiä. Tämän vuoksi olion
// määrittely voidaan kirjoittaa lyhyemmin. Normaalimuoto olisi
// export default {
// getAll: getAll,
// create: create,
// update: update
// }
export default {getAll, create, update, deleteProduct}