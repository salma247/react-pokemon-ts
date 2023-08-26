import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24, 
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const Provider = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;