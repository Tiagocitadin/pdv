import { useState } from "react";
import axios from "axios"; // Importando o axios

const ProdutoForm = ({ onAddProduct }) => {
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
  });

  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Estado para a mensagem de sucesso

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!produto.nome || !produto.preco || !produto.quantidade) {
      setMensagemSucesso("Todos os campos são obrigatórios!");
      setTimeout(() => setMensagemSucesso(""), 3000);
      return;
    }

    console.log(produto); // Verificação do conteúdo do produto antes de enviar

    // Envia o produto para o backend usando axios
    try {
      const response = await axios.post("http://localhost:8080/api/produtos", produto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        const produtoSalvo = response.data;
        onAddProduct(produtoSalvo); // Se necessário, passa o produto salvo para o pai
        setProduto({ nome: "", preco: "", quantidade: "" });
        setMensagemSucesso("Produto cadastrado com sucesso!");
        setTimeout(() => setMensagemSucesso(""), 3000); // Remove a mensagem após 3 segundos
      } else {
        throw new Error("Erro ao cadastrar o produto");
      }
    } catch (error) {
      console.error("Erro:", error); // Exibe mais detalhes sobre o erro
      setMensagemSucesso("Falha ao cadastrar o produto!");
      setTimeout(() => setMensagemSucesso(""), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Cadastro de Produto</h2>

      {/* Mensagem de sucesso ou erro */}
      {mensagemSucesso && (
        <div className={`message ${mensagemSucesso.includes('sucesso') ? 'success' : 'error'}`}>
          {mensagemSucesso}
        </div>
      )}

      <input
        type="text"
        name="nome"
        placeholder="Nome do Produto"
        value={produto.nome}
        onChange={handleChange}
      />
      <input
        type="number"
        name="preco"
        placeholder="Preço"
        value={produto.preco}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantidade"
        placeholder="Quantidade"
        value={produto.quantidade}
        onChange={handleChange}
      />
      <button type="submit">
        Adicionar Produto
      </button>
    </form>
  );
};

export default ProdutoForm;
