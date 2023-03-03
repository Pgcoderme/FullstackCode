import { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchFiled,setSearchFiled]=useState('')
  const [filterPerson,setFilterPerson]=useState(persons)
  const [message,setMessage]=useState(null)
  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
  },[])
  useEffect(()=>{
    const timer=setTimeout(()=>{
      setMessage(null)
    },5000)
    return ()=>{
      clearTimeout(timer)
    }
  },[message])
  useEffect(()=>{
    if(persons.length) {
      const newFilterPerson= persons.filter((person)=>{
        return person.name.includes(searchFiled)
      })
      setFilterPerson(newFilterPerson)
    }
    
  },[persons, searchFiled])

 const handleNamechange=(event)=>{
    setNewName(event.target.value)
 }
 const handleNumberchange=(event)=>{
  setNewNumber(event.target.value)
 }
 const handleSearchFiledchange=(event)=>{
  setSearchFiled(event.target.value)
 }
 const addPerson=(event)=>{
  event.preventDefault()
  const newperson={
    name:newName,
    number:newNumber,
  }
  if(persons.some((person)=>person.name===newperson.name)===true){
    alert(newName + ' is already added to phonebook,replace the old number with the new one')
    const needperson=persons.find(person=>person.name===newperson.name)
    const needpersonid=needperson.id
    const url = `http://localhost:3001/persons/${needpersonid}`
    const changeNumber={...needperson,number:newperson.number}
    axios.put(url,changeNumber).then(response=>{
      setPersons(persons.map(person=>person.id!==needpersonid?person:response.data))
      setMessage(`The ${needperson.name} has been changed!`)
    })
    setNewName('')
    setNewNumber('')
  }else{
    console.log(newperson)
   axios
   .post('http://localhost:3001/persons',newperson)
   .then(response=>{
    setPersons(persons.concat(response.data))
    setMessage(`Add ${newperson.name} success`)
    setNewName('')
    setNewNumber('')
   })
 }
}
const onDelete=(id,name)=>{
 const url=`http://localhost:3001/persons/${id}`
 if(window.confirm(`Delte ${name}`)){
 axios.delete(url).then(response=>{
  const updatedPersons = persons.filter((person) => person.id !== id);
  setPersons(updatedPersons)
  setMessage(`${name} has been deleted!`)
 })
}
}
const messageStyle={
  color:'green',
  fontSize:15
}
  return (
    <div>
      <h2>Phonebook</h2>
      <p style={messageStyle}>{message}</p>
      <Filter  onChangeHandler={handleSearchFiledchange}/>
       <PersonForm  
       change1={newName}
       change2={newNumber}
       onChangeHandler1={handleNamechange}
        onChangeHandler2={handleNumberchange} 
        onChangeHandler3={addPerson}  />
      <h2>Numbers</h2>
      {filterPerson.map((person)=>
      <div key={person.id}>
       <p>{person.name} {person.number}</p>
       <button onClick={()=>onDelete(person.id,person.name)}>delect</button>
       </div>
       )}
    </div>
  )
}
export default App