import React from 'react';
import styles from "@/styles/Header.module.css";
import Logo from "@/components/logo";

export default function HeaderWithLogo() {
    return (
        <div className={styles.main}>
            <Logo />
            <h2 className={styles.description}>MyBank ATM</h2>
       </div>
   ) 
}