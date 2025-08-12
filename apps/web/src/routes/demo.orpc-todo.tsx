import { createFileRoute } from '@tanstack/react-router';

import { orpc } from '@/orpc/client';
import { TodoList } from '@/app/todos/_components/todo-list';
import { TodoForm } from '@/app/todos/_components/todo-form';

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
        <TodoList />
        <TodoForm />
      </div>
    </div>
  );
}
