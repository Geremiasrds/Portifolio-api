import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Footer = () => {
  const [githubInfo, setGithubInfo] = useState(null);
  const [lastRepo, setLastRepo] = useState(null);

  useEffect(() => {
    axios.get("https://api.github.com/users/geremiasrds").then((res) => {
      setGithubInfo(res.data);
    });

    axios
      .get("https://api.github.com/users/geremiasrds/repos?sort=updated")
      .then((res) => {
        if (res.data.length > 0) {
          setLastRepo(res.data[0]);
        }
      });
  }, []);

  const tempoRelativo = (dataString) => {
    const agora = new Date();
    const data = new Date(dataString);
    const diff = Math.floor((agora - data) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "hoje";
    if (diff === 1) return "ontem";
    return `há ${diff} dias`;
  };

  return (
    <footer style={footerStyle}>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Redes Sociais
      </motion.h3>

      <motion.nav
        style={navStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.nome}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {link.nome}
          </motion.a>
        ))}
      </motion.nav>

      {githubInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#333" }}
        >
          <p>👥 {githubInfo.followers} seguidores no GitHub</p>
          <p>📁 {githubInfo.public_repos} repositórios públicos</p>
          <p>🌍 Localização: {githubInfo.location || "não informada"}</p>
          <p>🧠 Bio: {githubInfo.bio || "sem descrição"}</p>
          <p>
            🖱️ <a href={githubInfo.html_url} target="_blank" rel="noreferrer" style={{ color: "#4f46e5" }}>Ver perfil</a>
          </p>
        </motion.div>
      )}

      {lastRepo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#333" }}
        >
          <p>🔧 Último projeto: <a href={lastRepo.html_url} target="_blank" rel="noreferrer" style={{ color: "#4f46e5" }}>{lastRepo.name}</a> ({tempoRelativo(lastRepo.updated_at)})</p>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: "1.2rem", fontSize: "0.85rem", color: "black" }}
      >
        © {new Date().getFullYear()} Geremias Rodrigues da Silva — Powered by GitHub API
      </motion.p>
    </footer>
  );
};

const socialLinks = [
  { nome: "Instagram", url: "https://www.instagram.com/seu_usuario" },
  { nome: "TikTok", url: "https://www.tiktok.com/@seu_usuario" },
  { nome: "GitHub", url: "https://github.com/geremiasrds" },
  { nome: "LinkedIn", url: "https://www.linkedin.com/in/seu_usuario" },
];

const footerStyle = {
  color: "#eee",
  textAlign: "center",
  padding: "2rem",
  marginTop: "3rem",
  background: "#f0f4ff",
  borderTop: "2px solid #ccc",
  borderRadius: "1rem 1rem 0 0",
};

const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
  marginBottom: "1rem",
};

const linkStyle = {
  color: "#4f46e5",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Footer;
