import { useEffect, useState } from "react";
import { TodoForm } from './Form';
import axios from 'axios';
import { List } from './List';

// Define the type for a todo item
type TodoItem = {
id: number;
  name: string;
  is_complete: boolean;
  description: string;
};

export const Todo = () => {
 	const [todos, setTodos] = useState<TodoItem[]>([]);

	useEffect(() => {
		axios.get('http://localhost:3000/api/todos')
		  	.then(response => {
			setTodos(response.data);
		})
		.catch(error => console.error('Error fetching todos:', error));
	}, []);

	const addTodo = (todo: string) => {
	axios.post('http://localhost:3000/api/todos', { title: todo })
		.then(response => {
		setTodos([...todos, response.data]);
		})
		.catch(error => console.error('Error adding todo:', error));
	};

	  // Delete a todo
	const deleteTodo = (id: number) => {
		axios.delete(`http://localhost:3000/api/todo/${id}`)
		  .then(() => {
			setTodos(todos.filter(todo => todo.id !== id));
		  })
		  .catch(error => console.error('Error deleting todo:', error));
	};

	const toggleComplete = (id: number) => {
		// Find the current status of the todo item
		const currentTodo = todos.find(todo => todo.id === id) as TodoItem;
		const newStatus = !currentTodo.is_complete;

		axios.put(`http://localhost:3000/api/todo/${id}/status`, { is_completed: newStatus })
			.then(() => {
				setTodos(
					todos.map(todo =>
						todo.id === id ? { ...todo, is_complete: newStatus } : todo
					)
				);
			})
			.catch(error => console.error('Error toggling todo:', error));
	  };

  return (
    <div className="bg-info m-4 p-5 rounded w-100">
      <TodoForm addTodo={addTodo} />
	  <List
			todos={todos}
			deleteTodo={deleteTodo}
			toggleComplete={toggleComplete}
		/>
    </div>
  );
}
