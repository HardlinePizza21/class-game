import { useEffect, useState } from "react";
import socket from "../socket";

export default function AdminPanel() {
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [answersArr, setAnswersArr] = useState([]);
  const [votesArr, setVotesArr] = useState([]); // Estado para los votos

  useEffect(() => {
    socket.on("users-count", (count) => {
      setConnectedUsers(count);
    });

    return () => socket.off("users-count");
  }, []);

  useEffect(() => {
    socket.on("votePhaseUsers", ({ answers }) => {
      setAnswersArr(answers);
      setVotesArr(new Array(answers.length).fill(0)); // Inicializa los votos en 0
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

  const startGame = () => {
    socket.emit("start-phase-2");
  };

  const votePhase = () => {
    socket.emit("votePhase");
  };

  const endPhase = () => {
    socket.emit("endPhase");
  };

  const reset = () => {
    socket.emit("reset");
  };

  return (
    <>
      <div>
        <h2>Admin Panel</h2>
        <p>Usuarios conectados: {connectedUsers}</p>
        <button onClick={startGame}>Jugar</button>
        <button onClick={votePhase}>Comenzar Votacion</button>
        <button onClick={endPhase}>Terminar Juego</button>
        <button onClick={reset}>reset</button>
      </div>

      {answersArr.map((answer, i) => (
        <h1 key={i}>
          {answer.answer} - Votes: {votesArr[i] || 0}
        </h1>
      ))}
    </>
  );
}
