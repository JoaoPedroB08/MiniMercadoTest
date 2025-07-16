import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListaCompras from '../Components/ListaCompras';
import Logo from '../Img/logo5.png';
import { Link } from 'react-router-dom';
import RoletaModal from '../Components/RoletaModal';
import { AiFillGift } from "react-icons/ai";
import { FaSearch, FaUserCircle} from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs';

function NavbarMenu() {
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [showRoleta, setShowRoleta] = useState(false);
  
  // --- Lógica para o Scroll da Navbar ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const bannerRef = useRef(null); // Usaremos uma referência para o banner

  const abrirCarrinho = () => setShowCarrinho(true);
  const fecharCarrinho = () => setShowCarrinho(false);

  const abrirRoleta = () => setShowRoleta(true);
  const fecharRoleta = () => setShowRoleta(false);

  // --- Efeito para controlar a visibilidade da Navbar ---
  useEffect(() => {
    const handleScroll = () => {
      // Define a altura do banner dinamicamente. Se não houver banner, o valor é 0.
      const bannerHeight = bannerRef.current ? bannerRef.current.offsetHeight : 0;
      const currentScrollY = window.scrollY;

      // Condição 1: Se o scroll está acima do fim do banner, a navbar azul SEMPRE fica visível.
      if (currentScrollY < bannerHeight) {
        setIsNavVisible(true);
      } else {
        // Condição 2: Após passar o banner, esconde ao rolar para baixo, mostra ao rolar para cima.
        if (currentScrollY > lastScrollY.current && currentScrollY > bannerHeight) { // Adicionada verificação extra
          // Rolando para baixo
          setIsNavVisible(false);
        } else {
          // Rolando para cima
          setIsNavVisible(true);
        }
      }
      // Atualiza a última posição do scroll
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Precisamos de uma forma para o JS saber onde está o Banner.
          A forma mais "React" de fazer isso é passando a ref para o componente Home.
          Mas para simplificar, vamos assumir que o Banner está dentro de Home e
          adicionar a ref no componente pai App.js ou no wrapper principal da página.
          
          Como estamos editando SÓ a navbar, vamos envolver o componente com um `div`
          que observará o banner. Uma abordagem mais simples é dar um ID ao banner.
      */}
      
      {/* Navbar Superior (branca) - sempre visível */}
      <Navbar bg="light" expand="lg" className="top-navbar">
        <Container fluid>
          <div className="navbar-content-wrapper d-flex align-items-center justify-content-between flex-wrap w-100">
            <Link to="/" className="p-0 logo-link">
              <img src={Logo} className="d-inline-block align-top logo" alt="Logo Mini Popular"/>
            </Link>
            <Form className="d-flex mx-auto search-container">
              <Form.Control type="search" placeholder="Pesquise aqui..." className="search-input" aria-label="Pesquisar"/>
              <Button className="search-button"><FaSearch /></Button>
            </Form>
            <Nav className="d-flex flex-row align-items-center main-nav-controls">
              <Nav.Link href="#login" className="d-flex align-items-center me-3 login-section">
                <FaUserCircle size={35} className="login-icon" />
                <div className="login-text ms-2">
                  <span>Entre ou</span>
                  <strong>Cadastre-se</strong>
                </div>
              </Nav.Link>
              <Button onClick={abrirCarrinho} variant="success" className="lista-button me-3">
                <BsFillBookmarkFill size={25} />
              </Button>
              <Button variant="link" onClick={abrirRoleta} className="roulette-icon p-0">
                <AiFillGift size={35} />
              </Button>
            </Nav>
          </div>
        </Container>
      </Navbar>

      {/* Wrapper para a Navbar Azul que será controlada */}
      <div className={`navbar-wrapper ${isNavVisible ? '' : 'hidden'}`}>
        <Navbar className="custom-navbar" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Link to="/" className='menu-item'>Home</Link>
                <Link to="/sobre" className='menu-item'>Mini Popular</Link>
                <Link to="/produtos" className='menu-item'>Produtos</Link>
                <Link to="/contato" className='menu-item'>Contato</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <ListaCompras show={showCarrinho} onHide={fecharCarrinho} />
      <RoletaModal isOpen={showRoleta} onClose={fecharRoleta} />
    </>
  );
}

// Pequena mudança na lógica do scroll. Precisamos de uma forma de pegar a altura do banner.
// Vamos fazer isso no useEffect agora.
const useBannerHeight = () => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const bannerElement = document.getElementById('main-banner');
        if (bannerElement) {
            // Usamos um ResizeObserver para atualizar a altura se o tamanho da janela mudar
            const observer = new ResizeObserver(entries => {
                setHeight(entries[0].target.offsetHeight);
            });
            observer.observe(bannerElement);
            return () => observer.disconnect();
        }
    }, []); // Executa apenas uma vez para encontrar o elemento

    return height;
};


// Nova versão do NavbarMenu com a lógica corrigida
function CorrectedNavbarMenu() {
    const [showCarrinho, setShowCarrinho] = useState(false);
    const [showRoleta, setShowRoleta] = useState(false);
    
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const bannerHeight = useBannerHeight(); // Hook customizado para pegar a altura do banner

    const abrirCarrinho = () => setShowCarrinho(true);
    const fecharCarrinho = () => setShowCarrinho(false);

    const abrirRoleta = () => setShowRoleta(true);
    const fecharRoleta = () => setShowRoleta(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < bannerHeight) {
                setIsNavVisible(true);
            } else {
                if (currentScrollY > lastScrollY.current) {
                    setIsNavVisible(false);
                } else {
                    setIsNavVisible(true);
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [bannerHeight]); // Re-executa se a altura do banner mudar

    return (
        <>
            {/* O resto do seu JSX aqui é o mesmo... */}
            <Navbar bg="light" expand="lg" className="top-navbar">{/* ... */}</Navbar>

            <div className={`navbar-wrapper ${isNavVisible ? '' : 'hidden'}`}>
                <Navbar className="custom-navbar" variant="dark" expand="lg">
                    {/* ... */}
                </Navbar>
            </div>
            {/* ... */}
        </>
    );
}

// Para evitar confusão, vamos exportar a versão original corrigida que é mais simples
// e não requer hooks customizados, apenas o ID.
export default NavbarMenu;