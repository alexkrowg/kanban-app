import { nanoid } from 'nanoid'
import React, {useState } from 'react'
import Task from './Task'
import Languages from "../Languages.json"


const Board = (props) => {

    const [targetedColumn, setTargetedColumn] = useState("")

    const columnElements = props.columns.map(column => {


        const createTask = () => {
            props.handleSetColumnId(targetedColumn)
            props.handleModalToggling(true, "task")
        }


        const taskElements = column.tasks.map(task => {

            const updateTask = (id) => {
                props.handleSetTaskId(id)
                props.handleModalToggling(true, "taskUpdate")
            }

            

            return (
                <Task
                    key={nanoid()}
                    {...task}
                    handleClick={(id) => updateTask(id)}
                    language={props.language}
                />
            )
        })

        return (
            <div className='board-column' onMouseEnter={() => setCurrentColumn(column.id)} onMouseLeave={() => handleTargetedColumn("")}>
                <div className='modal-header'>
                    <h3>{column.name} ({column.tasks.length})</h3>
                    {targetedColumn === column.id && <i className="fa-solid fa-trash-can" onClick={() => props.handleDeleteConfirmation(column.id, "deleteColumn")} style={{marginRight:"20px"}}></i>}
                </div>
                <section className='column-tasks'>
                    {taskElements}
                    {targetedColumn === column.id && <div className='new-task-btn' onClick={() => createTask()}>
                        {Languages[props.language].addTask}
                    </div>}
                </section>
            </div>
        )
    })

    const handleTargetedColumn = (id) => {
        setTargetedColumn(id)
    }

    const setCurrentColumn = (id) => {
        handleTargetedColumn(id)
        props.handleSetCurrentColumn(id)
    }

    return (
        <div className='board'>
            {columnElements}
        </div>
    )
}

export default Board