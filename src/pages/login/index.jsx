import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageNav from "../../components/page-nav";
import styles from "./index.module.css";
import { useAuth } from "../../contexts/AuthContext";
import Message from "../../components/message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app");
    },
    [isAuthenticated, navigate]
  );

  const isError = error ? (
    <Message message={"please enter correct user and password"} />
  ) : null;

  return (
    <main className={styles.login}>
      <PageNav />
      {isError}
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
