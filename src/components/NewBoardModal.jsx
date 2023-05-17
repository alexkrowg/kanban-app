import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Languages from "../Languages.json"


const NewBoardModal = (props) => {

    const [boardDetails, setBoardDetails] = useState({
        name: "",
        columns: []
    })


    const deleteColumn = (e) => {
        setBoardDetails(prevData => {
            return {
                ...prevData,
                columns: prevData.columns.filter(column => column.id !== e.target.id)
            }
        })
    }

    const addColumn = () => {
        setBoardDetails(prevData => {
            return {
                ...prevData,
                columns: [...prevData.columns, {
                    id: nanoid(),
                    name: "",
                    tasks:[]
                }]
            }
        })
    }

    const handleColumnChange = (e) => {
        setBoardDetails(prevData => {
            return {
                ...prevData,
                columns: prevData.columns.map(column => {
                    return column.id === e.target.id ? { ...column, name: e.target.value } : { ...column }
                })
            }
        })
    }

    const handleChange = (e) => {
        setBoardDetails(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const columnElements = boardDetails.columns.map(column => {
        return <div className='subtask-container'>
            <input className='subtask-input' id={column.id} type="text" name="name" value={column.name} onChange={handleColumnChange} />
            <button type='button' className='delete-btn' id={column.id} onClick={deleteColumn}>X</button>
        </div>
    })

    return (
        <div className='modal-box'>
            <h1 className='modal-title'>{Languages[props.language].addBoard}</h1>
            <form className='modal-form'>
                <label htmlFor="name">{Languages[props.language].boardName}</label>
                <input type="text" name="name" value={boardDetails.name} onChange={handleChange} required></input>
                <label htmlFor='column'>{Languages[props.language].columns}</label>
                {columnElements}
                <button type='button' className='nav-btn' onClick={addColumn}>+ {Languages[props.language].addColumn}</button>
            </form>
            <button className='nav-btn' onClick={() => props.handleClick(boardDetails.name, boardDetails.columns)}>{Languages[props.language].add}</button>
        </div>
    )
}

export default NewBoardModal