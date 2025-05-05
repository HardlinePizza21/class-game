import React from "react";
import '../assets/EndPhase.css';

export const EndPhase = ({ answers }) => {
  const sortedAnswers = [...answers].sort((a, b) => b.votes - a.votes);

  return (
    <div className="endPhaseContainer">
      <div className="answersGrid">
        {sortedAnswers.map((answer, i) => (
          <div key={i} className="answerCard">
            <div className="answerText">{answer.answer}</div>
            <div className="voteCount">{answer.votes} votos</div>
          </div>
        ))}
      </div>
    </div>
  );
};
