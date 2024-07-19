import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services,clusterer&autoload=false`;
export default function Document() {
  return (
    <Html>
      <Head>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive"></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
