import { TodoType } from "../types";
import { ChangeEvent, Dispatch, memo, SetStateAction, useState } from "react";
import TodoCreate from "./todo-create.tsx";
import { useTodos } from "../hooks/use-todos.ts";

type TodoItemProps = {
  todo: TodoType
  selectedIds: string[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  setSelectedIds: Dispatch<SetStateAction<string[]>>
}

const TodoItem = memo(({ todo, selectedIds, onChange, setSelectedIds }: TodoItemProps) => {
  const [isAddChildren, setIsAddChildren] = useState(false)
  const { deleteTodos, todos } = useTodos()
  const todoChildren = todos.filter(todoChildren => todoChildren.parentId === todo.id)

  return (
    <div className='flex flex-col gap-2'>
      <li className='rounded-md shadow-sm p-4 flex items-center gap-2 border'>
        <div className='flex flex-col gap-2'>
          <input value={todo.id} checked={selectedIds.includes(todo.id)} onChange={onChange}
                 type="checkbox" className='self-start mt-1'/>
          {selectedIds.length > 0 &&
              <button onClick={() => {
                deleteTodos(todo.id)
                setSelectedIds([])
              }} type='button' className='self-start'>🗑️️
              </button>}
        </div>

        <div className='flex flex-col gap-2'>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <button onClick={() => deleteTodos(todo.id)} type='button' className='self-start'>🗑️️
          </button>
          <button onClick={() => setIsAddChildren(!isAddChildren)} type='button'>{isAddChildren ? '✖️' : '➕'}</button>
          {isAddChildren &&
              <TodoCreate parentId={todo.id} onCloseChildren={() => setIsAddChildren(false)}/>}
        </div>
      </li>
      {todoChildren.length > 0 && (
        <ul className="ml-8 flex flex-col gap-2">
          {todoChildren.map(child => (
            <TodoItem key={child.id} todo={child} selectedIds={selectedIds} onChange={onChange}
                      setSelectedIds={setSelectedIds}/>
          ))}
        </ul>
      )}
    </div>
  );
});

export default TodoItem;