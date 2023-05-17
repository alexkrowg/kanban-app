import React, {useState} from 'react'
import Languages from "../Languages.json"



const NewTaskModal = (props) => {

  const [taskDetails, setTaskDetails] = useState({
    name: "",
    description: "",
    subtask: ""
  })

  const handleChange = (e) => {
    setTaskDetails(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className='modal-box'>
      <h1 className='modal-title'>{Languages[props.language].addTask}</h1>
      <form className='modal-form'>
        <label htmlFor="name">{Languages[props.language].taskName}</label>
        <input type="text" name="name" value={taskDetails.name} onChange={handleChange}></input>
        <label htmlFor="subtask">{Languages[props.language].description}</label>
        <textarea name="description" value={taskDetails.description} onChange={handleChange}></textarea>
      </form>
      <button className='nav-btn' onClick={() => props.handleClick(taskDetails.name,taskDetails.description, taskDetails.subtask)}>{Languages[props.language].add}</button>
    </div>
  )
}

export default NewTaskModal