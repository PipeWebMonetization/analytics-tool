import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const colors = {
  pipewebmonetization: {
    black: "#191919",
    white: "#FFFDF8",
    yellow: "#FFC121",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
