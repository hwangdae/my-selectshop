import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import {RecoilRoot} from 'recoil'

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main className={notoSansKr.className}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  );
}
