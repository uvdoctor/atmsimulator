import React from 'react';
import Link from "next/link";

export default function CashButton() {
    return (
        <Link href={'/withdrawcash'}>
            <h2>
                Withdraw Cash
            </h2>
        </Link>
    )
}