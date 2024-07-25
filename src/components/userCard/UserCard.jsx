import styles from "./index.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LogoutButton from "../logoutButton";

const UserCard = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${session.user.id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data.data));
  }, []);

  return (
    <div className={styles.UserCard}>
      <h1>Welcome back!</h1>
      <h4>The following are your personal data</h4>
      <div className={styles.infoWrapper}>
        <div className={styles.userInfo}>
          <div>
            <p>
              Username: <span>{userData.username}</span>
            </p>
          </div>
          <div>
            <p>
              Name: <span>{userData.name}</span>
            </p>
          </div>
          <div>
            <p>
              Surname: <span>{userData.surname}</span>
            </p>
          </div>
          <div>
            <p>
              Personal ID: <span>{userData._id}</span>
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserCard;
