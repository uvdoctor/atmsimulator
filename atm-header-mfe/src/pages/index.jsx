import Head from "next/head";
import HeaderWithLogo from "@/components/headerwithlogo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Header MFE</title>
        <meta name="description" content="MFE for account related capabilities" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderWithLogo />
      </main>
    </>
  );
}
