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
        console.log("Going to remove cookie");
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
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
      </div>
      <button onClick={handleDone}>Done</button>
        {/* @ts-ignore */}
        {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </main>
  );
}
