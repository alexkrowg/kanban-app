import React, { useEffect, useState } from 'react'


const Nav = (props) => {

    const [language, setLanguage] = useState(props.language)

    const handleChange = (e) => {
        setLanguage(e.target.value)
    }

    useEffect(() => {
        props.handleChangeLanguage(language)
    },[language])

    return (
        <div className='nav-container'>
            <h1 className='logo'><i className="fa-solid fa-square-poll-vertical" style={{marginRight:"10px"}}></i>kanban.</h1>
            <div className='nav--info'>
                <h3 className='board-name'>{props.activeBoard.name}</h3>
                <div className='nav--actions'>
                    <button className='action-btn' onClick={() => props.handleOpenBoardEdit()}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                    <select value={language} onChange={handleChange}>
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Nav