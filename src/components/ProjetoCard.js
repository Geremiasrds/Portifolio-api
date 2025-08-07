import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const linguagemCores = {
  JavaScript: "#a17901ff",
  HTML: "#f97316",
  CSS: "#3b82f6",
  React: "#60a5fa",
};

const ProjetoCard = ({ repo }) => {
  const [loading, setLoading] = useState(true);
  const [linguagens, setLinguagens] = useState([]);
  const [erro, setErro] = useState(false);

  const linkPages =
    repo.homepage || `https://${repo.owner.login}.github.io/${repo.name}/`;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [repo]);

  useEffect(() => {
    const fetchLinguagens = async () => {
      try {
        const res = await fetch(repo.languages_url);
        if (res.status === 403) {
          setErro(true);
          return;
        }
        const data = await res.json();
        setLinguagens(Object.keys(data));
      } catch {
        setErro(true);
      }
    };

    fetchLinguagens();
  }, [repo.languages_url]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#4f46e5",
          }}
        >
          Carregando projeto...
        </motion.div>
      ) : erro ? (
        <motion.div
          key="erro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            padding: "1rem",
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            borderRadius: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Erro ao buscar dados (limite de requisições da API atingido)
        </motion.div>
      ) : (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            padding: "1rem",
            borderRadius: "0.5rem",
            backgroundColor: "#ffffffff",
            color: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <h3>{repo.name}</h3>
          <p>{repo.description || "Sem descrição disponível."}</p>
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {linguagens.map((lang) => (
              <motion.span
                key={lang}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  padding: "4px 8px",
                  borderRadius: "9999px",
                  backgroundColor: linguagemCores[lang] || "#4b5563",
                  color: "#cdd2db",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                }}
              >
                {lang}
              </motion.span>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: 12,
                color: "#ffffffff",
                textDecoration: "underline",
                border:'1px solid black',
                borderRadius:'10px',
                padding:'7px',
                fontWeight:'900',
                backgroundColor:'#6dacf3ff'
              }}
            >
              Ver GitHub
            </a>
            <a
              href={linkPages}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: "#ffffffff",
                 textDecoration: "underline",
                 border:'1px solid black',
                borderRadius:'10px',
                padding:'7px',
                fontWeight:'900',
                backgroundColor:'#454546ff'
               }}
            >
              Ver Pages
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjetoCard;
