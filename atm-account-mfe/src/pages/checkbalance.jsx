import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Balance from "@/components/balance";
import Header from "@/components/header";
import TransactAgain from '@/components/transactagain';
  
export default function CheckBalance() {
  
  return (
    <>
      <Head>
        <title>Check Account Balance</title>
        <meta name="description" content="Check balance of an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className={styles.center}>
        <Balance />
        <br /><br/>
          <TransactAgain />
          </div>
      </main>
    </>
  );
}
