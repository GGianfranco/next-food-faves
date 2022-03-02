import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "../styles/ThemeChanger.module.css";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {theme == "dark" ? (
        <button
          className={styles.lightModeToggle}
          onClick={() => setTheme("light")}
        >
          ☀️
        </button>
      ) : (
        <button
          className={styles.darkModeToggle}
          onClick={() => setTheme("dark")}
        >
          🌑
        </button>
      )}
    </>
  );
};

export default ThemeChanger;
