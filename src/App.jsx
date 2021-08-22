import React, { useState } from 'react'

import classes from './App.scss'

const App = () => {
  const [todo, setTodo] = useState(null)
  const [todos, setMockTodos] = useState([
    {
      id: 1,
      todo: 'Learn React hooks',
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 2,
      todo: 'Learn webpack',
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 3,
      todo: 'Feed the cats',
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 4,
      todo: 'Pack things',
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 5,
      todo: 'Shop for furnitures',
      created_at: '2021-08-22T13:50:29.971Z',
    },
  ])

  const handleInputTodoOnChange = () => {}

  const handleAddTodoOnClick = () => {}

  return (
    <div className={classes.container}>
      <h1 className={classes.appTitle}>TODO APP</h1>
      <div className={classes.todoInput}>
        <input onChange={handleInputTodoOnChange} placeholder="What do you want to do today?" />
        <button onClick={handleAddTodoOnClick} type="submit">
          add
        </button>
      </div>
      <div>
        <div className={classes.todoItemsContainer}>
          {todos.length === 0 && <p>No data found.</p>}
          {todos.map((item) => (
            <div key={item.id} className={classes.todoItem}>
              <input className={classes.tick} checked type="checkbox" readOnly />
              <p>{item.todo}</p>
              <button type="submit">x</button>
            </div>
          ))}
        </div>
        <div className={classes.todoContainerActions}>
          <button type="submit">delete all</button>
        </div>
      </div>
    </div>
  )
}

export default App
