import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalMap from "@/components/ModalMap";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/defaultTheme";

const queryClient = new QueryClient();

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [modalType, setModalType] = useState<string | null>(null);

  useEffect(()=>{
    const handleRouteChange = (url:string) => {

    const modalQueryParam = new URLSearchParams(url.split('?')[1]) // size는 쿼리 스트링의 갯수를 나타냄
    const param = modalQueryParam?.get('modal')
 
    setModalType(param)
    }
    router.events.on('routeChangeStart',handleRouteChange);
    return () => {
      router.events.off('routeChangeStart',handleRouteChange)
    }
  },[router.events])

  const closeModal = () => {
    router.push(router.pathname, undefined, { shallow: true });
    setModalType(null);
  };

  const ModalComponent = modalType ? ModalMap[modalType] : null;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
        <main className={notoSansKr.className}>
          <Component {...pageProps} />
          {ModalComponent && <ModalComponent onClose={closeModal} />}
        </main>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
