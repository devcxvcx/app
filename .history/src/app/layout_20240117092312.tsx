import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: '타이틀',
    description: 'desc',
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
                <article>{children}</article>
            </section>
            <footer>
                footer
            </footer>
        </body>
    </html>
  )
}
