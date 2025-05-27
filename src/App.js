import React, { useState, useEffect } from "react";
import NameInput from "./components/NameInput";
import AudioQuestion from "./components/AudioQuestion";
import SubmitButton from "./components/SubmitButton";
import './App.css'; // Add this line at the top



const questions = [
  { id: 1, audioSrc: "/audios/q1.mp3" },
  { id: 2, audioSrc: "/audios/q2.mp3" },
  { id: 3, audioSrc: "/audios/q3.mp3" },
  { id: 4, audioSrc: "/audios/q4.mp3" },
  { id: 5, audioSrc: "/audios/q5.mp3" },
];

function App() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem("responses")) || {}
  );

  // Save name and responses to localStorage
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [name, responses]);

  // Auto-submit using sendBeacon on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (name && Object.keys(responses).length > 0) {
        const data = JSON.stringify({ name, responses });
        const blob = new Blob([data], { type: "application/json" });
        navigator.sendBeacon("http://localhost:3001/submit", blob);
        // localStorage.setItem("submitted", "true"); // Removed to allow reattempts
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [name, responses]);

  const handleResponseChange = (id, text) => {
    setResponses((prev) => ({ ...prev, [id]: text }));
  };

  const handleReset = () => {
    setName("");
    setResponses({});
    localStorage.clear();
  };

  const allAnswered =
    name.trim() !== "" && questions.every((q) => responses[q.id]?.trim());

  return (
    <div className="container">
      <h2>English Listening Assessment</h2>
      <NameInput name={name} setName={setName} />
      {questions.map((q) => (
        <AudioQuestion
          key={q.id}
          id={q.id}
          audioSrc={q.audioSrc}
          response={responses[q.id] || ""}
          onResponseChange={handleResponseChange}
          name={name}
        />
      ))}
      <SubmitButton
        disabled={!allAnswered}
        name={name}
        responses={responses}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
