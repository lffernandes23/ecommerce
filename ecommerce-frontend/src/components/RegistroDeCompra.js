import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function RegistroDeCompra({ onCompraRegistrada }) {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchClientes();
    fetchProdutos();
  }, []);

  async function fetchClientes() {
    try {
      const res = await fetch(`${API_BASE}/clientes`);
      const data = await res.json();
      setClientes(data);
      if (data.length > 0 && !clienteId) setClienteId(data[0].id);
    } catch (err) {
      console.error("Erro ao buscar clientes", err);
    }
  }

  async function fetchProdutos() {
    try {
      const res = await fetch(`${API_BASE}/produtos`);
      const data = await res.json();
      setProdutos(data);
      if (data.length > 0 && !produtoId) setProdutoId(data[0].id);
    } catch (err) {
      console.error("Erro ao buscar produtos", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Enviando...");
    try {
      const payload = {
        cliente: { id: Number(clienteId) },
        produto: { id: Number(produtoId) },
        quantidade: Number(quantidade)
      };

      const res = await fetch(`${API_BASE}/compras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created = await res.json();
      setStatus("Compra registrada com sucesso!");
      if (typeof onCompraRegistrada === "function") onCompraRegistrada(created);
    } catch (err) {
      console.error(err);
      setStatus("Erro ao registrar: " + (err.message || err));
    } finally {
      setTimeout(() => setStatus(null), 3500);
    }
  }

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 6, marginTop: 12 }}>
      <h3>Registrar Compra</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Cliente
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} style={{ display: "block", width: "100%", padding: 6 }}>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome} ({c.email})</option>)}
          </select>
        </label>

        <label style={{ marginTop: 8 }}>
          Produto
          <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)} style={{ display: "block", width: "100%", padding: 6 }}>
            {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} — R$ {Number(p.preco).toFixed(2)}</option>)}
          </select>
        </label>

        <label style={{ marginTop: 8 }}>
          Quantidade
          <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} style={{ display: "block", width: "100%", padding: 6 }}/>
        </label>

        <div style={{ marginTop: 10 }}>
          <button type="submit">Registrar Compra</button>
        </div>
      </form>

      {status && <div style={{ marginTop: 8 }}>{status}</div>}
    </div>
  );
}
