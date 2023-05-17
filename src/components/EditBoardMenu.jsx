import React from 'react'
import Languages from "../Languages.json"

const EditBoardMenu = (props) => {
  return (
    props.boardLength > 0 ? <div className='edit-modal'>
      <button className='edit-btn' onClick={() => props.handleClick("edit")}>{Languages[props.language].editBoard}</button>
      <button className='edit-btn delete' onClick={() => props.handleClick("delete")}>{Languages[props.language].deleteBoard}</button>
    </div> : <div className='edit-modal'><button className='edit-btn' onClick={() => props.handleClick("create")}>{Languages[props.language].addBoard}</button></div>
  )
}

export default EditBoardMenu