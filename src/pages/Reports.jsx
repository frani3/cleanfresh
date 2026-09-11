const styles = {
  container: { padding: "1.5rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    backgroundColor: "#fafafa",
  },
  cardValue: { fontSize: "1.8rem", fontWeight: "bold", margin: "0.25rem 0" },
  cardLabel: { color: "#666", fontSize: "0.9rem" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "1.5rem" },
  th: {
    textAlign: "left",
    borderBottom: "2px solid #ccc",
    padding: "0.5rem",
    backgroundColor: "#f5f5f5",
  },
  td: { borderBottom: "1px solid #eee", padding: "0.5rem" },
};

// KPIs mockeados; en producción vendrían de la API de reportería (GET /reports/kpis).
const KPIS = [
  { label: "Ingresos del mes", value: "$3,250,000" },
  { label: "Órdenes procesadas", value: 312 },
  { label: "Ticket promedio", value: "$18,500" },
  { label: "Tiempo promedio de entrega", value: "6.4 hrs" },
  { label: "Clientes activos", value: 156 },
  { label: "Tasa de reincidencia", value: "68%" },
];

const REVENUE_BY_LOCAL = [
  { local: "Sucursal Centro", ordenes: 98, ingresos: 1120000 },
  { local: "Sucursal Norte", ordenes: 76, ingresos: 890000 },
  { local: "Sucursal Sur", ordenes: 64, ingresos: 720000 },
  { local: "Sucursal Occidente", ordenes: 74, ingresos: 520000 },
];

function Reports() {
  return (
    <div style={styles.container}>
      <h1>Reportería</h1>
      <p>Panel de indicadores clave (KPIs) para toma de decisiones — visible solo para Admin.</p>

      <div style={styles.grid}>
        {KPIS.map((kpi) => (
          <div key={kpi.label} style={styles.card}>
            <div style={styles.cardValue}>{kpi.value}</div>
            <div style={styles.cardLabel}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <h2>Ingresos por sucursal</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Sucursal</th>
            <th style={styles.th}>Órdenes</th>
            <th style={styles.th}>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {REVENUE_BY_LOCAL.map((row) => (
            <tr key={row.local}>
              <td style={styles.td}>{row.local}</td>
              <td style={styles.td}>{row.ordenes}</td>
              <td style={styles.td}>${row.ingresos.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
