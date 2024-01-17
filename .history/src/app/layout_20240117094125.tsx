import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'My Apps',
    description: 'desc',
    icons: {
        icon: "/myFavicon.svg",
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
                {children}
            </section>
            <footer>
                footer
            </footer>
        </body>
    </html>
  )
}
