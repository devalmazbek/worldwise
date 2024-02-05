import AppNavbar from "../app-navbar";
import Logo from "../logo";
import Footer from "../footer";

import styles from "./index.module.css";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
