import { revalidate } from '@module-federation/nextjs-mf/utils';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from "next/font/google";
//@ts-ignore
import styles from "@/styles/Home.module.css";
import { NextPageContext } from 'next';
import Login from '@/components/login';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
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


export default function Home({ isProduction }: HomeProps) {
  return (
    <>
      <Head>
        <title>MyBank ATM</title>
        <meta name="description" content="MyBank ATM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Login /> 
        {/* @ts-ignore */}
        {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </main>
    </>
  );
}
