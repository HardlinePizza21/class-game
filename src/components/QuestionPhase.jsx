import { useEffect, useState } from "react";
import  socket  from "../socket";

export default function QuestionPhase() {

  const [inputValue, setInputValue] = useState("");
  const [answerCounter, setAnswerCounter] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function handleSend() {
    if (inputValue.trim() !== "") {
      socket.emit("sendAnswer", inputValue); // Envía la respuesta por el socket
      setInputValue(""); // Vacía el input
      setIsButtonDisabled(true); // Bloquea el botón de enviar
    }
  }

  useEffect(() => {
    socket.on("answers-count", (count) => {
      setAnswerCounter(count);
    });
    return () => socket.off("answers-count");
  }, []);


    return (
      <div>
        <h2>Problema x</h2>
        <p>Escribe tu requisito</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isButtonDisabled}
        />
        <button
          onClick={handleSend}
          disabled={isButtonDisabled}
        >
          Enviar
        </button>

        <div>Respuestas enviadas: {answerCounter}</div>

      </div>
    );


  }
  