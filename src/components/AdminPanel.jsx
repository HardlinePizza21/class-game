import { useEffect, useState } from "react";
import socket from "../socket";

export default function AdminPanel() {
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    socket.on("users-count", (count) => {
      setConnectedUsers(count);
    });

    return () => socket.off("users-count");
    
  }, []);

  const startGame = () => {
    socket.emit("start-phase-2");
  };
  const votePhase = () => {
    socket.emit("votePhase");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Usuarios conectados: {connectedUsers}</p>
      <button onClick={startGame}>Jugar</button>
      <button onClick={votePhase}>Comenzar Votacion</button>
    </div>
  );
}
