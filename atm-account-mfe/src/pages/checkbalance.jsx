import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useEffect, Suspense, useState } from "react";
import Loading from "@/components/loading";
import Balance from "@/components/balance";

const inter = Inter({ subsets: ["latin"] });
  
export default function CheckBalance({ data }) {
  
  return (
    <>
      <Head>
        <title>Check Account Balance</title>
        <meta name="description" content="Check balance of an account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Suspense fallback={<Loading />}>
          <Balance />
        </Suspense>
      </main>
    </>
  );
}
