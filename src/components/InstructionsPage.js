import React from "react";

const InstructionsPage = ({ onStartTest }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(180deg, #ffeb3b, #e8ce09)", // same as login
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem 3rem",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            color: "#000",
            textAlign: "center",
          }}
        >
          Instructions
        </h2>

        <ul
          style={{
            fontSize: "1.25rem",
            lineHeight: "2.25rem",
            color: "#333",
            paddingLeft: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          <li><strong>Enter your name</strong> before attempting questions.</li>
          <li>Use headphones for better audio clarity.</li>
          {/* <li>Listen carefully to each audio clip.</li> */}
          <li><strong>Each audio clip can only be played twice.</strong></li>
          <li>Answer all 5 questions before submitting.</li>
          <li><strong>Do not refresh the page</strong> during the test.</li>
          <li><strong>Once submitted, you cannot reattempt the test.</strong></li>
        </ul>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={onStartTest}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#444")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#000")
            }
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
