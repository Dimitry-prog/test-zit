import TodoList from "./features/todos/components/todo-list.tsx";
import TodoCreate from "./features/todos/components/todo-create.tsx";

function App() {
  return (
    <main className='p-10 max-w-xl w-full mx-auto flex flex-col gap-10'>
      <h2 className='font-bold text-3xl text-center'>Create Todo</h2>
      <TodoCreate/>
      <TodoList/>
    </main>
  )
}

export default App
