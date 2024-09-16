import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { IssueItem } from "../../components/IssueItem";

import styles from "./repository.module.css";
import { api } from "../../services/api";

export function Repository() {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [isLoadingRepository, setIsLoadingRepository] = useState(false);
  const [isLoadingIssues, setIsLoadingIssues] = useState(false);
  const { owner, repo } = useParams();

   useEffect(() => {
    setIsLoadingRepository(true);

    api
      .get(`/repos/${owner}/${repo}`)
      .then((response) => {
        const {
          message,
          description,
          forks_count,
          open_issues_count,
          owner,
          stargazers_count,
        } = response.data;

        if (message) {
          return alert(message);
        }

        setRepository({
          description,
          forks: forks_count,
          openIssues: open_issues_count,
          owner: {
            avatarUrl: owner.avatar_url,
          },
          stars: stargazers_count,
        });
      })
      .catch(() =>
        alert("Você provavelmente ultrapassou o limite de requisições.")
      )
      .finally(() => setIsLoadingRepository(false));
  }, [owner, repo]);

  useEffect(() => {
    setIsLoadingIssues(true);

    fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
      .then((response) => response.json())
      .then((data) => {
        const newIssues = data.map((issue) => ({
          owner: {
            login: issue.user.login,
          },
          title: issue.title,
          url: issue.html_url,
        }));

        setIssues(newIssues);
      })
      .catch(() =>
        alert("Você provavelmente ultrapassou o limite de requisições.")
      )
      .finally(() => setIsLoadingIssues(false));
  }, [owner, repo]);

  return (
    <div className={styles.repository}>
      <section className={styles["repository-info"]}>
        <header className={styles["repository-info-header"]}>
          <img src={repository?.owner?.avatarUrl} alt={owner} />

          <div className={styles["repository-info-description"]}>
            <strong>
              {owner}/{repo}
            </strong>
            <p>{repository?.description || "Sem descrição"}</p>
          </div>
        </header>

        <ul className={styles["repository-numbers"]}>
          <li className={styles["repository-number"]}>
            <strong>{repository?.stars}</strong>
            <span>Stars</span>
          </li>
          <li className={styles["repository-number"]}>
            <strong>{repository?.forks}</strong>
            <span>Forks</span>
          </li>
          <li className={styles["repository-number"]}>
            <strong>{repository?.openIssues}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </section>

      {isLoadingIssues && <Loading />}

      {issues.length > 0 ? (
        <ul className={styles["issues-list"]}>
          {issues.map((issue) => (
            <IssueItem
              key={issue?.url}
              title={issue?.title}
              url={issue?.url}
              user={issue?.owner?.login}
            />
          ))}
        </ul>
      ) : (
        <p>Sem issues</p>
      )}
    </div>
  );
}
