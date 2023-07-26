import Layout from '@/components/Layout'
import { UserContextProvider } from '@/contexts/User'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}
