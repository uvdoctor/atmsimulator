import React, { useEffect, useState } from 'react';

export default function Balance() {
    const [loading, setLoading] = useState(true);
    const [accountNum, setAccountNum] = useState("");
    const [balance, setBalance] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/withdraw', {
        method: 'POST'
    })
      .then((res) => res.json())
        .then((data) => {
            setAccountNum(data?.account);
            setBalance(data?.balance);
            setMessage(data?.message);
            setLoading(false);
        });
    }, [setLoading, setAccountNum, setBalance, setMessage]);

    return (
        !loading ? <p>
            {accountNum && balance && `Account ${account} has balance of ${balance} pounds`}
            {message && `${message}`}
        </p> : null
    );
}