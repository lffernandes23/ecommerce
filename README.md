# E-commerce

## 📌 Visão Geral
Este projeto é um **sistema simples de e-commerce** desenvolvido para o desafio técnico de desenvolvedor júnior.  
Ele permite registrar clientes, produtos e compras, com backend em **Java + Spring Boot** e frontend em **React**.

---

## 🛠 Tecnologias
**Backend:**
- Java 21
- Spring Boot 4
- Spring Data JPA
- H2 Database (modo arquivo)
- Maven

**Frontend:**
- React 18
- HTML5, CSS3
- Axios (para consumir API)

**Ferramentas:**
- Eclipse IDE 2025-12
- Node.js 20+ (para React)

---

## 📂 Estrutura do Projeto

```
ecommerce/
├── backend/ (Spring Boot)
│ ├── src/main/java/com/example/ecommerce
│ │ ├── controller/ (ClientesController, ProdutosController, ComprasController)
│ │ ├── model/ (Cliente, Produto, Compra)
│ │ └── repository/ (ClienteRepository, ProdutoRepository, CompraRepository)
│ └── src/main/resources
│ └── application.properties
├── frontend/ (React)
│ ├── src/
│ │ ├── components/ (ListarClientes, ListarProdutos, RegistrarCompra)
│ │ └── App.js
│ └── package.json
└── README.md
```


---

## 🚀 Como Executar

### Backend (Spring Boot)
1. Abra o Eclipse e importe o projeto como **Maven**.
2. Execute a classe principal `EcommerceApplication.java`.
3. O servidor sobe em `http://localhost:8080`.
4. Banco H2 será criado automaticamente em `./data/ecommerce-db`.

### Frontend (React)
1. Abra o terminal na pasta `frontend/`.
2. Instale dependências:
   ```bash
   npm install
3. Rode o projeto:
   ```bash
   npm start

4. O frontend estará disponível em http://localhost:3000.

---

📌 Endpoints da API

- **Clientes**


-**GET /clientes** – Listar todos os clientes

-**POST /clientes** – Criar um novo cliente

-**GET /clientes/{id}** – Buscar cliente por ID

-**PUT /clientes/{id}** – Atualizar cliente

-**DELETE /clientes/{id}** – Remover cliente

---
- **Produtos**

-****GET /produtos**** – Listar todos os produtos

-**POST /produtos** – Criar produto

-**GET /produtos/{id}** – Buscar produto por ID

-**PUT /produtos/{id}** – Atualizar produto

-**DELETE /produtos/{id}** – Remover produto

---
- **Compras**

-**GET /compras** – Listar todas as compras

-**POST /compras** – Registrar uma nova compra
