import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout
      className="justify-center py-32 text-center"
      nav={{
        title: 'Tanstack Start',
      }}
    >
      <h1 className="mb-4 font-medium text-xl">Fumadocs on Tanstack Start.</h1>
      <Link
        className="mx-auto rounded-lg bg-fd-primary px-3 py-2 font-medium text-fd-primary-foreground text-sm"
        params={{
          _splat: '',
        }}
        to="/docs/$"
      >
        Open Docs
      </Link>
    </HomeLayout>
  );
}
