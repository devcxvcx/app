import type { Metadata } from 'next'
import './_styles/globals.css'
import {CookiesProvider} from 'react-cookie';
import RecoilRootProvider from './_utils/recoilRootProvider'

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
    <html lang="en">
        <body>
            <header>
                header
                <nav>
                    nav
                </nav>
            </header>
            <section>
    <RecoilRootProvider>
                {children}
    </RecoilRootProvider>
            </section>
            <footer>
                footer
            </footer>
        </body>
    </html>
  )
}
