import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import useMode from "./hooks/useMode";
import { useState } from "react";
import styles from './assets/App.module.css'; // ✅ Importar como módulo

function App() {
  const [mode, validatePassword] = useMode();
  const [password, setPassword] = useState('');

  if (!mode) {
    return (
      <div className={styles.centerScreen}> {/* ✅ clase de centrado */}
        <div className={styles.container}>
          <button 
            onClick={() => validatePassword(password, "user")}
            className={styles.buttonUser}  
          >
            Entrar como Usuario

          </button>
          <button onClick={() => validatePassword(password)}>Entrar como Admin</button>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (mode === "admin") {
    return <AdminPage />;
  } else if (mode === "error") {
    return (
      <div className={styles.centerScreen}>
        <div className={styles.container}>
          <h1>No eres admin cabezón</h1>
          <button 
            onClick={() => validatePassword(password)}
            className={styles.buttonAdmin}  
          >Entrar como Admin</button>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="perro" onClick={() => validatePassword(password, "user")}>Entrar como Usuario</button>
        </div>
      </div>
    );
  } else {
    return <UserPage />;
  }
}

export default App;
