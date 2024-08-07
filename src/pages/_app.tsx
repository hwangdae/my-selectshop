import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModalMap from "@/components/ModalMap";

const queryClient = new QueryClient();

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router)
  const [modalType, setModalType] = useState<string | null>(null);

  useEffect(()=>{
    const handleRouteChange = (url:string) => {
    const modalQueryParam = new URLSearchParams(url.split('?')[1]).get('modal');
    setModalType(modalQueryParam)
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
        <main className={notoSansKr.className}>
          <Component {...pageProps} />
          {ModalComponent && <ModalComponent onClose={closeModal} />}
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
