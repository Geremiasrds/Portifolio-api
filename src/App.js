import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import ProjetoCard from "./components/ProjetoCard";
import MenuMobile from "./components/MenuMobile";
import AccordionHabilidades from "./components/AccordionHabilidades";
import Contato from "./components/Contato";
import { motion, AnimatePresence } from "framer-motion";

import "./index.css";
import PainelProjetos from "./components/PainelProjetos";

const Seta = ({ aberto }) => (
  <span
    style={{
      display: "inline-block",
      transition: "transform 0.3s ease",
      transform: aberto
        ? "rotate(180deg) scaleX(1.1)"
        : "rotate(0deg) scaleX(1.1)",
      fontSize: "1rem",
      marginLeft: "8px",
      userSelect: "none",
      lineHeight: 1,
    }}
  >
    ↑
  </span>
);

const App = () => {
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const meusProjetos = ["login-geral", "site-de-empresa", "pock-devs"];
  const [mostrarCuriosidade, setMostrarCuriosidade] = useState(false);
  const [mostrarPortfolio, setMostrarPortfolio] = useState(false);

  // Dark mode state, inicializa do localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    axios.get("https://api.github.com/users/geremiasrds").then((res) => {
      setUserData(res.data);
    });

    axios.get("https://api.github.com/users/geremiasrds/repos").then((res) => {
      const filtrados = res.data.filter((repo) =>
        meusProjetos.includes(repo.name)
      );
      setRepos(filtrados);
    });
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        userData={userData}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {showMenu && (
  <MenuMobile
    repos={repos}
    setShowMenu={setShowMenu}
    userData={userData}
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />
)}


      <div className="projetos-container desktop">
        <PainelProjetos repos={repos} />
      </div>
      <div className="projetos-container desktop">
        {repos.map((repo) => (
          <ProjetoCard key={repo.id} repo={repo} />
        ))}
      </div>

      <section className="sobre">
        <button
          onClick={() => setMostrarPortfolio(!mostrarPortfolio)}
          className="botao-toggle"
          aria-expanded={mostrarPortfolio}
          aria-controls="portfolio-content"
        >
          {mostrarPortfolio ? " Fechar" : "💻 Sobre este portfólio"}
          <Seta aberto={mostrarPortfolio} />
        </button>
        <AnimatePresence>
          {mostrarPortfolio && (
            <motion.div
              id="portfolio-content"
              className="card-curiosidade"
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ duration: 0.35 }}
            >
              <p>
                Olá! Seja muito bem-vindo(a) ao meu portfólio de desenvolvedor, um espaço que construí com dedicação para demonstrar na prática minhas habilidades em desenvolvimento web moderno, especialmente com foco em React.js.
              </p>
              <p>
                Este portfólio é dinâmico e foi desenvolvido do zero com o objetivo de ir além de um simples currículo. Ele consome dados diretamente da API pública do GitHub, o que significa que os projetos exibidos aqui são obtidos automaticamente a partir do meu perfil. Dessa forma, qualquer projeto novo que eu subir no GitHub poderá ser integrado ao portfólio em tempo real.
              </p>
              <p>
                O sistema foi criado usando: React.js, animações com Framer Motion, CSS puro com UI moderna, GitHub REST API com fetch(), componentes reutilizáveis, animações de loading e uma experiência fluida tanto no desktop quanto no mobile.
              </p>
              <p>
                Este projeto não é apenas uma vitrine: é um exemplo real do meu código, organização, boas práticas, domínio de tecnologias atuais e preocupação com a experiência do usuário. Muito obrigado por visitar meu portfólio!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <h2>💡 Sobre mim</h2>
        <p>
          Sou um desenvolvedor web júnior, em constante aprendizado e muito dedicado a aprimorar minhas habilidades.
          Tenho paixão por transformar ideias em soluções digitais eficientes e interfaces modernas e intuitivas.
          Meu foco é construir projetos que proporcionem ótima experiência para o usuário, utilizando tecnologias como HTML, CSS, JavaScript, React e Node.js.
          Além disso, sou familiarizado com ferramentas essenciais de versionamento e colaboração, como Git e GitHub.
          Estou aberto a novos desafios para crescer profissionalmente e contribuir com equipes criativas e inovadoras.
        </p>

        <button
          onClick={() => setMostrarCuriosidade(!mostrarCuriosidade)}
          className="botao-toggle"
          aria-expanded={mostrarCuriosidade}
          aria-controls="curiosidade-content"
        >
          {mostrarCuriosidade ? " Fechar" : "🔍 Curiosidade sobre mim"}
          <Seta aberto={mostrarCuriosidade} />
        </button>

        <AnimatePresence>
          {mostrarCuriosidade && (
            <motion.div
              id="curiosidade-content"
              className="card-curiosidade"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                Estou em transição, saindo das áreas de mecânica, eletrônica e afins, para focar totalmente no desenvolvimento web e tecnologia.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AccordionHabilidades />
      </section>

      <Contato />
    </div>
  );
};

export default App;
