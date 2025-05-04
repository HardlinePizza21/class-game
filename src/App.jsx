import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import useMode from "./hooks/useMode"
import { useEffect, useState } from "react";
import socket from "./socket";

function App() {

  const [mode, validatePassword] = useMode();
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    socket.emit("join");
  },[])

  if (!mode) {
    return (
      <div>
        <div>
          <button onClick={() => validatePassword(password)}>Entrar como Admin</button>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => validatePassword(password, "user")}>Entrar como Usuario</button>
      </div>
    );
  }

  if(mode == "admin"){
    return <AdminPage/>
  }else if(mode == "error"){
    return (
      <div>
        <div>
          <h1>No eres admin cabezon</h1>
          <button onClick={() => validatePassword(password)}>Entrar como Admin</button>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => validatePassword(password, "user")}>Entrar como Usuario</button>
      </div>
    );
  }else{
    return <UserPage/>
  }
}

export default App;
