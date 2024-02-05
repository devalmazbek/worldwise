import Map from "../../components/map";
import Sidebar from "../../components/sidebar";

import styles from "./index.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
