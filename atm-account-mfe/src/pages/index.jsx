import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import BalanceButton from "@/components/balancebutton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Account Balance MFE</title>
        <meta name="description" content="MFE to display account balance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <BalanceButton />
      </main>
    </>
  );
}
