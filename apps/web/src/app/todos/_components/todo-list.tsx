import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Trash2 } from 'lucide-react';
import type { Todo } from '@/app/todos/_domain/todo-entity';
import { Button } from '@/components/ui/button';
import { orpc } from '@/lib/orpc/client';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();

  const { mutate: toggleTodo, isPending: isToggling } = useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  const handleToggle = () => {
    toggleTodo({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteTodo({ id: todo.id });
  };

  return (
    <li className="group rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          className={`h-6 w-6 rounded border border-white/40 p-0 hover:bg-white/20 ${
            todo.completed
              ? 'border-green-400/60 bg-green-500/20'
              : 'bg-white/10'
          }`}
          disabled={isToggling}
          onClick={handleToggle}
          size="sm"
          variant="ghost"
        >
          {todo.completed && <Check className="h-3 w-3 text-green-300" />}
        </Button>

        <span
          className={`flex-1 text-lg text-white ${
            todo.completed ? 'line-through opacity-60' : ''
          }`}
        >
          {todo.text}
        </span>

        <Button
          className="h-8 w-8 bg-red-500/20 p-0 text-red-300 opacity-0 transition-all hover:bg-red-500/40 hover:text-red-200 group-hover:opacity-100"
          disabled={isDeleting}
          onClick={handleDelete}
          size="sm"
          variant="ghost"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {(isToggling || isDeleting) && (
        <div className="mt-2 text-white/60 text-xs">
          {isToggling ? 'Updating...' : 'Deleting...'}
        </div>
      )}
    </li>
  );
}

export function TodoList() {
  const { data: todos, isLoading } = useQuery(
    orpc.todo.getAll.queryOptions({
      input: {},
    })
  );

  if (isLoading) {
    return (
      <div className="mb-4 text-center text-white/60">Loading todos...</div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="mb-4 text-center text-white/60">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="mb-4 space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
