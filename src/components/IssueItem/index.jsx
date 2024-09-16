import { CaretRight } from "@phosphor-icons/react";

import styles from "./issue.module.css";

export function IssueItem(props) {
  const { title, url, user } = props;

  return (
    <li>
      <a
        className={styles["issues-list-item"]}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles["issues-info"]}>
          <strong>{title}</strong>
          <span>{user}</span>
        </div>
        <CaretRight size={16} color="#C9C9D4" />
      </a>
    </li>
  );
}
