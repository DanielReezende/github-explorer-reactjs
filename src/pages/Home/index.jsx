import { useCallback, useState } from "react";
import { Loading } from "../../components/Loading";
import { RepositoryItem } from "../../components/RepositoryItem";

import styles from "./home.module.css";
import { api } from "../../services/api";

export function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  function handleChangeSearchValue(e) {
    setSearchValue(e.target.value);
  }

  async function handleSubmit(e) {
    setIsLoading(true);

    e.preventDefault();

    const { data } = await api.get(
      `/search/repositories?q=${searchValue}+in%3Aname`
    );

    setIsLoading(false);

    setSearchValue("");

    const repos = data.items.map((item) => ({
      fullName: item.full_name,
      description: item.description,
      owner: {
        name: item.owner.login,
        avatarUrl: item.owner.avatar_url,
      },
    }));

    setRepositories(repos);
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>
        Explore repositórios
        <br /> no Github.
      </h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={searchValue}
          onChange={handleChangeSearchValue}
          placeholder="Digite aqui"
        />
        <button type="submit">Pesquisar</button>
      </form>

      <main className={styles["repository-list"]}>
        {isLoading && <Loading />}

        {repositories.length > 0 && (
          <ul>
            {repositories.map((repository) => (
              <RepositoryItem
                key={repository.fullName}
                fullName={repository.fullName}
                description={repository.description}
                owner={repository.owner}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
