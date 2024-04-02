import Image from "next/image";
import { revalidate } from '@module-federation/nextjs-mf/utils';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from "next/font/google";
//@ts-ignore
import Description from "balance/description";
import styles from "@/styles/Home.module.css";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface DashboardProps {
  isProduction: boolean
}

export const getStaticProps = (async (context: NextPageContext) => {
  if (context?.pathname && !context?.pathname?.endsWith('_error')) {
    await revalidate().then((shouldUpdate) => {
      if (shouldUpdate) {
        console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
      }
    });
  }
  const isProduction = process.env.NODE_ENV === "production";
  return { props: {isProduction} };
});

export default function Dashboard({ isProduction }: DashboardProps) {
  const router = useRouter();
  const { logout } = useAuth();
  
  async function handleDone() {
        logout();
        router.replace('/');
        await fetch('/api/logout', {
            method: 'POST'
        });
  }
  
  return (
      <main className={`${styles.main} ${inter.className}`}>
          {/* <div className={styles.description}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div> */}

        {/* <Description /> */}
        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          /> 
          
        </div> */}
        <div className={styles.grid}>
          <button
              className={styles.card}
            onClick={() => {console.log("button clicked")}}>
            <h2>
                Check account balance
              </h2>
            </button>

            <button
              className={styles.card}
              onClick={() => {console.log("button clicked")}}
            >
              <h2>
                Withdraw cash
              </h2>
            </button>
        </div>
          <button className={styles.card} onClick={handleDone}>
            <h2>Done</h2>
          </button>
        {/* @ts-ignore */}
        {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </main>
  );
}
