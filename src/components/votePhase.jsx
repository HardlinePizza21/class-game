import { useEffect, useState } from "react";
import socket from "../socket";
import styles from "../assets/VotePhase.module.css";

export const VotePhase = ({ answers }) => {
  const [votes, setVotes] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    socket.on("voteUpdate", ({ index, count }) => {
      setVotes((prevVotes) => {
        const newVotes = [...prevVotes];
        newVotes[index] = count;
        return newVotes;
      });
    });

    return () => socket.off("voteUpdate");
  }, []);

  const handleClick = (index) => {
    if (!clicked) {
      socket.emit("vote", index);
      setClicked(true);
    }
  };

  return (
    <div className={styles.container}>
      {answers.map((answer, i) => (
        <div
          key={i}
          className={`${styles.card} ${clicked ? styles.disabled : ""}`}
          onClick={() => handleClick(i)}
        >
          <p className={styles.text}>{answer.answer}</p>
          <span className={styles.votes}>Votos: {votes[i] || 0}</span>
        </div>
      ))}
    </div>
  );
};
