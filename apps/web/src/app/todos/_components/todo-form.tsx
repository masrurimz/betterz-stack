import { useCallback, useState } from 'react';

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [todo, setTodo] = useState('');

  const submitTodo = useCallback(() => {
    if (todo.trim()) {
      onSubmit(todo);
      setTodo('');
    }
  }, [onSubmit, todo]);

  return (
    <div className="flex flex-col gap-2">
      <input
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitTodo();
          }
        }}
        placeholder="Enter a new todo..."
        type="text"
        value={todo}
      />
      <button
        className="rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
        disabled={todo.trim().length === 0}
        onClick={submitTodo}
      >
        Add todo
      </button>
    </div>
  );
}