import styles from '../assets/LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Esperando a que se unan más jugadores...</p>
    </div>
  );
}
