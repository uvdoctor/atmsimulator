import Head from "next/head";
import styles from "@/styles/Home.module.css";
import BalanceButton from "@/components/balancebutton";
import CashButton from "@/components/cashbutton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Account MFE</title>
        <meta name="description" content="MFE for account related capabilities" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <BalanceButton />
        <CashButton />
      </main>
    </>
  );
}
