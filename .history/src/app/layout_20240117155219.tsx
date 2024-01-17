import type { Metadata } from 'next'
import './_styles/globals.css'
import {CookiesProvider} from 'react-cookie';
import RecoilRootProvider from './_utils/recoilRootProvider'
import Header from '@components/Header'

export const metadata: Metadata = {
    title: 'My Apps',
    description: 'desc',
    icons: {
        icon: "/favicon.png",
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRootProvider>
    <html lang="en">
        <body>
            <Header />
            <section>
                {children}
            </section>
            <footer>
                footer
            </footer>
        </body>
    </html>
    </RecoilRootProvider>
  )
}
