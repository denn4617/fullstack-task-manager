import React from "react";
import styles from "./NavBar.module.css";

interface NavBarProps {
  userName: string;
  userPic: string;
}

const NavBar: React.FC<NavBarProps> = ({ userName, userPic }) => {
  return (
    <header className={styles.navBar}>
      <div className={styles.userInfo}>
        <span>{userName}</span>
        <img src={userPic} alt="Profile" className={styles.profilePic} />
      </div>
    </header>
  );
};

export default NavBar;
