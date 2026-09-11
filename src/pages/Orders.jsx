import { useState } from "react";
import { useMsal } from "@azure/msal-react";

const styles = {
  container: { padding: "1.5rem" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "1rem" },
  th: {
    textAlign: "left",
    borderBottom: "2px solid #ccc",
    padding: "0.5rem",
    backgroundColor: "#f5f5f5",
  },
  td: { borderBottom: "1px solid #eee", padding: "0.5rem" },
  select: { padding: "0.3rem" },
};

const STATUS_OPTIONS = ["Recibida", "En lavado", "Lista", "Entregada"];

const STATUS_COLORS = {
  Recibida: "#6c757d",
  "En lavado": "#0d6efd",
  Lista: "#fd7e14",
  Entregada: "#198754",
};

// Órdenes mockeadas; luego vendrán de la API (GET /orders).
const MOCK_ORDERS = [
  { id: "ORD-1001", cliente: "María Gómez", servicio: "Lavado y secado", fecha: "2026-09-08", estado: "Lista", total: 18000 },
  { id: "ORD-1002", cliente: "Carlos Pérez", servicio: "Planchado", fecha: "2026-09-08", estado: "En lavado", total: 9500 },
  { id: "ORD-1003", cliente: "Ana Torres", servicio: "Lavado en seco", fecha: "2026-09-09", estado: "Recibida", total: 25000 },
  { id: "ORD-1004", cliente: "Luis Rodríguez", servicio: "Lavado y secado", fecha: "2026-09-09", estado: "Entregada", total: 18000 },
];

function Orders() {
  const { accounts } = useMsal();
  const roles = accounts[0]?.idTokenClaims?.roles || [];
  const canEditStatus = roles.includes("Admin") || roles.includes("Operador");

  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, estado: newStatus } : order))
    );
  };

  return (
    <div style={styles.container}>
      <h1>Gestión de Órdenes</h1>
      <p>{orders.length} órdenes en el sistema.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>N° Orden</th>
            <th style={styles.th}>Cliente</th>
            <th style={styles.th}>Servicio</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.cliente}</td>
              <td style={styles.td}>{order.servicio}</td>
              <td style={styles.td}>{order.fecha}</td>
              <td style={styles.td}>
                {canEditStatus ? (
                  <select
                    style={styles.select}
                    value={order.estado}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span style={{ color: STATUS_COLORS[order.estado], fontWeight: "bold" }}>
                    {order.estado}
                  </span>
                )}
              </td>
              <td style={styles.td}>${order.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
