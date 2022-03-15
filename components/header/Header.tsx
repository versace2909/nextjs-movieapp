import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <ul className={styles.menu}>
        <li>
          <Link href="/movies/">Movies</Link>
        </li>
        <li>Menu 1</li>
        <li>Menu 2</li>
      </ul>
    </header>
  );
};

export default Header;
