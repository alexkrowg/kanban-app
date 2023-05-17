import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Languages from "./Languages.json"
import Nav from './components/Nav';
import Board from './components/Board';
import NewBoardModal from './components/NewBoardModal';
import NewColumnModal from './components/NewColumnModal';
import NewTaskModal from './components/NewTaskModal';
import UpdateTask from './components/UpdateTask';
import DeleteColumnModal from './components/DeleteColumnModal';
import DeleteTaskModal from './components/DeleteTaskModal';
import EditBoardMenu from './components/EditBoardMenu';
import EditBoardModal from './components/EditBoardModal';
import DeleteBoardConfirmModal from './components/DeleteBoardConfirmModal';

function App() {

  // DARK MODE

  const [dark, setDark] = useState(JSON.parse(localStorage.getItem("theme")) || false)

  const toggleDarkMode = () => {
    setDark(prevState => !prevState)
  }
  // LANGUAGE

  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem("language")) || "en")

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  // BOARD

  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || [])


  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards))
  }, [boards])
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark))
  }, [dark])
  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language))
  }, [language])

  // STATES

  const [activeBoard, setActiveBoard] = useState({})
  const [currentColumn, setCurrentColumn] = useState("")
  const [currentTask, setCurrentTask] = useState({})
  const [modal, setModal] = useState({
    active: false,
    target: ""
  })

  // UPDATE ACTIVE BOARD NAME

  useEffect(() => {

    boards.length === 0 ? setActiveBoard({ name: "No boards" }) : setActiveBoard(...boards.filter(board => board.active))

  }, [boards])

  // FUNCTIONS

  const setColumnId = (id) => {
    setCurrentColumn(id)
  }
  const setTaskId = (id) => {
    const tasks = []
    const boardColumns = activeBoard.columns.map(column => column.tasks)

    for (let i = 0; i < boardColumns.length; i++) {
      for (let j = 0; j < boardColumns[i].length; j++) {
        tasks.push(boardColumns[i][j])
      }
    }

    const currentTask = tasks.filter(task => {
      return task.id === id ? task : null
    })[0]

    setCurrentTask(currentTask)

  }

  const createNewTask = (name, description) => {

    setBoards(prevState => {
      return prevState.map(board => {
        return {
          ...board, columns: board.columns.map(column => {
            return column.id === currentColumn ? {
              ...column, tasks: [...column.tasks, {
                id: nanoid(),
                title: name,
                description: description,
                subtasks: []
              }]
            } : { ...column }
          })
        }
      })

    })
    toggleModal(false, "")
  }

  const toggleActiveBoard = (id) => {
    setBoards(prevState => {
      return prevState.map(board => {
        return board.id === id ? { ...board, active: true } : { ...board, active: false }
      })
    })
  }

  const toggleModal = (state, target) => {
    setModal({
      active: state,
      target: target
    })
  }

  const createNewBoard = (name,columns) => {

    setBoards(prevState => prevState.map(board => {
      return {
        ...board,
        active: false
      }
    }))

    setBoards(prevState => [...prevState, {
      id: nanoid(),
      active: true,
      name: name,
      columns: columns
    }])

    toggleModal(false, "")
  }

  const createNewColumn = (name) => {
    setBoards(prevState => {
      return prevState.map(board => {
        return board.name === activeBoard.name ? { ...board, columns: [...board.columns, { id: nanoid(), name: name, tasks: [] }] } : { ...board }
      })
    })

    toggleModal(false, "")
  }

  // UPDATE FUNCTIONS

  const updateTask = (data) => {

    setBoards(prevState => {
      return prevState.map(board => {
        return {
          ...board,
          columns: board.columns.map(column => {
            return {
              ...column,
              tasks: column.tasks.map(task => {
                return task.id === data.id ? data : task
              })
            }
          })
        }
      })
    })

    toggleModal(false, "")

  }

  const deleteTask = (confirm) => {
    confirm ? setBoards(prevState => prevState.map(board => {
      return {
        ...board,
        columns: board.columns.map(column => {
          return { ...column, tasks: column.tasks.filter(task => task.id !== currentTask.id) }
        })
      }
    })) : setBoards(prevState => prevState)

    confirm ? toggleModal(false, "") : toggleModal(true, "taskUpdate")
  }

  const getConfirmation = (id, target) => {
    toggleModal(true, target)
    setCurrentColumn(id)
  }


  const deleteColumn = (confirm) => {

    confirm ? setBoards(prevState => prevState.map(board => {
      return {
        ...board,
        columns: board.columns.filter(column => column.id !== currentColumn)
      }
    })) : setBoards(prevState => prevState)

    toggleModal(false, "")
  }

  const editBoardMenu = (action) => {

    if (action === "delete") {
      toggleModal(true, "deleteBoard")
    } else if (action === "edit") {
      toggleModal(true, "editBoard")
    } else {
      toggleModal(true, "board")
    }
  }

  const editBoard = (name) => {
    setBoards(prevState => prevState.map(board => {
      return board.id === activeBoard.id ? { ...board, name: name } : board
    }))

    toggleModal(false, "")
  }

  const deleteBoard = (confirm) => {
    if (confirm) {
      setBoards(prevState => prevState.filter(board => board.id !== activeBoard.id))
      setBoards(prevState => prevState.map(board => { return prevState.indexOf(board) === 0 ? { ...board, active: true } : board }))
      setActiveBoard(boards[0])
      toggleModal(false, "")
    }else{
      toggleModal(true, "editBoardMenu")
    }
  }

  const handleColumnChange = (newColumnId,taskProps) => {
    setBoards(prevState => prevState.map(board => {return{
      ...board,
      columns: board.columns.map(column => {return column.id === currentColumn ? {...column, tasks: column.tasks.filter(task => task.id !== taskProps.id)} : column})
    }}))

    setBoards(prevState => prevState.map(board => {return{
      ...board,
      columns: board.columns.map(column => {return column.id === newColumnId ? {...column, tasks: [...column.tasks, taskProps]} : {...column}})
    }}))
  }


  // MAPPING

  const boardElements = boards.map(board => {
    return (
      board.active ? <Board
        key={nanoid}
        {...board}
        handleSetColumnId={setColumnId}
        handleSetTaskId={setTaskId}
        handleDeleteColumn={deleteColumn}
        handleDeleteConfirmation={getConfirmation}
        handleSetCurrentColumn={setColumnId}
        handleModalToggling={(status, name) => toggleModal(status, name)}
        language={language}
        dark={dark}
      /> : null
    )
  })

  const boardList = boards.map(board => {
    return (
      <button className={`board-btn ${board.active ? "active-btn" : "unactive-btn"}`} onClick={() => toggleActiveBoard(board.id)}>{board.name}</button>
    )
  })



  return (
    <div className="App">
      {modal.active && <span style={modal.target === "editBoardMenu" ? { backgroundColor: "transparent" } : null} className='modal-close' onClick={() => { toggleModal(false, "") }}></span>}
      <header>
        <Nav
          key={nanoid}
          activeBoard={boards.length > 0 ? activeBoard : "No active boards"}
          handleOpenBoardEdit={() => toggleModal(true, "editBoardMenu")}
          handleChangeLanguage={changeLanguage}
          language={language}
          dark={dark}
        />
      </header>

      <main>
        <div className='sidebar-container'>
          <h3>{Languages[language].allBoards} ({boards.length})</h3>
          <div className='menu'>
            <div className='sidebar-boards'>
              {boardList}
              <button onClick={() => toggleModal(true, "board")} className='board-btn create-btn'><span style={{ marginRight: "10px" }}>+</span>{Languages[language].addBoard}</button>
            </div>
          </div>
        </div>

        <div className='boards-container'>
          {boardElements}
          {boards.length > 0 ? <button className='new-col-btn' onClick={() => toggleModal(true, "column")}>+ {Languages[language].addColumn}</button> : "No boards"}
        </div>
      </main>
      {modal.target === "deleteColumn" && <DeleteColumnModal handleDeleteColumn={deleteColumn} language={language} dark={dark}/>}
      {modal.target === "deleteTask" && <DeleteTaskModal handleDeleteTask={deleteTask} language={language} dark={dark}/>}
      {modal.target === "board" && <NewBoardModal handleClick={createNewBoard} language={language} dark={dark}/>}
      {modal.target === "column" && <NewColumnModal handleClick={createNewColumn} language={language} dark={dark}/>}
      {modal.target === "taskUpdate" && <UpdateTask currentTask={currentTask} currentBoard={activeBoard} currentColumn={currentColumn} handleClick={updateTask} handleColumnChange={handleColumnChange} handleGetConfirmation={getConfirmation} language={language} dark={dark}/>}
      {modal.target === "task" && <NewTaskModal handleClick={createNewTask} language={language} dark={dark}/>}
      {modal.target === "editBoardMenu" && <EditBoardMenu handleClick={editBoardMenu} boardLength={boards.length} language={language} dark={dark}/>}
      {modal.target === "editBoard" && <EditBoardModal {...activeBoard} handleClick={editBoard} language={language} dark={dark}/>}
      {modal.target === "deleteBoard" && <DeleteBoardConfirmModal handleDeleteBoard={deleteBoard} language={language} dark={dark}/>}
    </div>
  );
}


export default App;


