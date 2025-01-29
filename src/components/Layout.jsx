import { ReactNode } from 'react'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-secondary">
      <ScrollToTop />
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  )
} 