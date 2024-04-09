import { GoogleAnalytics } from '@next/third-parties/google'
//@ts-ignore
import styles from "@/styles/Home.module.css";
import Login from '@/components/login';
import Head from 'next/head';
import Header from '@/components/header';

interface HomeProps {
  isProduction: boolean
}

export const getStaticProps = (async () => {
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
      <main>
        <Header />
        <div className={styles.center}>
          <Login /> 
        </div>
        {/* @ts-ignore */}
        {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </main>
    </>
  );
}
