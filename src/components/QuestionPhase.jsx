import { useEffect, useState } from "react";
import socket from "../socket";
import styles from "../assets/QuestionPhase.module.css";

export default function QuestionPhase() {
  const [inputValue, setInputValue] = useState("");
  const [answerCounter, setAnswerCounter] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function handleSend() {
    if (inputValue.trim() !== "") {
      socket.emit("sendAnswer", inputValue);
      setInputValue("");
      setIsButtonDisabled(true);
    }
  }

  useEffect(() => {
    socket.on("answers-count", (count) => {
      setAnswerCounter(count);
    });
    return () => socket.off("answers-count");
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        La Alcaldía de <span className={styles.highlightMedellin}>Medellín</span> necesita un mecanismo para administrar de forma eficiente los <span className={styles.highlightTurnos}>turnos</span> de atención a los ciudadanos en sus oficinas, evitando así tener que <span className={styles.highlightGritar}>gritar</span> para llamar a alguien.
      </h2>
      <p className={styles.subtitle}>Escribe tu solucion</p>
      <textarea
        className={styles.textarea}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isButtonDisabled}
      />

      <button
        className={styles.button}
        onClick={handleSend}
        disabled={isButtonDisabled}
      >
        Enviar
      </button>
      <div className={styles.counter}>Respuestas enviadas: {answerCounter}</div>
    </div>
  );
}
