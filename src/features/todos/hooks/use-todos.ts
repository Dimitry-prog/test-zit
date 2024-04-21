import { useAppDispatch, useAppSelector } from "../../../shared/libs/store.ts";
import { todoActions, todoSelectors } from "../slices";
import { TodoType } from "../types";
import { ChangeEvent, useState } from "react";

export const useTodos = () => {
  const todos = useAppSelector(todoSelectors.getTodos);
  const dispatch = useAppDispatch();
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const parentTodos = todos.filter(todo => todo.parentId === null)

  const getTodoChildrenById = (id: string) => todos.filter(todoChildren => todoChildren.parentId === id);

  const handleCreateTodo = (todo: TodoType) => {
    dispatch(todoActions.setTodos(todo))
  }

  const handleDelete = (id: string) => {
    const deleteChildren = (parentId: string) => {
      const childrenToDelete = todos.filter(item => item.parentId === parentId);
      childrenToDelete.forEach(child => {
        deleteChildren(child.id);
        dispatch(todoActions.deleteTodos([child.id]));
      });
    };

    deleteChildren(id);
    dispatch(todoActions.deleteTodos([id]));
  };

  const handleSelectAllChildren = (parentId: string) => {
    const selectedChildrenIds: string[] = [];

    const selectChildren = (parentId: string) => {
      const childrenToSelect = todos.filter(item => item.parentId === parentId);
      childrenToSelect.forEach(child => {
        selectedChildrenIds.push(child.id);
        selectChildren(child.id);
      });
    };

    selectChildren(parentId);
    return selectedChildrenIds;
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parentId = e.target.value;
    const selectedChildrenIds = handleSelectAllChildren(parentId);

    if (e.target.checked) {
      setSelectedIds(prev => ([...prev, ...selectedChildrenIds, parentId]));
    } else {
      setSelectedIds(selectedIds.filter(id => !selectedChildrenIds.includes(id) && id !== parentId));
    }
  };


  return {
    todos,
    parentTodos,
    selectedIds,
    setSelectedIds,
    getTodoChildrenById,
    toggleChecked: handleCheckboxChange,
    createTodo: handleCreateTodo,
    deleteTodos: handleDelete
  }
}