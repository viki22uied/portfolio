import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Vignesh Kumar U | Data Analyst — Finance & AI',
  description: 'Final-year Data Science & Engineering student. IEEE published researcher, Mumbai Hacks Top 100, and Tata Crucible Karnataka Cluster Finalist. Building analytics pipelines, fraud detection systems, and AI-driven applications.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Vignesh Kumar U | Data Analyst — Finance & AI',
    description: 'Final-year Data Science & Engineering student. IEEE published researcher, Mumbai Hacks Top 100, and Tata Crucible Karnataka Cluster Finalist. Building analytics pipelines, fraud detection systems, and AI-driven applications.',
    siteName: 'Vignesh Kumar U',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vignesh Kumar U | Data Analyst — Finance & AI',
    description: 'IEEE published researcher. Mumbai Hacks Top 100. Building analytics pipelines, fraud detection, and AI-driven applications.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

