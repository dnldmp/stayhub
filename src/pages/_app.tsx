import { ResarvationContextProvider } from "@/context/ReservationContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResarvationContextProvider>
      <Component {...pageProps} />
    </ResarvationContextProvider>
  );
}
