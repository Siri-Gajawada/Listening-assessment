import React, { useState, useEffect } from "react";
import NameInput from "./components/NameInput";
import AudioQuestion from "./components/AudioQuestion";
import SubmitButton from "./components/SubmitButton";
import './App.css';
import listeningHome from './assests/Listening_home.png'; // ✅ Import background image

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

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [name, responses]);

  // Auto-submit with sendBeacon on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (name && Object.keys(responses).length > 0) {
        const data = JSON.stringify({ name, responses });
        const blob = new Blob([data], { type: "application/json" });
        navigator.sendBeacon("http://localhost:3001/submit", blob);
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
    <div
      style={{
        backgroundImage: `url(${listeningHome})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      <div className="container">
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
          className="submit-button"
          disabled={!allAnswered}
          name={name}
          responses={responses}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default App;
