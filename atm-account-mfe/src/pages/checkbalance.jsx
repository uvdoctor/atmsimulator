import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Balance from "@/components/balance";
import TransactAgain from '@/components/transactagain';

const inter = Inter({ subsets: ["latin"] });
  
export default function CheckBalance() {
  
  return (
    <>
      <Head>
        <title>Check Account Balance</title>
        <meta name="description" content="Check balance of an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
          <Balance />
        <TransactAgain />
      </main>
    </>
  );
}
