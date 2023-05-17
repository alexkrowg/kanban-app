import React from 'react'
import Languages from "../Languages.json"

const DeleteColumnModal = (props) => {
  return (
    <div className='modal-box center'>
        <p>{Languages[props.language].deleteColumnConfirmation}</p>
        <div className='modal-confirmation'>
            <button className='modal-btn decline-btn' onClick={() => props.handleDeleteColumn(false)}>{Languages[props.language].no}</button>
            <button className='modal-btn confirm-btn' onClick={() => props.handleDeleteColumn(true)}>{Languages[props.language].yes}</button>
        </div>
    </div>
  )
}

export default DeleteColumnModal