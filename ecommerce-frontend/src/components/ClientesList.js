import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/clientes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <h2>Clientes</h2>

      {loading && <p>Carregando clientes...</p>}
      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          Erro: {error} — verifique se o back-end está rodando em <code>localhost:8080</code>.
        </div>
      )}

      {!loading && !error && (
        <>
          {clientes.length === 0 ? (
            <p>Nenhum cliente encontrado.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome</th>
                  <th style={thStyle}>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td style={tdStyle}>{c.id}</td>
                    <td style={tdStyle}>{c.nome}</td>
                    <td style={tdStyle}>{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ marginTop: 12 }}>
            <button onClick={fetchClientes}>Atualizar</button>
          </div>
        </>
      )}
    </div>
  );
}
const thStyle = { textAlign: "left", padding: "8px 6px", borderBottom: "1px solid #ddd" };
const tdStyle = { padding: "8px 6px", borderBottom: "1px solid #eee" };
