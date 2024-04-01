import { Html, Head, Main, NextScript } from "next/document";
import { revalidate } from '@module-federation/nextjs-mf/utils';

//@ts-ignore
export const getStaticProps = (async (context: any) => {
  if (context?.pathname && !context?.pathname?.endsWith('_error')) {
    await revalidate().then((shouldUpdate) => {
      if (shouldUpdate) {
        console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
      }
    });
  }
  return {props: {}, revalidate: 10};
});

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
