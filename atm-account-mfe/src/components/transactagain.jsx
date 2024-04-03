import React from 'react';
import Link from 'next/link';
import styles from "@/styles/Home.module.css";

export default function TransactAgain() {
    return (
        <Link href={"http://localhost:3000"}
              className={styles.card}>
            <h2>
                Transact again
            </h2>
        </Link>
    )
}