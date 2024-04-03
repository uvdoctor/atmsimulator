import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { sendGAEvent } from "@next/third-parties/google";

export default function Balance() {
  const [errorText, setErrorText] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [withdrawAmt, setWithdrawAmt] = useState("");
    const [newBalance, setNewBalance] = useState("");
    
    const handleWithdraw = async (event) => {
        event.preventDefault()
        setButtonDisabled(true);
        const formData = new FormData(event.currentTarget)
        const amount = formData.get('amount')
        const res = await fetch('/api/withdraw', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reqAmt: amount }),
        })
        const data = await res.json();
        if (res.ok) {
            sendGAEvent("event", "cash-withdrawal", { value: "User has withdrawn cash" });
            setNewBalance(data.newBalance);
            setWithdrawAmt(data.withdrawAmt);
        } else {
            sendGAEvent("event", "cash-withdrawal-error", { value: "User failed to withdraw cash" });
            setErrorText(data.message);
        }
    };

  return (
    <div>
      <p>
        Please enter an amount in pounds, which is multiple of 10. Maximum
        amount that can be withdrawn is 500 pounds.
      </p>
      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          name="amount"
          placeholder="10"
          required
          autoComplete="off"
        />
        <p>
          <button type="submit" disabled={buttonDisabled} className={styles.card}>
            Withdraw
          </button>
        </p>
      </form>
        <p>{errorText}</p>
          {withdrawAmt && <p>{`You have withdrawn ${withdrawAmt} pounds. New balance in your account is ${newBalance} pounds.`}</p>}
    </div>
  );
}
