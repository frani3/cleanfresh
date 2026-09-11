import { useMsal } from "@azure/msal-react";

const styles = {
  container: { padding: "1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
  },
  price: { fontSize: "1.3rem", fontWeight: "bold", color: "#0f5132" },
  addBtn: {
    marginTop: "0.75rem",
    padding: "0.4rem 0.8rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0f5132",
    color: "#fff",
    cursor: "pointer",
  },
};

// Catálogo mockeado; luego vendría de la API (GET /services).
const SERVICES = [
  { id: 1, nombre: "Lavado y secado", descripcion: "Ropa de uso diario, ciclo estándar.", precio: 18000 },
  { id: 2, nombre: "Lavado en seco", descripcion: "Prendas delicadas y trajes.", precio: 25000 },
  { id: 3, nombre: "Planchado", descripcion: "Planchado por kilo de ropa.", precio: 9500 },
  { id: 4, nombre: "Lavado de edredones", descripcion: "Edredones y cobijas de gran tamaño.", precio: 32000 },
  { id: 5, nombre: "Servicio exprés", descripcion: "Entrega en menos de 4 horas.", precio: 12000 },
];

function Catalog() {
  const { accounts } = useMsal();
  const roles = accounts[0]?.idTokenClaims?.roles || [];
  const isCliente = roles.includes("Cliente");
  const canManage = roles.includes("Admin");

  return (
    <div style={styles.container}>
      <h1>Catálogo de Servicios</h1>
      {canManage && <p>Como Admin puedes agregar, editar o desactivar servicios (próximamente).</p>}

      <div style={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.id} style={styles.card}>
            <h3>{service.nombre}</h3>
            <p>{service.descripcion}</p>
            <div style={styles.price}>${service.precio.toLocaleString()}</div>
            {isCliente && <button style={styles.addBtn}>Solicitar servicio</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
