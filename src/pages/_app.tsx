import type { AppProps } from "next/app";
import { GlobalStyle } from "@/utils/GlobalStyle"
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <GlobalStyle />
      <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800;900&family=Yusei+Magic&display=swap" rel="stylesheet"></link>
      <title>annris PORTFORIO</title>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
