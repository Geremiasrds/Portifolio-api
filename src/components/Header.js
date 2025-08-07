import React, { useState } from "react";
import { motion } from "framer-motion";

const Header = ({ userData, showMenu, setShowMenu, darkMode, setDarkMode }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: darkMode
          ? "linear-gradient(10deg, #1a1a1a, #333)"
          : "linear-gradient(10deg, #3a7fffff, #f9f9faff)",
        padding: "1rem 2rem",
        borderRadius: "0 0 2rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: darkMode ? "#eee" : "#070707",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        top: 0,
        zIndex: 1000,
        fontSize:'10px',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <motion.img
          src={userData.avatar_url}
          alt="Perfil"
          className="avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `3px solid ${darkMode ? "#eee" : "#fff"}`,
            boxShadow: darkMode
              ? "0 0 10px rgba(255,255,255,0.5)"
              : "0 0 10px rgba(255,255,255,0.3)",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => setIsClicked(!isClicked)}
          animate={{
            scale: isClicked ? 1.3 : 1,
            boxShadow: isClicked
              ? "0 0 20px rgba(255,255,255,0.8)"
              : darkMode
              ? "0 0 10px rgba(255,255,255,0.5)"
              : "0 0 10px rgba(255,255,255,0.3)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <div style={{color:'white'}}>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontFamily: "'Poppins', sans-serif",
              color: darkMode ? "#eee" : "#070707",
            }}
          >
            {userData.name}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              opacity: 0.9,
              fontFamily: "'Roboto', sans-serif",
              color: darkMode ? "#ccc" : "#070707",
            }}
          >
            {userData.bio}
          </p>
          {/* Aqui as infos extras */}
          <p style={{ marginTop: 6, fontSize: "10px", opacity: 0.8 }}>
            📍 {userData.location || "Belem pá"}
          </p>
          <p style={{ marginTop: 6, fontSize: "10px", opacity: 0.8 }}>
            👥 Seguidores: {userData.followers} • Seguindo: {userData.following}
          </p>
          <p style={{ marginTop: 6, fontSize: "10px", opacity: 0.8 }}>
            📦 Repositórios públicos: {userData.public_repos}
          </p>
          {userData.blog && (
            <p style={{ marginTop: 6, fontSize: "0.85rem", opacity: 0.8 }}>
              🔗 <a href={userData.blog} target="_blank" rel="noreferrer">{userData.blog}</a>
            </p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "none",
            backgroundColor: darkMode ? "#eee" : "#333",
            color: darkMode ? "#333" : "#eee",
            transition: "all 0.3s",
            userSelect: "none",
          }}
          aria-label="Alternar modo claro/escuro"
        >
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button> */}

        <div
          className="menu-icon"
          onClick={() => setShowMenu(!showMenu)}
          style={{
            fontSize: "1.8rem",
            cursor: "pointer",
            transition: "transform 0.2s",
            color: darkMode ? "#eee" : "#070707",
            userSelect: "none",
          }}
          title={showMenu ? "Fechar Menu" : "Abrir Menu"}
        >
          {showMenu ? "" : "☰"}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
