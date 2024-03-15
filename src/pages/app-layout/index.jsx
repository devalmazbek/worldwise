import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Map from "../../components/map";
import Sidebar from "../../components/sidebar";
import User from "../../components/user";

import styles from "./index.module.css";

export default function AppLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  if (!isAuthenticated) return null;

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
