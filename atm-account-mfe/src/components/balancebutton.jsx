import React from 'react';
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function BalanceButton() {
    return (
        <Link href={'/checkbalance'}
              className={styles.card}>
            <h2>
                Check account balance
            </h2>
        </Link>
    )
}