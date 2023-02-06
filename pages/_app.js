import "../styles/globals.css";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import PublicLayout from "../components/layouts/PublicLayout";


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
        <PublicLayout>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </PublicLayout>
      </ThemeProvider>
    </DataProvider>
  );
}


export default MyApp;
