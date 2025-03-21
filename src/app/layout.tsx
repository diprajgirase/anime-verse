import { poppins } from '@/fonts'
import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/providers'

interface IMetaData extends Metadata {
  'google-adsense-account': string
}

export const metadata: IMetaData = {
  title: 'AnimeVerse',
  description: 'Watch anime here',
  'google-adsense-account': process.env.GOOGLE_ADSENSE as string,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <meta name="google-adsense-account" content="ca-pub-3554837885726481" />
      <body className={`${poppins.className}  antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
