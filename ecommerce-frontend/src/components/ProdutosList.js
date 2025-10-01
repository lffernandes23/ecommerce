import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function ProdutosList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/produtos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <h2>Produtos</h2>

      {loading && <p>Carregando produtos...</p>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}

      {!loading && !error && (
        <>
          {produtos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Nome</th>
                  <th style={thStyle}>Preço</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id}>
                    <td style={tdStyle}>{p.id}</td>
                    <td style={tdStyle}>{p.nome}</td>
                    <td style={tdStyle}>R$ {p.preco?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ marginTop: 12 }}>
            <button onClick={fetchProdutos}>Atualizar</button>
          </div>
        </>
      )}
    </div>
  );
}

const thStyle = { textAlign: "left", padding: "8px 6px", borderBottom: "1px solid #ddd" };
const tdStyle = { padding: "8px 6px", borderBottom: "1px solid #eee" };
