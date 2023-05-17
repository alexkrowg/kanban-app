import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import Languages from "../Languages.json"


const UpdateTask = (props) => {


    const [taskProps, setTaskProps] = useState({
        ...props.currentTask,
        description: props.currentTask.description,
        subtasks: [...props.currentTask.subtasks.map(task => task)]
    })

    const [updateColumn, setUpdateColumn] = useState(props.currentColumn)

    useEffect(() => {
        console.log(props.currentColumn)
    },[props.currentColumn])


    const handleChange = (e) => {
        setTaskProps(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleColumnChange = (e) => {
        setUpdateColumn(e.target.value)
    }


    const handleSubtaskChange = (e) => {
        setTaskProps(prevData => {
            return {
                ...prevData,
                subtasks: prevData.subtasks.map(subtask => {

                    if (e.target.type === "checkbox") {
                        return subtask.id === e.target.id ? { ...subtask, status: !subtask.status } : { ...subtask }
                    } else {
                        return subtask.id === e.target.id ? { ...subtask, name: e.target.value } : { ...subtask }
                    }
                })
            }
        })
    }

    const deleteSubtask = (e) => {
        setTaskProps(prevData => {
            return {
                ...prevData,
                subtasks: prevData.subtasks.filter(subtask => subtask.id !== e.target.id)
            }
        })
    }

    const addSubtask = () => {
        setTaskProps(prevData => {
            return {
                ...prevData,
                subtasks: [...prevData.subtasks, {
                    id: nanoid(),
                    name: "",
                    status: false
                }]
            }
        })
    }

    const handleUpdateTask = () => {
        props.handleClick(taskProps)
        props.handleColumnChange(updateColumn, taskProps)
    }


    const subtasksElements = taskProps.subtasks.map(subtask => {
        return <div className='subtask-container'>
            <input className='subtask-checkbox' id={subtask.id} type="checkbox" name="status" checked={subtask.status} onChange={handleSubtaskChange} />
            <input className='subtask-input' id={subtask.id} type="text" name="name" value={subtask.name} onChange={handleSubtaskChange} style={subtask.status ? { textDecoration: "line-through", color: "gray" } : null} />
            <button type='button' className='delete-btn' id={subtask.id} onClick={deleteSubtask}>X</button>
        </div>
    })

    return (
        <div className='modal-box'>
            <div className='modal-header'>
                <h1 className='modal-title'>{props.currentTask.title}</h1>
                <i className="fa-solid fa-trash-can" onClick={() => props.handleGetConfirmation(taskProps.id, "deleteTask")} ></i>
            </div>
            <form className='modal-form'>
                <label htmlFor="description">{Languages[props.language].description}</label>
                <textarea rows={5} cols={40} type="text" name="description" value={taskProps.description} onChange={handleChange} />
                <label htmlFor="subtask">{Languages[props.language].subtasks}</label>

                {subtasksElements}


                <button type='button' className='nav-btn' onClick={addSubtask}>+ {Languages[props.language].addSubtask}</button>
                <label htmlFor='status'>{Languages[props.language].status}</label>
                <select value={updateColumn} onChange={handleColumnChange}>
                    {props.currentBoard.columns.map(column => <option value={column.id}>{column.name}</option>)}
                </select>
                <button className='nav-btn' onClick={handleUpdateTask}>{Languages[props.language].update}</button>
            </form>
        </div>
    )
}

export default UpdateTask