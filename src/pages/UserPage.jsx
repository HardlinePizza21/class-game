import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import QuestionPhase from "../components/QuestionPhase";
import socket from "../socket";
import { VotePhase } from "../components/votePhase";

export default function UserPage() {
  const [phase, setPhase] = useState("waiting");

  socket.on("start-phase-2", () => {
    setPhase("questionPhase")
  })

  socket.on("votePhase", (answers) => {
    console.log(answers);
    setPhase("votePhase")
  })


  if(phase === "waiting"){
    return <LoadingScreen/>
  }else if(phase === "questionPhase"){
    return <QuestionPhase />
  }else if (phase == "votePhase"){
    return <VotePhase/>
  }else {
    return <>Como putas llegaste aqui???</>
  }


}
