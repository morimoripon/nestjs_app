import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'nestjs_sample',
  description: 'nestjs_sample',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
