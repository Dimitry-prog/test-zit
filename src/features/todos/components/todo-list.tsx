import TodoItem from "./todo-item.tsx";
import { useTodos } from "../hooks/use-todos.ts";

const TodoList = () => {
  const { parentTodos, selectedIds, toggleChecked, setSelectedIds } = useTodos();

  return (
    <ul className='grid grid-cols-2 gap-4'>
      {parentTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} selectedIds={selectedIds} onChange={toggleChecked}
                    setSelectedIds={setSelectedIds}/>
        )
      )}
    </ul>
  )
    ;
};

export default TodoList;