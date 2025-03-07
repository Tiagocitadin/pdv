import React, { useState } from "react";
import ProdutoForm from "./componentes/ProdutoForm"; // Importando o componente ProdutoForm
import './App.css';

const App = () => {
  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Estado para mensagem de sucesso

  // Função chamada quando um novo produto é adicionado
  const handleAddProduct = (produtoAdicionado) => {
    // Aqui você pode fazer algo com o produto, como exibir uma mensagem de sucesso
    setMensagemSucesso("Produto cadastrado com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 3000); // Mensagem desaparece após 3 segundos
  };

  return (
    <div className="app-container">
      <h1>Cadastro de Produtos</h1>

      {/* Componente de Formulário */}
      <ProdutoForm onAddProduct={handleAddProduct} />

      {/* Mensagem de Sucesso */}
      {mensagemSucesso && (
        <div className="feedback-message success">
          {mensagemSucesso}
        </div>
      )}
    </div>
  );
};

export default App;
