import React from 'react'
import Languages from "../Languages.json"

const Task = (props) => {

  const doneSubtasks = props.subtasks.filter(subtask => subtask.status)

  return (
    <div draggable className='task' onClick={() => props.handleClick(props.id)}>
      {props.title}
      {props.subtasks.length === 0 ? <p>{Languages[props.language].noSubtasks}</p> : <p>{doneSubtasks.length} {Languages[props.language].of} {props.subtasks.length} {Languages[props.language].subtasksDone}</p>}
    </div>
  )
} 

export default Task