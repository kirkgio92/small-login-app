import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true });
    router.push("/signIn");
  };

  if (!session) return null;

  return (
    <button className={styles.button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
