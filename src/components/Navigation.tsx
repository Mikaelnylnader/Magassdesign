import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { Button } from './ui/Button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <nav className="fixed w-full z-50 bg-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl font-bold text-primary">
            Magass
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-accent">
              Home
            </Link>
            <Link to="/projects" className="text-primary hover:text-accent">
              Projects
            </Link>
            <Link to="/contact" className="text-primary hover:text-accent">
              Contact
            </Link>
            {user ? (
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-primary hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="block px-3 py-2 text-primary hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-primary hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 