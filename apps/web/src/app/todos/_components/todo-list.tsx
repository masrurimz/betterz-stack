import type { Todo } from '@/app/todos/_domain/todo-entity';

interface TodoListProps {
  todos?: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="mb-4 space-y-2">
      {todos?.map((todo) => (
        <li
          className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
          key={todo.id}
        >
          <span className="text-lg text-white">{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}