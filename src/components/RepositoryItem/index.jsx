import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";

import styles from "./repository.module.css";

export function RepositoryItem(props) {
  const { fullName, description, owner } = props;

  return (
    <li>
      <Link
        className={styles["repos-list-item"]}
        to={`/repository/${fullName}`}
      >
        <div className={styles["repo-wrapper"]}>
          <img src={owner?.avatarUrl} alt={owner?.name} />
          <div className={styles["repos-info"]}>
            <strong>{fullName}</strong>
            <span>{description}</span>
          </div>
        </div>
        <CaretRight size={20} color="#C9C9D4" />
      </Link>
    </li>
  );
}
