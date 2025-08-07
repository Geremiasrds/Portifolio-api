import React from "react";

const PainelProjetos = () => {
  return (
    <div
      className="painel-projetos"
      style={{
        width: "100%",
        maxWidth: "750px",
        margin: "40px auto",
        zIndex: 999,
        color: "white",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <hr style={{ border: "1px solid #444", marginBottom: "1.5rem" }} />

      <div style={{ color: "#ccc", fontSize: "1.1rem", lineHeight: 1.6 }}>
        <p>“O melhor código é aquele que você entende depois de um mês.”</p>
        <p>— Desenvolvedor anônimo</p>
        <br />
        <p>“Simplicidade é o último grau de sofisticação.”</p>
        <p>— Leonardo da Vinci</p>
        <br />
        <p>“Não tenha medo de errar, tenha medo de não tentar.”</p>
        <br />
        <p>“Todo problema tem uma solução elegante esperando para ser descoberta.”</p>
        <br />
        <p>“A persistência é o caminho do êxito.”</p>
      </div>

      <hr style={{ border: "1px solid #444", marginTop: "1.5rem" }} />
    </div>
  );
};

export default PainelProjetos;
