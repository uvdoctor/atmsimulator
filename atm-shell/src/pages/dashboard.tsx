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
//@ts-ignore
import Header from "header/headerwithlogo";

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
