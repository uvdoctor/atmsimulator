import React from 'react';
import Link from "next/link";

export default function BalanceButton() {
    return (
        <Link href={'/checkbalance'}>
            <h2>
                Check account balance
            </h2>
        </Link>
    )
}