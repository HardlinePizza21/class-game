import { useEffect, useState } from "react";
import socket from "../socket";
import styles from "../assets/AdminPanel.module.css";

export default function AdminPanel() {
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [answersArr, setAnswersArr] = useState([]);
  const [votesArr, setVotesArr] = useState([]);

  useEffect(() => {
    socket.on("users-count", (count) => setConnectedUsers(count));
    return () => socket.off("users-count");
  }, []);

  useEffect(() => {
    socket.on("votePhaseUsers", ({ answers }) => {
      setAnswersArr(answers);
      setVotesArr(new Array(answers.length).fill(0));
    });

    return () => socket.off("votePhaseUsers");
  }, []);

  useEffect(() => {
    socket.on("voteUpdate", ({ index, count }) => {
      setVotesArr((prevVotes) => {
        const updatedVotes = [...prevVotes];
        updatedVotes[index] = count;
        return updatedVotes;
      });
    });

    return () => socket.off("voteUpdate");
  }, []);

  const startGame = () => socket.emit("start-phase-2");
  const votePhase = () => socket.emit("votePhase");
  const endPhase = () => socket.emit("endPhase");
  const reset = () => socket.emit("reset");

  return (
    <div className={styles.panelContainer}>
      <h2 className={styles.title}>Admin Panel</h2>
      <p className={styles.userCount}>Usuarios conectados: {connectedUsers}</p>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={startGame}>Jugar</button>
        <button className={styles.button} onClick={votePhase}>Comenzar Votación</button>
        <button className={styles.button} onClick={endPhase}>Terminar Juego</button>
        <button className={styles.button} onClick={reset}>Reset</button>
      </div>

      <div className={styles.answersGrid}>
        {answersArr.map((answer, i) => (
          <div key={i} className={styles.answerCard}>
            <div className={styles.answerText}>{answer.answer}</div>
            <div className={styles.voteCount}>Votos: {votesArr[i] || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
