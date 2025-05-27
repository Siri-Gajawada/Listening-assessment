import React from "react";

function SubmitButton({ disabled, name, responses, onReset, setSubmitted }) {
  const handleSubmit = async () => {
    try {
      const now = new Date().toISOString();
      const entries = Object.entries(responses).map(([qid, answer]) => ({
        name,
        question_id: qid,
        answer,
        timestamp: now,
      }));

      const response = await fetch("https://sheetdb.io/api/v1/6zdaokfg5ecxm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: entries }),
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error(`SheetDB returned status ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        // Some SheetDB error inside the body
        throw new Error(result.error);
      }

      // ✅ Success path
      alert("✅ Submission successful!");
      localStorage.setItem("submitted", "true");
      localStorage.removeItem("name");
      localStorage.removeItem("responses");
      onReset();
      setSubmitted(true);

      setTimeout(() => window.location.reload(), 500);

    } catch (err) {
      // Will only be shown if fetch fails or SheetDB responds with error
      console.error("Submission failed:", err);
      // alert("❌ Network error. Please try again later.");
    }
  };

  return (
    <button onClick={handleSubmit} disabled={disabled}>
      Submit
    </button>
  );
}

export default SubmitButton;
