import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orpc } from '@/orpc/client';

export function useTodos() {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery(
    orpc.todo.getAll.queryOptions({
      input: {},
    })
  );

  const createTodoMutation = useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  const toggleTodoMutation = useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  const deleteTodoMutation = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.todo.getAll.key(),
        });
      },
    })
  );

  return {
    todos,
    isLoading,
    error,
    createTodo: createTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    isCreating: createTodoMutation.isPending,
    isToggling: toggleTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
}