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
    <RecoilRootProvider>
    <html lang="en">
        <body>1
        </body>
    </html>
    </RecoilRootProvider>
  )
}
