import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import classes from './App.scss'

const mockTodos = [
  {
    id: 1,
    todo: 'Learn React hooks',
    done: false,
    createdAt: '2021-08-22T13:50:29.971Z',
  },
  {
    id: 2,
    todo: 'Learn webpack',
    done: true,
    createdAt: '2021-08-22T13:50:29.971Z',
  },
  {
    id: 3,
    todo: 'Feed the cats',
    done: false,
    createdAt: '2021-08-22T13:50:29.971Z',
  },
  {
    id: 4,
    todo: 'Pack things',
    done: false,
    createdAt: '2021-08-22T13:50:29.971Z',
  },
  {
    id: 5,
    todo: 'Shop for furnitures',
    done: true,
    createdAt: '2021-08-22T13:50:29.971Z',
  },
]

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(mockTodos)
  const [isAllDone, setIsAllDone] = useState(false)

  const handleInputTodoOnChange = (e) => setTodo(e.currentTarget.value)

  const handleAddTodoOnClick = () => {
    if (todo) {
      setTodo('')
      return setTodos([
        {
          id: Math.ceil(Math.random() * 100),
          todo,
          done: false,
          createdAt: new Date(),
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
          createdAt: new Date(),
        },
        ...todos,
      ])
    }

    return false
  }

  const handleDeleteAll = () => setTodos([])

  const handleTickOnChange = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: true,
          }
        }

        return item
      })
    )
  }

  const handleDeleteTodoItem = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  useEffect(() => {
    // const isDone = (value) => value === true
    const areAllTodosDone = todos.every((item) => item.done === true)

    if (areAllTodosDone) {
      setIsAllDone(true)
    }

    console.log(areAllTodosDone, todos.length)
  })

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
      {todos.length > 0 && isAllDone && (
        <div className={classes.cheer}>
          Congratulations! You have nothing to do today. Go ahead and watch your favorite Netflix
          series or go play your favorite mobile game!
        </div>
      )}
      <div>
        <div className={classes.todoItemsContainer}>
          {todos.length === 0 && <p className={classes.noData}>No data found.</p>}
          {todos.map((item) => (
            <div key={item.id} className={classes.todoItem}>
              <input
                onChange={() => handleTickOnChange(item.id)}
                className={classes.tick}
                checked={item.done}
                type="checkbox"
                readOnly
              />
              <p className={clsx(item.done && classes.done)}>
                <span>{item.todo}</span>
                <small>{moment(item.createdAt).format('DD-MMM-YYYY HH:MM')}</small>
              </p>

              <button
                className={classes.deleteSingleButton}
                onClick={() => handleDeleteTodoItem(item.id)}
                type="submit"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className={classes.todoContainerActions}>
          <button disabled={!todos.length} onClick={handleDeleteAll} type="submit">
            delete all
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
