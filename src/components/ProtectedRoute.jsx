import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

/**
 * Protege una ruta exigiendo sesión iniciada y, opcionalmente, uno de los
 * roles indicados en `allowedRoles`. Los roles del usuario se leen del claim
 * `roles` del ID Token (accounts[0]?.idTokenClaims?.roles), configurado en
 * Azure AD como App Roles asignados al usuario.
 */
function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = accounts[0]?.idTokenClaims?.roles || [];
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
