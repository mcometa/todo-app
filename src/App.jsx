import React, { useState } from 'react'
import clsx from 'clsx'

import classes from './App.scss'

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: 'Learn React hooks',
      done: false,
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 2,
      todo: 'Learn webpack',
      done: true,
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 3,
      todo: 'Feed the cats',
      done: false,
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 4,
      todo: 'Pack things',
      done: false,
      created_at: '2021-08-22T13:50:29.971Z',
    },
    {
      id: 5,
      todo: 'Shop for furnitures',
      done: true,
      created_at: '2021-08-22T13:50:29.971Z',
    },
  ])

  const handleInputTodoOnChange = (e) => setTodo(e.currentTarget.value)

  const handleAddTodoOnClick = () => {
    if (todo) {
      setTodo('')
      return setTodos([
        {
          id: Math.random() * 100,
          todo,
          done: false,
          created_at: new Date(),
        },
        ...todos,
      ])
    }

    return false
  }

  const handleInputTodoKeydown = (e) => {
    if (e.key === 'Enter' && todo) {
      setTodo('')
      return setTodos([
        {
          id: Math.random() * 100,
          todo,
          done: false,
          created_at: new Date(),
        },
        ...todos,
      ])
    }

    return false
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.appTitle}>TODO APP</h1>
      <div className={classes.todoInput}>
        <input
          value={todo}
          onChange={handleInputTodoOnChange}
          placeholder="What do you want to do today?"
          onKeyDown={handleInputTodoKeydown}
        />
        <button disabled={!todo} onClick={handleAddTodoOnClick} type="submit">
          add
        </button>
      </div>
      <div>
        <div className={classes.todoItemsContainer}>
          {todos.length === 0 && <p>No data found.</p>}
          {todos.map((item) => (
            <div key={item.id} className={classes.todoItem}>
              <input className={classes.tick} checked={item.done} type="checkbox" readOnly />
              <p className={clsx(item.done && classes.done)}>{item.todo}</p>
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
