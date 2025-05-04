import { useEffect, useState } from "react";
import socket from "../socket";

export const VotePhase = ({answers}) => {

    const [clicked, setClicked] = useState(false);

    return(

        <>
        {
            answers.map((answer, i) => {

                const [votes, setVotes] = useState(0);

                const handleClick = () => {

                    if(!clicked){
                        socket.emit('vote', i);
                        setClicked(true);
                    }
                    // Assuming you have a socket instance available
                };

                useEffect(() => {
                    // Assuming you have a socket instance available
                    socket.on('voteUpdate', ({ index, count }) => {
                        
                        if (index === i) {
                            setVotes(count);
                        }
                    });

                    return () => {
                        socket.off('voteUpdate');
                    };
                }, [i]);

                return (
                    <h1 
                        key={i} 
                        onClick={handleClick} 
                        style={{ cursor: 'pointer' }}
                    >
                        {answer.answer} - Votes: {votes}
                    </h1>
                );
            })
        }

        </>

    )
}