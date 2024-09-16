import styles from "./loading.module.css";

export function Loading() {
  return (
    <div className={styles.skeletons}>
      {Array.from({ length: 4 }).map((item) => (
        <div key={item} className={styles.skeleton}></div>
      ))}
    </div>
  );
}
