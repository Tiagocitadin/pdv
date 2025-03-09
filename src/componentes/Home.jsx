import { useState, useEffect } from "react";
import axios from "axios";
import '../css/home.css';


const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [total, setTotal] = useState(0);

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

  const handlePesquisa = (e) => {
    setPesquisa(e.target.value);
  };

  const adicionarCarrinho = (produto) => {
    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find((item) => item.id === produto.id);
    if (!produtoExistente) {
      setCarrinho([...carrinho, produto]);
      calcularTotal();
    } else {
      alert("Este produto já está no carrinho.");
    }
  };

  const calcularTotal = () => {
    const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    setTotal(novoTotal);
  };

  const removerCarrinho = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
    calcularTotal();
  };

  const realizarPagamento = () => {
    alert(`Pagamento realizado com sucesso! Total: R$${total.toFixed(2)}`);
    setCarrinho([]);
    setTotal(0);
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="home">
      <header className="header">
        <div className="logo">PDV Mercado</div>
        <div className="data-hora">
          {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
        </div>
      </header>

      <div className="container">
        <div className="sidebar">
          <h3>Pesquisar Produto</h3>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={pesquisa}
            onChange={handlePesquisa}
          />
        </div>

        <div className="produtos">
          <h3>Produtos Disponíveis</h3>
          <div className="produtos-lista">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <div key={produto.id} className="produto-item">
                  <img src={produto.imagem || "/default-image.jpg"} alt={produto.nome} />
                  <div className="produto-info">
                    <h4>{produto.nome}</h4>
                    <p>R$ {produto.preco.toFixed(2)}</p>
                    <button onClick={() => adicionarCarrinho(produto)}>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>

        <div className="carrinho">
          <h3>Carrinho de Compras</h3>
          <div className="carrinho-lista">
            {carrinho.length > 0 ? (
              carrinho.map((item) => (
                <div key={item.id} className="carrinho-item">
                  <p>{item.nome} - R$ {item.preco.toFixed(2)}</p>
                  <button onClick={() => removerCarrinho(item.id)}>Remover</button>
                </div>
              ))
            ) : (
              <p>Seu carrinho está vazio.</p>
            )}
          </div>
          <div className="total">
            <h4>Total: R$ {total.toFixed(2)}</h4>
            <button onClick={realizarPagamento} disabled={carrinho.length === 0}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
