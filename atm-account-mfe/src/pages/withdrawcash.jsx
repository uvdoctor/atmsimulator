import Head from "next/head";
import Withdraw from "@/components/withdraw";
import Header from "header/headerwithlogo";
import styles from "@/styles/Home.module.css";

export default function WithdrawCash() {
  
  return (
    <>
      <Head>
        <title>Withdraw Cash</title>
        <meta name="description" content="Withdraw cash from an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className={styles.center}>
          <Withdraw />
          </div>
      </main>
    </>
  );
}
