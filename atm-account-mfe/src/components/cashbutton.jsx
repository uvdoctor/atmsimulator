import React from 'react';
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function CashButton() {
    return (
        <Link href={'/withdrawcash'}
            className={styles.card}>
            <h2>
                Withdraw Cash
            </h2>
        </Link>
    )
}