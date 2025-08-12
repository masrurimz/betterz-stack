import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orpc } from '@/lib/orpc/client';

export function TodoForm() {
  const [todo, setTodo] = useState('');
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        setTodo('');
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  const submitTodo = useCallback(() => {
    if (todo.trim()) {
      createTodo({ text: todo });
    }
  }, [createTodo, todo]);

  return (
    <div className="flex gap-2">
      <Input
        className="flex-1 border-white/20 bg-white/10 text-white placeholder-white/60 backdrop-blur-sm focus:border-blue-400"
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
      <Button
        className="bg-blue-500 text-white hover:bg-blue-600"
        disabled={todo.trim().length === 0}
        onClick={submitTodo}
      >
        <Plus className="mr-1 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
