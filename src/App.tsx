import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { GlobalStyle } from './styles/GlobalStyle';
import { ModuleStyles } from './styles/ModuleStyles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
    },
  },
});

const antdTheme = {
  token: {
    colorPrimary: '#22c55e',
    borderRadius: 8,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ModuleStyles />
      <BrowserRouter>
        <ConfigProvider theme={antdTheme}>
          <LanguageProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </LanguageProvider>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
