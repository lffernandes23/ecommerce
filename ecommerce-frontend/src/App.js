import React, { useState } from "react";
import ClientesList from "./components/ClientesList";
import ProdutosList from "./components/ProdutosList";
import RegistrarCompra from "./components/RegistroDeCompra";
import ComprasList from "./components/ComprasList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function onCompraRegistrada() {
    setRefreshKey(k => k + 1);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1>E-commerce</h1>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 380px", minWidth: 300 }}>
          <ClientesList />
          <ProdutosList />
        </div>

        <div style={{ flex: "1 1 380px", minWidth: 300 }}>
          <RegistrarCompra onCompraRegistrada={onCompraRegistrada} />
          <ComprasList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
