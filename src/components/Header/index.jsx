import { Link, useLocation } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

import Logo from "../../assets/images/logo.png";

import styles from "./header.module.css";

export function Header() {
  const { pathname } = useLocation();

  console.log("Pathname", pathname);

  const isHome = pathname === "/";

  return (
    <header className={styles.header}>
      <img src={Logo} />

      {!isHome ? (
        <Link to="/">
          <CaretLeft weight="bold" />
          Voltar
        </Link>
      ) : null}
    </header>
  );
}
