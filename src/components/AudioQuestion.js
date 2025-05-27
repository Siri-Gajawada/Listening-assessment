import React, { useEffect, useRef, useState } from "react";

function AudioQuestion({ id, audioSrc, response, onResponseChange, name }) {
  const storageKey = `audio-play-count-${id}`;
  const [playCount, setPlayCount] = useState(
    parseInt(localStorage.getItem(storageKey)) || 0
  );
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, playCount);
  }, [playCount]);

  const handlePlay = () => {
    if (!name.trim()) {
      alert("Please enter your name first.");
      return;
    }

    if (playCount >= 2) {
      alert("Audio limit reached. You can only listen twice.");
      return;
    }

    audioRef.current.play();
    const next = playCount + 1;
    setPlayCount(next);
    localStorage.setItem(storageKey, next);
  };

  return (
    <div className="question-card">
      <h3>Question {id}</h3>

      <button onClick={handlePlay} disabled={playCount >= 2}>
        ▶️ Play Audio ({2 - playCount} plays left)
      </button>

      <audio ref={audioRef}>
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <textarea
        placeholder="Type your answer here..."
        value={response}
        onChange={(e) => onResponseChange(id, e.target.value)}
      />
    </div>
  );
}

export default AudioQuestion;
