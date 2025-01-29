import { RainbowButton } from "@/components/ui/rainbow-button"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"

export function RainbowButtonDemo() {
  return <RainbowButton>Get Unlimited Access</RainbowButton>;
}

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]

  return <NavBar items={navItems} />
}