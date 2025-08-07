import React, { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

const habilidades = [
  {
    nome: "HTML",
    descricao: "Estrutura o conteúdo das páginas web, organizando textos, imagens e elementos essenciais para navegação.",
  },
  {
    nome: "CSS",
    descricao: "Estiliza e deixa as interfaces visuais atraentes e responsivas, garantindo boa experiência em diversos dispositivos.",
  },
  {
    nome: "JavaScript",
    descricao: "Adiciona interatividade e funcionalidades dinâmicas, melhorando a experiência do usuário.",
  },
  {
    nome: "React",
    descricao: "Constrói interfaces modernas e reutilizáveis com componentes, otimizando performance e manutenção.",
  },
  {
    nome: "Node.js",
    descricao: "Desenvolve o backend, criando servidores e APIs que suportam o frontend.",
  },
  {
    nome: "Git",
    descricao: "Gerencia controle de versões do código, facilitando organização e colaboração em equipe.",
  },
  {
    nome: "GitHub",
    descricao: "Hospeda repositórios, facilita colaboração e documentação dos projetos.",
  },
];

const icones = {
  HTML: <FaHtml5 color="#e34c26" />,
  CSS: <FaCss3Alt color="#264de4" />,
  JavaScript: <FaJs color="#f0db4f" />,
  React: <FaReact color="#61dafb" />,
  "Node.js": <FaNodeJs color="#3c873a" />,
  Git: <FaGitAlt color="#f14e32" />,
  GitHub: <FaGithub color="#333" />,
};

const niveis = {
  HTML: 90,
  CSS: 85,
  JavaScript: 80,
  React: 75,
  "Node.js": 65,
  Git: 85,
  GitHub: 80,
};

const links = {
  HTML: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
  CSS: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
  JavaScript: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  React: "https://reactjs.org",
  "Node.js": "https://nodejs.org",
  Git: "https://git-scm.com/doc",
  GitHub: "https://docs.github.com/pt",
};

const Seta = ({ aberto }) => (
  <span
    style={{
      transition: "transform 0.3s ease",
      transform: aberto ? "rotate(180deg)" : "rotate(0deg)",
      marginLeft: "10px",
    }}
  >
    ↑
  </span>
);

const AccordionHabilidades = () => {
  const [abertoIndex, setAbertoIndex] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(false);

  const toggleIndex = (index) => {
    setAbertoIndex(abertoIndex === index ? null : index);
  };

  return (
    <section
      style={{
        maxWidth: 700,
        margin: "30px auto",
        padding: "1.5rem",
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        color: "#333",
        fontFamily: "sans-serif",
        
      }}
    >
      <h1 style={{ color: "#000000ff", textAlign: "center", marginBottom: "1.5rem" }}>
        Minhas habilidades
      </h1>

      <button
        onClick={() => setMostrarLista(!mostrarLista)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#333",
          borderRadius: "20px",
          borderBottom: "2px solid #14cbf8",
          cursor: "pointer",
        }}
      >
        {mostrarLista ? "Fechar" : "Mostrar Habilidades"}
        <Seta aberto={mostrarLista} />
      </button>

      {mostrarLista && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {habilidades.map((hab, index) => {
            const aberto = abertoIndex === index;
            return (
              <li key={hab.nome} style={{ marginBottom: "1rem" }}>
                <button
                  onClick={() => toggleIndex(index)}
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "left",
                    background: aberto ? "#eafcff" : "none",
                    border: "none",
                    borderBottom: `2px solid ${aberto ? "#00b4d8" : "#ccc"}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: aberto ? "#b62400ff" : "#333",
                    transition: "all 0.3s ease",
                  }}
                  aria-expanded={aberto}
                  aria-controls={`desc-${index}`}
                  id={`btn-${index}`}
                >
                  <span style={{ marginRight: "10px" }}>{icones[hab.nome]}</span>
                  {aberto ? "Fechar" : hab.nome}
                  <Seta aberto={aberto} />
                </button>

                <div
                  id={`desc-${index}`}
                  role="region"
                  aria-labelledby={`btn-${index}`}
                  style={{
                    maxHeight: aberto ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                    padding: aberto ? "12px 8px" : "0 8px",
                    color: "#555",
                    fontSize: "0.95rem",
                    borderBottom: aberto ? "1px solid #eee" : "none",
                    background: aberto ? "#f9fdff" : "transparent",
                    borderRadius: "0 0 0.5rem 0.5rem",
                  }}
                >
                  <p style={{ margin: 0 }}>{hab.descricao}</p>
                  <div style={{ marginTop: "8px" }}>
                    <div
                      style={{
                        background: "#eee",
                        borderRadius: "4px",
                        height: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${niveis[hab.nome]}%`,
                          background: "#00b4d8",
                          height: "100%",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <p style={{ fontSize: "0.85rem", marginTop: "5px", color: "#333" }}>
                      Nível: {niveis[hab.nome]}%
                    </p>
                    <a
                      href={links[hab.nome]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#0077cc",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                      }}
                    >
                      Saiba mais →
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default AccordionHabilidades;
