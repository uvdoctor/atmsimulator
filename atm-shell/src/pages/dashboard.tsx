import { revalidate } from '@module-federation/nextjs-mf/utils';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from "next/font/google";
//@ts-ignore
import BalanceButton from "account/balancebutton";
//@ts-ignore
import CashButton from "account/cashbutton";
import styles from "@/styles/Home.module.css";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/header";
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

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
      <main>
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
      <Header />
      <div className={styles.center}>
       
          <BalanceButton />
        <br/><br/>
          <CashButton />
        <br/><br/>
          <button className="button" onClick={handleDone}>
            <h2>Done</h2>
        </button>
        </div>
        {/* @ts-ignore */}
        {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </main>
  );
}
