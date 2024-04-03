import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Withdraw from "@/components/withdraw";
import TransactAgain from '@/components/transactagain';

const inter = Inter({ subsets: ["latin"] });

export default function WithdrawCash() {
  
  return (
    <>
      <Head>
        <title>Withdraw Cash</title>
        <meta name="description" content="Withdraw cash from an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
          <Withdraw />
        <TransactAgain />
      </main>
    </>
  );
}
