import { useState } from 'react';

// Define the type for the props
interface TodoFormProps {
  addTodo: (todo: string) => void;
}

export const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 mb-5 p-0 d-flex flex-row">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control border-1 p-1 px-5"
        placeholder="What is the task today?"
      />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}
