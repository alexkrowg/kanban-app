import React from 'react'
import Languages from "../Languages.json"


const DeleteBoardConfirmModal = (props) => {
    return (
        <div className='modal-box center'>
            <p>{Languages[props.language].deleteBoardConfirmation}</p>
            <div className='modal-confirmation'>
                <button className='modal-btn decline-btn' onClick={() => props.handleDeleteBoard(false)}>{Languages[props.language].no}</button>
                <button className='modal-btn confirm-btn' onClick={() => props.handleDeleteBoard(true)}>{Languages[props.language].yes}</button>
            </div>
        </div>
    )
}

export default DeleteBoardConfirmModal