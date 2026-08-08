import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'João Victor Macedo Neves',
  description: 'Backend Developer — Java · Golang · Kotlin',
  openGraph: {
    title: 'João Victor Macedo Neves',
    description: 'Backend Developer — Java · Golang · Kotlin',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}