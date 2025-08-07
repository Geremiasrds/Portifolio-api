import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Footer from "./Footer";
import axios from "axios";

const Contato = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [userData, setUserData] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);

  useEffect(() => {
    // Pega dados básicos do GitHub e última atividade pública
    axios.get("https://api.github.com/users/geremiasrds").then((res) => {
      setUserData(res.data);
    });

    axios
      .get("https://api.github.com/users/geremiasrds/events/public")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const lastDate = new Date(res.data[0].created_at);
          const now = new Date();
          const diffMs = now - lastDate;
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          setLastActivity(diffDays);
        }
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSucesso(false);
  };

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nome, email, mensagem } = formData;

    if (!nome || !email || !mensagem) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setSucesso(true);
    setFormData({ nome: "", email: "", mensagem: "" });
  };

  return (
    <motion.section
      className="contato"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: "2rem",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        borderRadius: "1.5rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      {userData && (
        <p style={{ fontStyle: "italic", color: "#444", marginBottom: "1.5rem", textAlign: "center" }}>
           sinta-se à vontade para me mandar uma mensagem!
          {lastActivity !== null && (
            <>
              <br />
              Última contribuição no GitHub: {lastActivity} {lastActivity === 1 ? "dia" : "dias"} atrás.
            </>
          )}
        </p>
      )}

      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem", color: "#333" }}>
        ✉️ Entre em Contato
      </h2>

      <p style={{ fontStyle: "italic", textAlign: "center", color: "#444", marginBottom: "1.5rem" }}>
        Se você chegou até aqui, é porque algo chamou sua atenção... então por que não dar o próximo passo? 😉 Me mande uma mensagem — pode ser o início de algo incrível!
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="input-estilizado"
        />

        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-estilizado"
        />

        <textarea
          name="mensagem"
          placeholder="Escreva sua mensagem..."
          rows="5"
          value={formData.mensagem}
          onChange={handleChange}
          required
          className="input-estilizado"
        />

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#e63946" }}>
            {error}
          </motion.p>
        )}
        {sucesso && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#2a9d8f" }}>
            Mensagem enviada com sucesso!
          </motion.p>
        )}

        <motion.button whileTap={{ scale: 0.95 }} type="submit" className="botao-enviar">
          <Send size={18} style={{ marginRight: 8 }} />
          Enviar
        </motion.button>
      </form>
      <Footer />
    </motion.section>
  );
};

export default Contato;
