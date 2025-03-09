import React, { useState } from "react";
import './App.css';
import Home from "./componentes/home";

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [produtoEditado, setProdutoEditado] = useState(null);

  // Função para adicionar produto
  const handleAddProduct = (produtoAdicionado) => {
    setProdutos([...produtos, { ...produtoAdicionado, id: Date.now() }]);
    setMensagemSucesso("Produto cadastrado com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 3000);
  };

  // Função para editar produto
  const handleEditProduct = (produtoAlterado) => {
    const produtosAtualizados = produtos.map((produto) =>
      produto.id === produtoAlterado.id ? produtoAlterado : produto
    );
    setProdutos(produtosAtualizados);
    setMensagemSucesso("Produto alterado com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 3000);
  };

  // Função para excluir produto
  const handleDeleteProduct = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
    setMensagemSucesso("Produto excluído com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 3000);
  };

  return (
    <div className="app-container">
      {/* Exibindo a Home como página principal */}
      <Home
        produtos={produtos}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct} // Passando a função de adicionar produto
      />
      
      {/* Exibindo mensagem de sucesso */}
      {mensagemSucesso && <div className="success-message">{mensagemSucesso}</div>}
    </div>
  );
};

export default App;
