import React, { FC } from "react";
import styles from "./header.module.css";

const Header: FC = (): React.ReactElement => {
    return (
        <div className={styles.container}>
            <img
                src="/flappy_bird.svg"
                width="100"
                height="100"
                className={styles.logo}
            />
            <h1 className={styles.title}>Flappy Bird</h1>
        </div>
    );
};

export default Header;
