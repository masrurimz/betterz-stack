import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

import { orpc } from '@/orpc/client';

export const Route = createFileRoute('/demo/orpc-todo')({
  component: ORPCTodos,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      orpc.todo.getAll.queryOptions({
        input: {},
      })
    );
  },
});

function ORPCTodos() {
  const { data, refetch } = useQuery(
    orpc.todo.getAll.queryOptions({
      input: {},
    })
  );

  const [todo, setTodo] = useState('');
  const { mutate: addTodo } = useMutation({
    mutationFn: orpc.todo.create.call,
    onSuccess: () => {
      refetch();
      setTodo('');
    },
  });

  const submitTodo = useCallback(() => {
    addTodo({ text: todo });
  }, [addTodo, todo]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
      style={{
        backgroundImage:
          'radial-gradient(50% 50% at 50% 50%, #D2149D 0%, #8E1066 50%, #2D0A1F 100%)',
      }}
    >
      <div className="w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-4 text-2xl">oRPC Todos list</h1>
        <ul className="mb-4 space-y-2">
          {data?.map((t) => (
            <li
              className="rounded-lg border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-sm"
              key={t.id}
            >
              <span className="text-lg text-white">{t.text}</span>
            </li>
          ))}
        </ul>
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
      </div>
    </div>
  );
}
