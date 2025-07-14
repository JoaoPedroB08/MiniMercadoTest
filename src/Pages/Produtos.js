import React, { useState, useEffect } from 'react';
import ProdutoCard from '../Components/ProdutoCard';
import BannerPromocao from '../Components/BannerPromocao';
import apiClient from '../api'; // Importa nosso cliente de API configurado

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os dados dos produtos do backend quando o componente carregar
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/produtos');
        setProdutos(data); // Armazena a lista de produtos no estado
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Função auxiliar para encontrar um produto específico na lista baixada
  // Usamos um nome padrão para evitar erros caso o produto ainda não tenha sido carregado
  const findProduto = (nome, categoria) => {
    return produtos.find(p => p.nome === nome && p.categoria === categoria) || { nome: 'Carregando...', preco: '...' };
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.5rem' }}>Carregando produtos...</div>;
  }

  return (
    <div>
      <BannerPromocao />
      <div className="container-pagina-principal">

        {/* --- Categoria: Padaria --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Padaria</h2>
          <div className="lista-produtos-categoria">
            <ProdutoCard {...findProduto('Pão Francês Fresquinho', 'Padaria')} />
            <ProdutoCard {...findProduto('Bolo de Chocolate Artesanal', 'Padaria')} />
            <ProdutoCard {...findProduto('Biscoitos Amanteigados Caseiros', 'Padaria')} />
            <ProdutoCard {...findProduto('Pão de Forma Integral', 'Padaria')} />
            {/* Adicione outros cards da padaria aqui se necessário */}
          </div>
        </div>

        {/* --- Categoria: Laticínios e Cereais --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Laticínios e Cereais</h2>
          <div className="lista-produtos-categoria">
            <ProdutoCard {...findProduto('Leite Integral Longa Vida', 'Laticínios e Cereais')} />
            <ProdutoCard {...findProduto('Iogurte Natural Cremoso', 'Laticínios e Cereais')} />
            <ProdutoCard {...findProduto('Cereal Matinal Crocante', 'Laticínios e Cereais')} />
            <ProdutoCard {...findProduto('Queijo Mussarela Fatiado', 'Laticínios e Cereais')} />
          </div>
        </div>

        {/* --- Categoria: Hortifrúti --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Hortifrúti</h2>
          <div className="lista-produtos-categoria">
            <ProdutoCard {...findProduto('Maçãs Fuji (kg)', 'Hortifrúti')} />
            <ProdutoCard {...findProduto('Bananas Nanicas (cacho)', 'Hortifrúti')} />
            <ProdutoCard {...findProduto('Alface Crespa Orgânica', 'Hortifrúti')} />
            <ProdutoCard {...findProduto('Tomate Cereja (bandeja)', 'Hortifrúti')} />
          </div>
        </div>

        {/* --- Categoria: Carnes e Frios --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Carnes e Frios</h2>
          <div className="lista-produtos-categoria">
            <ProdutoCard {...findProduto('Picanha Bovina Resfriada (kg)', 'Carnes e Frios')} />
            <ProdutoCard {...findProduto('Peito de Frango Congelado (kg)', 'Carnes e Frios')} />
            <ProdutoCard {...findProduto('Presunto Cozido Fatiado (200g)', 'Carnes e Frios')} />
            <ProdutoCard {...findProduto('Salame Italiano Fatiado', 'Carnes e Frios')} />
          </div>
        </div>

        {/* --- Categoria: Bebidas --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Bebidas</h2>
          <div className="lista-produtos-categoria">
            <ProdutoCard {...findProduto('Suco de Laranja Natural 1L', 'Bebidas')} />
            <ProdutoCard {...findProduto('Água Mineral sem Gás (12x500ml)', 'Bebidas')} />
            <ProdutoCard {...findProduto('Refrigerante Cola Zero Açúcar (2L)', 'Bebidas')} />
            <ProdutoCard {...findProduto('Cerveja Lager Puro Malte (Pack 6x350ml)', 'Bebidas')} />
          </div>
        </div>
        
        {/* --- Categoria: Congelados --- */}
        <div className="container-categoria">
          <h2 className="titulo-secao-categoria">Congelados</h2>
          <div className="lista-produtos-categoria">
              <ProdutoCard {...findProduto('Mini Pizza Congelada', 'Congelados')} />
              <ProdutoCard {...findProduto('Batata Frita Congelada (1kg)', 'Congelados')} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Produto;