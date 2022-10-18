import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <ThemeProvider attribute="class">
        <Layout>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Layout>
      </ThemeProvider>
    </DataProvider>
  );
}

export default MyApp;
