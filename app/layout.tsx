import type { Metadata } from 'next'
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SpearCrest Digital — Marketing that compounds for service businesses',
  description:
    'SpearCrest Digital builds websites, runs Google Ads, and ranks service businesses on Google. Based in Louisville, KY. Serving owner-operators across the U.S.',
  metadataBase: new URL('https://spearcrestdigital.com'),
  openGraph: {
    title: 'SpearCrest Digital',
    description:
      'Marketing that compounds for service businesses. Websites, SEO, and Google Ads built for owner-operators.',
    url: 'https://spearcrestdigital.com',
    siteName: 'SpearCrest Digital',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpearCrest Digital',
    description:
      'Marketing that compounds for service businesses. Websites, SEO, and Google Ads.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}