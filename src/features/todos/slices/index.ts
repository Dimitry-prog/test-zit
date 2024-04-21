import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from "../types";
import { v4 as uuidv4 } from 'uuid';

type TodoStateType = {
  todos: TodoType[]
  todo: TodoType | null
}

const storedTodos = localStorage.getItem('todos');
const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [
  {
    "id": uuidv4(),
    "parentId": null,
    "title": "You can create sub todo for this",
    "description": "Click plus button",
    "isCompleted": false,
    "createdAt": "2024-04-21T14:26:13.742Z",
    "updatedAt": "2024-04-21T14:26:13.742Z",
    "deadline": "2024-04-21T14:26:13.742Z",
    "remindDate": "2024-04-21T14:26:13.742Z"
  },
];

const initialState: TodoStateType = {
  todos: parsedTodos,
  todo: null,
}

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    setTodos: (state, { payload }) => {
      state.todos.push(payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    deleteTodos: (state, { payload }) => {
      console.log({ payload })
      state.todos = state.todos.filter(item => !payload.includes(item.id));
      localStorage.setItem('todos', JSON.stringify(state.todos))
    }
  },
  selectors: {
    getTodos: state => state.todos
  }
})

export const { actions: todoActions, selectors: todoSelectors } = todoSlice