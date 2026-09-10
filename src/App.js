import React from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Clean&Fresh Manager</h1>
      {isAuthenticated ? (
        <div>
          <p>Bienvenido, {accounts[0]?.name}</p>
          <p>Email: {accounts[0]?.username}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <p>Por favor inicia sesión para continuar</p>
          <button onClick={handleLogin}>Iniciar sesión con Microsoft</button>
        </div>
      )}
    </div>
  );
}

export default App;