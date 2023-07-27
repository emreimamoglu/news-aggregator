import Layout from '@/components/Layout'
import { UserContextProvider } from '@/contexts/User'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SnackbarProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </SnackbarProvider>
  )
}
