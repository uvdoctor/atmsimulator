import React from 'react';
import styles from "@/styles/Header.module.css";
import Logo from "@/components/logo";

export default function Header() {
    return (
        <div className={styles.main}>
            <Logo />
            <h2 className={styles.description}>MyBank Oxford Branch ATM</h2>
       </div>
   ) 
}