import AppNavbar from "../app-navbar";
import Logo from "../logo";
import Footer from "../footer";

import styles from "./index.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavbar />
      <p>list of cities</p>
      <Footer />
    </div>
  );
}
