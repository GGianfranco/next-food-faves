import type { NextPage } from "next";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import ThemeChanger from "../components/ThemeChanger";

const Header: NextPage = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Link href="/" passHref>
          <div className={styles.logo}>Food Faves</div>
        </Link>
      </div>
      <ThemeChanger />
    </header>
  );
};

export default Header;
