import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DEFAULT_STALE_TIME } from '@/constants'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      retry: 0
    }
  }
})

interface QueryContextProps {
  children: React.ReactNode
}
export default function QueryContext({ children }: QueryContextProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
