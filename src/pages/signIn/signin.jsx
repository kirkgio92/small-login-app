import { getSession } from "next-auth/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./index.module.scss";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.SignIn}>
      <h1>Sign In</h1>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
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
        <button className={styles.formButton} type="submit">
          Sign In
        </button>
      </form>
      <p className={styles.redirect}>
        Don't have an account? <a href="/signUp">Sign up</a>
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
