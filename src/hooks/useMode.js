import { useEffect, useState } from "react";
import socket from '../socket'

export const useMode = () => {
    
    const [mode, setMode] = useState();

    useEffect(() => {

        socket.on("validacion", (resp) => {
          
            if(resp == "ok"){
                setMode("admin")
            }else {
                setMode("error")
            }

        });
    
        return () => socket.off("users-count");
      }, []);


    const validatePassword = async(password, mode) => {
    
        if(mode == "user"){
            setMode("user");
        }else {
            socket.emit("validar", password)
        }

        
    }



    // useEffect(async() => {

    // },[])

    return [mode, validatePassword]

}

export default useMode;