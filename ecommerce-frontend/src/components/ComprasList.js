import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function ComprasList({ refreshKey }) {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompras();
  }, [refreshKey]);

  async function fetchCompras() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/compras`);
      const data = await res.json();
      setCompras(data);
    } catch (err) {
      console.error("Erro ao carregar compras", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, marginTop: 12 }}>
      <h3>Compras</h3>
      {loading ? <p>Carregando...</p> : (
        <>
          {compras.length === 0 ? <p>Nenhuma compra registrada.</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>ID</th><th style={th}>Cliente</th><th style={th}>Produto</th><th style={th}>Qtd</th><th style={th}>Data</th></tr></thead>
              <tbody>
                {compras.map(c => (
                  <tr key={c.id}>
                    <td style={td}>{c.id}</td>
                    <td style={td}>{c.cliente?.nome}</td>
                    <td style={td}>{c.produto?.nome}</td>
                    <td style={td}>{c.quantidade}</td>
                    <td style={td}>{c.dataCompra ? new Date(c.dataCompra).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

const th = { textAlign: "left", padding: 6, borderBottom: "1px solid #ddd" };
const td = { padding: 6, borderBottom: "1px solid #eee" };
