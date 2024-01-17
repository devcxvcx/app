import type { Metadata } from 'next'
import './_styles/globals.css'

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
                {children}
            </section>
            <footer>
                footer
            </footer>
        </body>
    </html>
  )
}
