import { setupI18n } from '@lingui/core';
import { StartClient } from '@tanstack/react-start';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from './router';

// The lang should be set by the server and router plugin handles hydration
const i18n = setupI18n({});

const router = createRouter({ i18n });

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient router={router} />
    </StrictMode>
  );
});
