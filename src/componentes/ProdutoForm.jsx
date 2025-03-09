import { useState, useEffect } from "react";
import axios from "axios";
import '../css/produto.css'; // Volta uma pasta e acessa a pasta css



const ProdutoForm = ({ onAddProduct }) => {
  const [produto, setProduto] = useState({ nome: "", preco: "", quantidade: "", codigoDeBarra: ""});
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!produto.nome || !produto.preco || !produto.quantidade || !produto.codigoDeBarra) {
      setMensagem("Todos os campos são obrigatórios!");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/produtos", produto);
      setProdutos([...produtos, response.data]);
      setProduto({ nome: "", preco: "", quantidade: "", codigoDeBarra: ""});
      setMensagem("Produto cadastrado com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setMensagem("Falha ao cadastrar o produto!");
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/produtos/${id}`);
      setProdutos(produtos.filter((p) => p.id !== id));
      setMensagem("Produto removido com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      setMensagem("Falha ao remover o produto!");
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/produtos/${id}`, produto);
      setProdutos(produtos.map((p) => (p.id === id ? response.data : p)));
      setProduto({ nome: "", preco: "", quantidade: "", codigoDeBarra: "" });
      setMensagem("Produto atualizado com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setMensagem("Falha ao atualizar o produto!");
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Cadastro de Produto</h2>
        {mensagem && <div className="message">{mensagem}</div>}
        <input type="text" name="nome" placeholder="Nome do Produto" value={produto.nome} onChange={handleChange} />
        <input type="number" name="preco" placeholder="Preço" value={produto.preco} onChange={handleChange} />
        <input type="number" name="quantidade" placeholder="Quantidade" value={produto.quantidade} onChange={handleChange} />
        <input type="text" name="codigodebarra" placeholder="Codigo de Barra" value={produto.codigoDeBarra} onChange={handleChange} />
        <button type="submit">Adicionar Produto</button>
      </form>    
       
    </div>
  );
};

export default ProdutoForm;
