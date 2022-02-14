import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

// Hyödynnetään Axios-metodeja tietokannan muokkaamiseen

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = (newPerson: any) => {
    return axios.post(baseUrl, newPerson)
  }
  
  const deletePerson = (person: any) => {
    axios.delete(`${baseUrl}/${person.id}`)
    return (person)
  }
  
  const updatePerson = (id: number, person: any) => {
    return axios.put(`${baseUrl}/${id}`, person)
  }
  
  // Muodostetaan metodeista serveri
  const personService ={
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
  }
  
  export default personService;