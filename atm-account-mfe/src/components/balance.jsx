import React, { useEffect, useState } from 'react';
import { sendGAEvent } from "@next/third-parties/google";

export default function Balance() {
    const [accountNum, setAccountNum] = useState("");
    const [balance, setBalance] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/balance')
            .then((res) => res.json())
                .then((data) => {
                    setAccountNum(data?.account);
                    setBalance(data?.balance);
                    setMessage(data?.message);
                    sendGAEvent("event", "check-balance", { value: "User has inquired for account balance" });
        });
    }, [setAccountNum, setBalance, setMessage]);

    return (
        <p>
            {accountNum && balance && `Account ${accountNum} has balance of ${balance} pounds`}
            {message && `${message}`}
        </p>
    );
}