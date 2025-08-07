import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ProjetoCard from "./ProjetoCard";
import Header from "./Header";
import Footer from "./Footer";

const frasesCarrossel = [
  "💡 A lógica é o pincel do programador.",
  "🚀 Um projeto por vez, um nível por dia.",
  "🔧 Código limpo é um presente para o futuro.",
  "👀 Detalhes fazem a diferença no design.",
  "📦 Reutilizar componentes é ser inteligente.",
  "🧠 Resolver bugs é treinar o cérebro.",
];

const nomesManuais = {
  "login-geral": "Login Geral - Sistema de autenticação",
  "site-de-empresa": "Site da Empresa - Institucional moderno",
  "pock-devs": "Pock Devs - Gerenciamento de tarefas",
};

const MenuMobile = ({ repos, setShowMenu, userData, darkMode, setDarkMode }) => {
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [fraseIndex, setFraseIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleSelecionarProjeto = (repo) => {
    setProjetoSelecionado((prev) =>
      prev && prev.id === repo.id ? null : repo
    );
  };

  const handleFechar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
    }, 400); // tempo da animação
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) =>
        prev === frasesCarrossel.length - 1 ? 0 : prev + 1
      );
    }, 2000);
    document.body.style.overflow = "hidden";
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="menu-mobile"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: darkMode ? "#121212" : "#1a1a1a",
        color: darkMode ? "#eee" : "white",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        animation: `${isClosing ? "fadeSlideOut" : "fadeSlideIn"} 0.4s ease forwards`,
        opacity: 0,
        transform: "translateY(-20px)",
        overflowY: "auto",
      }}
    >
      <button
        className="fechar-btn"
        onClick={handleFechar}
        style={{
          position: "absolute",
          top: 30,
          right: 15,
          background: "transparent",
          border: "none",
          color: darkMode ? "#eee" : "white",
          cursor: "pointer",
          backgroundColor: darkMode ? "#222" : "#000",
          borderRadius: "50%",
          padding: "4px",
        }}
        aria-label="Fechar menu"
      >
        <X size={24} />
      </button>

      <div style={{ marginBottom: "1.5rem" }}>
        <Header
          userData={userData}
          showMenu={true}
          setShowMenu={setShowMenu}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          borderRadius: "50px",
          color: darkMode ? "#90caf9" : "blue",
          marginBottom: "1rem",
          minHeight: "24px",
          transition: "opacity 0.5s ease",
          backgroundColor: darkMode ? "#2c2c2c" : "#cececd70",
          padding: "0.25rem 1rem",
          fontStyle: "italic",
        }}
      >
        {frasesCarrossel[fraseIndex]}
      </div>

      <p style={{ textAlign: "center", color: darkMode ? "#ccc" : "black", marginBottom: "1.5rem" }}>
        Transformando café em código e ideias em soluções digitais.
      </p>

      <hr style={{ border: `1px solid ${darkMode ? "#444" : "#444"}`, marginBottom: "1rem" }} />

      <h3 style={{ color: darkMode ? "#82b1ff" : "#87cefa", marginBottom: "0.5rem" }}>📁 Projetos</h3>

      {repos.map((repo) => (
        <div
          key={repo.id}
          className="titulo-projeto"
          style={{
            cursor: "pointer",
            color:
              projetoSelecionado && projetoSelecionado.id === repo.id
                ? "orange"
                : darkMode ? "#eee" : "white",
            fontWeight:
              projetoSelecionado && projetoSelecionado.id === repo.id
                ? "bold"
                : "normal",
            marginBottom: "8px",
            paddingLeft: "10px",
            borderLeft:
              projetoSelecionado && projetoSelecionado.id === repo.id
                ? "4px solid orange"
                : "4px solid transparent",
            transition: "all 0.2s ease",
          }}
          onClick={() => handleSelecionarProjeto(repo)}
        >
          {nomesManuais[repo.name] || repo.name}
        </div>
      ))}

      {projetoSelecionado && (
        <div style={{ marginTop: "1rem" }}>
          <ProjetoCard repo={projetoSelecionado} />
        </div>
      )}

      <hr style={{ border: `1px solid ${darkMode ? "#444" : "#444"}`, margin: "1.5rem 0" }} />

      <div style={{ textAlign: "center", color: darkMode ? "#ccc" : "#666", fontSize: "0.95rem" }}>
        <p>“O melhor código é aquele que você entende depois de um mês.”</p>
        <p>— Desenvolvedor anônimo</p>
      </div>

      <Footer />
    </div>
  );
};

export default MenuMobile;
