import { render, screen } from "@testing-library/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App";
import { msalConfig } from "./authConfig";

test("muestra la pantalla de inicio de sesión cuando no hay sesión activa", async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  await msalInstance.initialize();

  render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );

  const loginButton = await screen.findByText(/iniciar sesión con microsoft/i);
  expect(loginButton).toBeInTheDocument();
});
