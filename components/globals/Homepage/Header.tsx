"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Snowflake, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (location.pathname !== "/") {
        window.location.href = href;
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <p className="text-center">Website Created by Neeraj</p>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Snowflake className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-lg md:text-xl font-bold text-black">
              Frost<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Link href="/admin">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
            <Link href="/book">
              <Button variant="snow" size="default">Book Now</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Admin</Button>
              </Link>
              <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" className="w-full">Book Now</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
