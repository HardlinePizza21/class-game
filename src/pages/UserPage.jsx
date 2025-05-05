import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import QuestionPhase from "../components/QuestionPhase";
import socket from "../socket";
import { VotePhase } from "../components/votePhase";
import { EndPhase } from "../components/ResultsPhase";

export default function UserPage() {
  const [phase, setPhase] = useState("waiting");
  const [answersArr, setAnswersArr] = useState([]);

  useEffect(()=> {
    socket.emit("join");
  },[])


  socket.on("start-phase-2", () => {
    setPhase("questionPhase")
  })

  socket.on("votePhaseUsers", ({answers}) => {
    setAnswersArr(answers)
    setPhase("votePhase")
  })
  socket.on("endPhaseUsers", ({answers}) => {
    setAnswersArr(answers)
    setPhase("endPhase")
  })
  socket.on("resetEvent", () => {
    setAnswersArr([])
    setPhase("waiting")
  })


  if(phase === "waiting"){
    return <LoadingScreen/>
  }else if(phase === "questionPhase"){
    return <QuestionPhase />
  }else if (phase == "votePhase"){
    return <VotePhase answers={answersArr} />
  }else if(phase == "endPhase"){
    return <EndPhase answers={answersArr} />
  }else {
    return <>Como putas llegaste aqui???</>
  }


}
