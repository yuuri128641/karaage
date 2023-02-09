import type { AppProps } from "next/app";
import { GlobalStyle } from "@/utils/GlobalStyle"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>    
  );
}
