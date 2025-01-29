import { Home, User, Briefcase, FileText } from 'lucide-react';
import { NavBar } from "./tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '/work', icon: Briefcase },
    { name: 'Shop', url: '/shop', icon: FileText }
  ];

  return <NavBar items={navItems} />;
}

export { NavBarDemo };