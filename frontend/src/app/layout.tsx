import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abdullah Sezdi | Jr. Data Scientist & ML Enthusiast',
  description: 'Yapay zeka ve veri bilimi tutkusuyla, karmaşık problemlere yenilikçi çözümler üreten Jr. Data Scientist. Machine Learning, Deep Learning ve Data Analytics alanlarında projeler geliştiriyorum.',
  keywords: ['data science', 'machine learning', 'deep learning', 'artificial intelligence', 'python', 'tensorflow', 'data analytics', 'veri bilimi', 'yapay zeka'],
  authors: [{ name: 'Abdullah Sezdi' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://abdullahsezdi.com',
    siteName: 'Abdullah Sezdi',
    title: 'Abdullah Sezdi | Jr. Data Scientist & ML Enthusiast',
    description: 'Yapay zeka ve veri bilimi tutkusuyla, karmaşık problemlere yenilikçi çözümler üreten Jr. Data Scientist.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abdullah Sezdi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Sezdi | Jr. Data Scientist & ML Enthusiast',
    description: 'Yapay zeka ve veri bilimi tutkusuyla, karmaşık problemlere yenilikçi çözümler üreten Jr. Data Scientist.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
