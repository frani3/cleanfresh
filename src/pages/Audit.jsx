const styles = {
  container: { padding: "1.5rem" },
  timeline: { marginTop: "1.5rem", borderLeft: "3px solid #0f5132", paddingLeft: "1.25rem" },
  event: { marginBottom: "1.25rem", position: "relative" },
  dot: {
    position: "absolute",
    left: "-1.62rem",
    top: "0.2rem",
    width: "0.7rem",
    height: "0.7rem",
    borderRadius: "50%",
    backgroundColor: "#0f5132",
  },
  meta: { color: "#666", fontSize: "0.85rem" },
  action: { fontWeight: "bold" },
};

// Eventos de auditoría mockeados; en producción vendrían de la API
// (GET /audit/events), registrados por acciones sensibles del sistema.
const AUDIT_EVENTS = [
  {
    id: 1,
    fecha: "2026-09-10 09:12",
    usuario: "admin@cleanfresh.com",
    accion: "Cambio de estado de orden",
    detalle: "ORD-1002 pasó de 'Recibida' a 'En lavado'",
  },
  {
    id: 2,
    fecha: "2026-09-09 17:45",
    usuario: "operador.norte@cleanfresh.com",
    accion: "Creación de orden",
    detalle: "Se creó ORD-1004 para el cliente Luis Rodríguez",
  },
  {
    id: 3,
    fecha: "2026-09-09 14:03",
    usuario: "admin@cleanfresh.com",
    accion: "Edición de catálogo",
    detalle: "Se actualizó el precio del servicio 'Lavado en seco'",
  },
  {
    id: 4,
    fecha: "2026-09-08 11:20",
    usuario: "admin@cleanfresh.com",
    accion: "Asignación de rol",
    detalle: "Se asignó el rol 'Operador' a operador.sur@cleanfresh.com",
  },
  {
    id: 5,
    fecha: "2026-09-08 08:30",
    usuario: "sistema",
    accion: "Inicio de sesión fallido",
    detalle: "3 intentos fallidos para cliente@correo.com",
  },
];

function Audit() {
  return (
    <div style={styles.container}>
      <h1>Auditoría</h1>
      <p>Historial de eventos relevantes del sistema — visible solo para Admin.</p>

      <div style={styles.timeline}>
        {AUDIT_EVENTS.map((event) => (
          <div key={event.id} style={styles.event}>
            <span style={styles.dot} />
            <div style={styles.meta}>
              {event.fecha} · {event.usuario}
            </div>
            <div style={styles.action}>{event.accion}</div>
            <div>{event.detalle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audit;
