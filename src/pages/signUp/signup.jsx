import { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, surname }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setMessage("Account created successfully! Please sign in.");
    }
  };

  return (
    <div className={styles.SignUp}>
      <h1>Sign Up</h1>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <p>Name:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>Surname:</p>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className={styles.errorMsg} style={{ color: "red" }}>
            {error}
          </p>
        )}
        {message && (
          <p className={styles.errorMsg} style={{ color: "green" }}>
            {message}
          </p>
        )}
        <button className={styles.formButton} type="submit">
          Sign Up
        </button>
      </form>
      <p className={styles.redirect}>
        Already have an account? <Link href="/signIn">Sign In</Link>
      </p>
    </div>
  );
}
