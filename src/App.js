import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import InstructionsPage from "./components/InstructionsPage";
import NameInput from "./components/NameInput";
import AudioQuestion from "./components/AudioQuestion";
import SubmitButton from "./components/SubmitButton";
import "./App.css";

const questions = [
  { id: 1, audioSrc: "/audios/q1.mp3" },
  { id: 2, audioSrc: "/audios/q2.mp3" },
  { id: 3, audioSrc: "/audios/q3.mp3" },
  { id: 4, audioSrc: "/audios/q4.mp3" },
  { id: 5, audioSrc: "/audios/q5.mp3" },
];

function App() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("login");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [responses, setResponses] = useState(
    JSON.parse(localStorage.getItem("responses")) || {}
  );

  // Save name and responses in localStorage
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [name, responses]);

  // Block back & refresh with popup alert
  useEffect(() => {
    const submitted = localStorage.getItem(`submitted_${name}`);
    const started = name && Object.keys(responses).length > 0;

    // 🔒 Block refresh
    const handleBeforeUnload = (e) => {
      if (started || submitted === "true") {
        e.preventDefault();
        e.returnValue = "";
        alert("⛔ You cannot refresh or go back once the test is started");
        return "";
      }
    };

    // 🔒 Block back
    const handlePopState = () => {
      if (started || submitted === "true") {
        alert("⛔ You cannot refresh or go back once the test is started");
        window.history.pushState(null, "", window.location.href);
      }
    };

    if (started || submitted === "true") {
      window.onbeforeunload = handleBeforeUnload;
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.onbeforeunload = null;
      window.removeEventListener("popstate", handlePopState);
    };
  }, [name, responses]);

  const handleResponseChange = (id, text) => {
    setResponses((prev) => ({ ...prev, [id]: text }));
  };

  const handleReset = () => {
    setName("");
    setResponses({});
    localStorage.clear();
    setStage("login");
  };

  const allAnswered =
    name.trim() !== "" && questions.every((q) => responses[q.id]?.trim());

  if (stage === "login") {
    return (
      <LoginPage
        onLogin={(username) => {
          const submittedFlag = localStorage.getItem(`submitted_${username}`);
          if (submittedFlag === "true") {
            alert("⛔ You have already submitted the test.");
            return;
          }
          setName(username);
          setStage("instructions");
        }}
      />
    );
  }

  if (stage === "instructions") {
    return <InstructionsPage onStartTest={() => setStage("test")} />;
  }

  return (
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
        disabled={!allAnswered}
        name={name}
        responses={responses}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;
