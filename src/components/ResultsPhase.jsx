
export const EndPhase = ({answers}) => {

    return(

        <>
            {
                answers.map((answer,i) => <div key={i}>{answer.answer}</div>)
            }

        </>

    )
}