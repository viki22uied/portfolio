import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Vignesh Kumar U | Quant Researcher · AI Engineer · FinTech Builder',
  description: 'Quant researcher at WorldQuant (Gold Level). IEEE published. IQC 2026 Top 20% globally — 80,000+ participants, 142 countries. SEBI Top 30 National. Building at the intersection of finance, AI, and data engineering.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Vignesh Kumar U | Quant Researcher · AI Engineer · FinTech Builder',
    description: 'Quant researcher at WorldQuant (Gold Level). IEEE published. IQC 2026 Top 20% globally — 80,000+ participants, 142 countries.',
    siteName: 'Vignesh Kumar U',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vignesh Kumar U | Quant Researcher · AI Engineer · FinTech Builder',
    description: 'Quant researcher at WorldQuant (Gold Level). IEEE published. IQC 2026 Top 20% globally. SEBI Top 30 National.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

