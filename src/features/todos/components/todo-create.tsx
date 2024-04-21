import { ChangeEvent, FormEvent, useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/use-todos.ts";
import { v4 as uuidv4 } from 'uuid';

type TodoCreateProps = {
  parentId?: string | null
  onCloseChildren?: () => void
}

const TodoCreate = ({ parentId = null, onCloseChildren }: TodoCreateProps) => {
  const [value, setValue] = useState({
    title: '',
    description: ''
  });
  const { createTodo } = useTodos()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo: TodoType = {
      id: uuidv4(),
      parentId: parentId ? parentId : null,
      title: value.title,
      description: value.description,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deadline: new Date(),
      remindDate: new Date(),
    }
    createTodo(todo)
    setValue({
      title: '',
      description: ''
    })
    if (onCloseChildren) {
      onCloseChildren()
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-2 flex flex-col gap-4 items-center'>
      <input value={value.title} onChange={handleChange} name='title' type="text" placeholder='Title'/>
      <input value={value.description} onChange={handleChange} name='description' type="text"
             placeholder='Description'/>
      <button type='submit'>➕</button>
    </form>
  );
};

export default TodoCreate;