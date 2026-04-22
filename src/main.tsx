import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from "sonner";
import { setSession } from "./hooks/api/config.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from './components/ScrollToTop.tsx';

const token = localStorage.getItem("token");

if (token) {
  setSession(token);
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster richColors />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
