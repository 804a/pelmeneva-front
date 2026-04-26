import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {
  const useMocks = process.env.REACT_APP_USE_MOCKS === 'true';
  
  if (!useMocks) {
    console.log('🔌 Используется реальный бэкенд (http://localhost:8081)');
    return;
  }

  try {
    const { worker } = await import('./mocks/browser');
    
    console.log('🎭 Инициализация моков...');
    
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    }).then(() => {
      console.log('✅ Моки успешно запущены');
    });
  } catch (error) {
    console.error('❌ Ошибка при инициализации MSW:', error);
  }
}

enableMocking().then(() => {
  console.log('🚀 Запуск приложения...');
  
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  reportWebVitals();
});