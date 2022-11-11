import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import setaDireita from '../../assets/icons/seta-direita.png';
import facebook from '../../assets/icons/redesSociais/facebook.png';
import instagram from '../../assets/icons/redesSociais/instagram.png';
import linkedin from '../../assets/icons/redesSociais/linkedin.png';
import youtube from '../../assets/icons/redesSociais/youtube.png';
import homec from '../../assets/icons/menus/homec.png';
import faturac from '../../assets/icons/menus/faturac.png';
import servicosc from '../../assets/icons/menus/servicosc.png';
import suportec from '../../assets/icons/menus/suportec.png';
import logo from '../../assets/logo/Logo.png';
import logoP from '../../assets/logo/logoBranco.svg';
import './styles.scss';

function Home() {
  React.useEffect(() => {
    const cookie = new Cookies();

    cookie.set('csrftoken', 'K7XffKq54f1VXz8en7zYlYuMJdN9K4xPAWpROqgTk08Tjef7v2VtP1xGnc0cOX7R', { path: '/' });
  }, []);

  return (
    <div className="container">
      <main className="content">
        <section className="welcomeContainer">
          <div className="title-welcome">
            <h3 className="welcome">Bem vindo ao Minha</h3>
            <h3 className="welcome strong"> Wirelink!</h3>
          </div>
          <p className="welcomeDescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
            laoreet orci.
          </p>
        </section>
        <section className="cardContainer">
          <img src={logo} alt="wirelink" className="cardLogo" />
          <div className="cardTitle">
            <h1>Acessar Minha</h1>
            <h1 className="strong">Wirelink</h1>
          </div>
          <Link className="cardLoginButton" to="/login">
            FAÇA SEU LOGIN
            <img src={setaDireita} alt="seta-direita" />
          </Link>
          <span className="cardTextOu">OU</span>
          <Link className="cardCadastroButton" to="/cadastro">
            SOLICITAR SEU ACESS0
            <img src={setaDireita} alt="seta-direita" />
          </Link>
        </section>
        <section className="infoContainer">
          <div className="infoLogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="infoContent">
            <div className="infoTitle">
              <div className="details"> </div>
              <h1>Fique por dentro de tudo:</h1>
            </div>
            <div className="info">
              <div className="rowInfo">
                <img src={homec} alt="homec" />
                <span>Seus Tickets</span>
              </div>
              <div className="rowInfo">
                <img src={suportec} alt="suportec" />
                <span>Confira as mensagens do Suporte Técnico</span>
              </div>
              <div className="rowInfo">
                <img src={servicosc} alt="servicosc" />
                <span>Tudo Sobre seus Serviços</span>
              </div>
              <div className="rowInfo">
                <img src={faturac} alt="faturac" />
                <span>Confira suas Faturas</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footerHome">
        <div className="footerContent">
          <div className="enderecoFooter">
            <h1 className="footerTitle">ENDEREÇO</h1>
            <div>
              <span className="city">FORTALEZA:</span>
              <br />
              <span className="endereco">
                Av. Santos Dumont, 2626, Ed. Plaza Tower, Aldeota, Fortaleza,
                Ceará, Brasil, CEP: 60150-161.
              </span>
            </div>
            <div>
              <span className="city">SÃO PAULO:</span>
              <br />
              <span className="endereco">
                Av. Dr. Chucri Zaidan, 1550, Sala 2308, Vila Cordeiro, São
                Paulo, SP, Brasil, CEP: 04583-110.
              </span>
            </div>
            <div>
              <span className="city">RECIFE:</span>
              <br />
              <span className="endereco">
                Rua Agenor Lopes, 25, Condomínio Edifício Itamaraty, Sala 203,
                Boa Viagem, Recife, PE, Brasil, CEP 51.021-110.
              </span>
            </div>
            <div>
              <span className="city">CNPJ: </span>
              <span className="endereco">06.809.941/0001-57</span>
            </div>
          </div>
          <div className="redesSociais">
            <h1 className="footerTitle">REDES SOCIAIS</h1>
            <div className="iconsContainer">
              <a
                href="https://www.facebook.com/wirelinkoficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook" />
              </a>
              <a
                href="https://www.youtube.com/wirelinktelecom"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtube} alt="youtube" />
              </a>
              <a
                href="https://www.linkedin.com/company/wirelink/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
              <a
                href="https://www.instagram.com/wirelink/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </div>
            <div className="links">
              <a
                href="https://www.wirelink.com.br/pt/politica-de-privacidade/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade
              </a>
              <a href="https://www.wirelink.com.br">
                <span>Wirelink</span>
                .com.br
              </a>
            </div>
          </div>
        </div>
        <div className="divider"> </div>
        <div className="copyright">
          <img src={logoP} alt="logo" />
          <span>Wirelink. © 2020. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
