import React, { useEffect, useState } from 'react';
import { sendGAEvent } from "@next/third-parties/google";

export default function Balance() {
    const [loading, setLoading] = useState(true);
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
            setLoading(false);
            sendGAEvent("event", "check-balance", { value: "User has inquired for account balance" });
        });
    }, [setLoading, setAccountNum, setBalance, setMessage]);

    return (
        !loading ? <p>
            {accountNum && balance && `Account ${accountNum} has balance of ${balance} pounds`}
            {message && `${message}`}
        </p> : null
    );
}