import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
     AOS.init({
    offset: 200, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000 // values from 0 to 3000, with step 50ms
  });
  }, []);
 
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


export default appWithTranslation (MyApp);
