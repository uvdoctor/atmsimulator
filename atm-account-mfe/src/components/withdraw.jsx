import React, { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import TransactAgain from "./transactagain";
import Link from "next/link";

export default function Balance() {
  const [errorText, setErrorText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const handleWithdraw = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);
    const formData = new FormData(event.currentTarget);
    const amount = formData.get("amount");
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reqAmt: amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewBalance(data?.newBalance);
        setWithdrawAmt(data?.withdrawAmt);
        sendGAEvent("event", "cash-withdrawal", {
          value: "User has withdrawn cash",
        });
      } else {
        setErrorText(data?.message);
        sendGAEvent("event", "cash-withdrawal-user-error", {
          value: "User failed to withdraw cash due to user error",
        });
      }
    } catch (e) {
      setErrorText(
        "An unexpected error occurred. Please try again after some time."
      );
      sendGAEvent("event", "cash-withdrawal-service-error", {
        value: "User failed to withdraw cash due to service error",
      });
    }
  };

  return (
    <div>
      {!withdrawAmt && !errorText ? (
        <form onSubmit={handleWithdraw}>
          <label>Please enter an amount in multiple of 10: </label>
          <br />
          <br />
          <input
            type="number"
            name="amount"
            placeholder="10"
            required
            autoComplete="off"
            step={10}
            min={10}
            max={500}
            className="input"
          />
          <span>&nbsp;pounds</span>
          <br />
          <br />
          <br />
          <br />
          <b>You can withdraw maximum 500 pounds.</b>
          <br />
          <br />
          <button type="submit" disabled={buttonDisabled} className="button">
            Withdraw
          </button>
          &nbsp;&nbsp;&nbsp;
          <Link href="http://localhost:3000">
            Cancel
          </Link>
        </form>
      ) : (
        <div>
          {withdrawAmt ? (
            <p>
              <label>You have withdrawn {withdrawAmt} pounds.</label>
              <br />
              <br />
              <label>New balance in your account is {newBalance} pounds.</label>
              <br />
              <br />
            </p>
          ) : (
                <p className="error">
                  <label className="error">{errorText}</label>
                  <br/><br/>
                </p>
          )}
          <TransactAgain />
        </div>
      )}
    </div>
  );
}
