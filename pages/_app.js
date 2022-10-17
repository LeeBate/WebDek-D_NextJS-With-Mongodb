import '../styles/globals.css'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    
    <DataProvider>
      <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </DataProvider>
    
  )
}

export default MyApp
