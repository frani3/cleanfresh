import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0f5132",
    color: "#fff",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginRight: "2rem",
  },
  links: {
    display: "flex",
    gap: "1.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    flex: 1,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    opacity: 0.85,
  },
  linkActive: {
    color: "#fff",
    textDecoration: "none",
    opacity: 1,
    fontWeight: "bold",
    borderBottom: "2px solid #fff",
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "0.9rem",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    color: "#0f5132",
    border: "none",
    borderRadius: "4px",
    padding: "0.4rem 0.9rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

// Links disponibles por rol. "Cliente" y "Operador" comparten Órdenes;
// Catálogo es visible para todos los roles autenticados; Reportería y
// Auditoría son exclusivos de Admin.
const LINKS_BY_ROLE = {
  Admin: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/orders", label: "Órdenes" },
    { to: "/catalog", label: "Catálogo" },
    { to: "/reports", label: "Reportería" },
    { to: "/audit", label: "Auditoría" },
  ],
  Operador: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/orders", label: "Órdenes" },
    { to: "/catalog", label: "Catálogo" },
  ],
  Cliente: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/orders", label: "Mis órdenes" },
    { to: "/catalog", label: "Catálogo" },
  ],
};

function Navbar() {
  const { instance, accounts } = useMsal();
  const location = useLocation();

  const account = accounts[0];
  const roles = account?.idTokenClaims?.roles || [];

  // Un usuario podría tener varios roles asignados; unimos los links
  // correspondientes sin duplicar rutas.
  const visibleLinks = Object.entries(LINKS_BY_ROLE)
    .filter(([role]) => roles.includes(role))
    .flatMap(([, links]) => links)
    .filter(
      (link, index, all) => all.findIndex((l) => l.to === link.to) === index
    );

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Clean&amp;Fresh Manager</span>
      <ul style={styles.links}>
        {visibleLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={
                location.pathname === link.to ? styles.linkActive : styles.link
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={styles.userBox}>
        <span>
          {account?.name || account?.username}
          {roles.length > 0 ? ` · ${roles.join(", ")}` : ""}
        </span>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
