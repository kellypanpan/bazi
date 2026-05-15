import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import { I18nProvider } from './i18n.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </HelmetProvider>
  </StrictMode>
);
