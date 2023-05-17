import React,{useState} from 'react'
import Languages from "../Languages.json"

const NewColumnModal = (props) => {
    const [columnName, setColumnName] = useState("")

    const handleChange = (e) => {
        setColumnName(e.target.value)
    }

    return (
        <div className='modal-box'>
            <h1 className='modal-title'>{Languages[props.language].addColumn}</h1>
            <form className='modal-form'>
                <label htmlFor="column">{Languages[props.language].columnName}</label>
                <input type="text" name="column" value={columnName} onChange={handleChange}></input>
            </form>
            <button className='nav-btn' onClick={() => props.handleClick(columnName)}>{Languages[props.language].add}</button>
        </div>
    )
}

export default NewColumnModal