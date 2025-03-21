import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="flex-grow container mx-auto px-0 md:px-6 py-4 md:py-8">{children}</main>
      <Footer />
    </div>
  )
}
