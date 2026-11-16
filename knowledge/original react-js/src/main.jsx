// NOTA (clase 3): punto de entrada de React. index.html carga este archivo,
// y este archivo monta <App /> dentro del <div id="root">.
// Normalmente no se toca.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // estilos globales de toda la app
import App from './App.jsx'; // export default: se importa SIN llaves

// StrictMode solo actúa en desarrollo: ayuda a detectar errores comunes.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
