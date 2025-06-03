import React from "react";
import { useNavigate } from "react-router-dom";

function SubmitButton({ disabled, name, responses, onReset }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const now = new Date().toISOString();
      const formatted = {
        username: name,
        "question1 response": responses[1] || "",
        "question2 response": responses[2] || "",
        "question3 response": responses[3] || "",
        "question4 response": responses[4] || "",
        "question5 response": responses[5] || "",
        timestamp: now,
      };

      const response = await fetch("https://sheetdb.io/api/v1/rcg7cg5ha55ti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [formatted] }),
      });

      if (!response.ok) throw new Error(`SheetDB returned status ${response.status}`);
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      localStorage.setItem(`submitted_${name}`, "true");
      localStorage.removeItem("name");
      localStorage.removeItem("responses");
      onReset();
      navigate("/thank-you");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("❌ Network error. Please try again later.");
    }
  };

  return (
    <button onClick={handleSubmit} disabled={disabled}>
      Submit
    </button>
  );
}

export default SubmitButton;
