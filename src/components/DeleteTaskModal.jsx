import React from 'react'
import Languages from "../Languages.json"

const DeleteTaskModal = (props) => {
    return (
        <div className='modal-box center'>
            <p>{Languages[props.language].deleteTaskConfirmation}</p>
            <div className='modal-confirmation'>
                <button className='modal-btn decline-btn' onClick={() => props.handleDeleteTask(false)}>{Languages[props.language].no}</button>
                <button className='modal-btn confirm-btn' onClick={() => props.handleDeleteTask(true)}>{Languages[props.language].yes}</button>
            </div>
        </div>
    )
}

export default DeleteTaskModal