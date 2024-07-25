import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Todo {
  id: number;
  title: string;
  is_complete: boolean;
}

interface ListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

export const List: React.FC<ListProps> = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <ul className="list-group">
      {todos.map(todo => (
        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`${todo.is_complete ? "completed" : "incompleted"}`} onClick={() => 			toggleComplete(todo.id)}>{todo.title}</span>

          <div>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteTodo(todo.id)}
              className="text-danger"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
