import React, {useState} from 'react'
import Languages from "../Languages.json"

const EditBoardModal = (props) => {
    const [boardName, setBoardName] = useState(props.name)

    const handleChange = (e) => {
        setBoardName(e.target.value)
    }

    return (
        <div className='modal-box'>
            <h1 className='modal-title'>{Languages[props.language].editBoard}</h1>
            <form className='modal-form'>
                <label htmlFor="name">{Languages[props.language].boardName}</label>
                <input type="text" name="name" value={boardName} onChange={handleChange} required></input>
            </form>
            <button className='nav-btn' onClick={() => props.handleClick(boardName)}>{Languages[props.language].update}</button>
        </div>
    )
}

export default EditBoardModal