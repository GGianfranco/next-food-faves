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
        <div className={styles.navigation}>
          <Link href="/about" passHref>
            <div className={styles.nav}>Our story</div>
          </Link>
          <Link href="/sign-in" passHref>
            <div className={styles.nav}>Sign In</div>
          </Link>
          <Link href="/sign-up" passHref>
            <div className={styles.getStarted}>Add Food Fave</div>
          </Link>
        </div>
      </div>
      <ThemeChanger />
    </header>
  );
};

export default Header;
