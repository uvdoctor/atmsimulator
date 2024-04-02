import React from 'react';
//@ts-ignore
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function CashButton() {
    return (
        <Link href={'/withdrawcash'}
              className={styles.card}>
            <h2>
                Withdraw cash
            </h2>
        </Link>
    )
}