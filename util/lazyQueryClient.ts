import { QueryClient } from '@tanstack/react-query';

const lazyQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      retry: false,
    },
  },
});

export { lazyQueryClient };
