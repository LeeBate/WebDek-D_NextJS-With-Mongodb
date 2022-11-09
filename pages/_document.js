import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document{
    render(){
        return(
            <Html lang="en">
                <Head>
                    <meta name="description" content="CALLLAB website with Next.js"/>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                    <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
                    <link ref="stylesheet" href="https://cdnjs.cloudflare.com/ajax/lib/meyer-reset-2.0/reset.min.css"/>
                    <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>
                    
                    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
                    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>

                </Head>
                <body>
                    <Main />
                    <NextScript />

                </body>
            </Html>
        )
    }
}

export default MyDocument