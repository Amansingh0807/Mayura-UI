"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  Github, 
  Menu, 
  Star, 
  ArrowRight,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { useTheme } from "next-themes";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Use next-themes hook
  const { theme, setTheme } = useTheme();
  
  // Real-time GitHub stars
  const { loading, formattedStars } = useGitHubStars("Amansingh0807", "Mayura-UI");

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const themes = ["light", "dark", "system"] as const;
    const currentIndex = themes.findIndex(t => t === theme);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
  };

  const ThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />; // Default icon during SSR
    
    switch (theme) {
      case "light": return <Sun className="h-4 w-4" />;
      case "dark": return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-[#00aeaf]/20 shadow-lg shadow-[#00aeaf]/5" 
        : "bg-white/70 dark:bg-black/70 backdrop-blur-sm"
    )}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00aeaf]/5 via-transparent to-[#0c4bb2]/5 opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section - Optimized for all iPad sizes */}
          <Link href="/" className="group flex items-center space-x-2 lg:space-x-3 py-2 cursor-pointer">
            <div className="relative flex items-center justify-center min-w-[40px] min-h-[40px]">
              {/* Logo with better responsive sizing and zoom support */}
              <div className="relative overflow-hidden rounded-lg flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Mayura UI Logo" 
                  width={50} 
                  height={50}
                  className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 object-contain transition-transform duration-200 group-hover:scale-110"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                  priority
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00aeaf]/20 to-[#0c4bb2]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              </div>
            </div>
            
            {/* Brand text with perfect alignment and responsive sizing */}
            <div className="flex items-center space-x-1.5 lg:space-x-2">
              <span className="text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-[#008c9d] via-[#0c4bb2] to-[#00aeaf] bg-clip-text text-transparent transition-all duration-200 group-hover:from-[#00aeaf] group-hover:to-[#0c4bb2] whitespace-nowrap">
                Mayura UI
              </span>
              <Badge className="bg-[#00aeaf]/10 text-[#008c9d] border-[#00aeaf]/20 text-xs font-medium px-1.5 lg:px-2 py-0.5 hover:bg-[#00aeaf]/20 transition-colors duration-200 cursor-pointer">
                Beta
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced with better iPad support */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { href: "/components", label: "Components" },
              { href: "#", label: "Templates" },
              { href: "#", label: "Documentation" }
            ].map((item, index) => (
              <Link 
                key={`nav-${index}-${item.label}`}
                href={item.href} 
                className="relative px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0c4bb2] dark:hover:text-[#00aeaf] transition-all duration-200 rounded-lg group cursor-pointer"
              >
                <span className="relative z-10">{item.label}</span>
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00aeaf]/5 to-[#0c4bb2]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {/* Hover border effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#00aeaf]/20 rounded-lg transition-colors duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side actions - Enhanced styling with better iPad responsiveness */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Theme Toggle with custom colors */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 hover:bg-[#00aeaf]/10 hover:text-[#0c4bb2] transition-all duration-200 rounded-lg cursor-pointer"
            >
              <ThemeIcon />
            </Button>

            {/* GitHub Stars with real-time data - Hidden on tablets for better spacing */}
            <Link
              href="https://github.com/Amansingh0807/Mayura-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex cursor-pointer"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="space-x-2 border-[#00aeaf]/30 text-[#008c9d] hover:bg-[#00aeaf]/10 hover:border-[#00aeaf] hover:text-[#0c4bb2] transition-all duration-200 cursor-pointer"
              >
                <Star className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium">Star</span>
                <Badge className="bg-[#0c4bb2]/10 text-[#0c4bb2] border-0 ml-1 text-xs cursor-pointer">
                  {loading ? '...' : formattedStars}
                </Badge>
              </Button>
            </Link>

            {/* GitHub Icon - Show on tablets when Stars are hidden */}
            <Link
              href="https://github.com/Amansingh0807/Mayura-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex xl:hidden cursor-pointer"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 hover:bg-[#00aeaf]/10 hover:text-[#0c4bb2] transition-all duration-200 rounded-lg cursor-pointer"
              >
                <Github className="h-4 w-4" />
              </Button>
            </Link>

            {/* Get Started Button - Better responsive sizing */}
            <div className="hidden lg:block">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] hover:from-[#008c9d] hover:to-[#006b8f] text-white border-0 px-4 xl:px-6 py-2 font-medium transition-all duration-300 shadow-lg shadow-[#00aeaf]/25 hover:shadow-xl hover:shadow-[#0c4bb2]/30 cursor-pointer">
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-sm">Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#008c9d] to-[#006b8f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            {/* Mobile Menu - Enhanced for tablets */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 hover:bg-[#00aeaf]/10 hover:text-[#0c4bb2] transition-all duration-200 cursor-pointer"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-white dark:bg-black border-l border-[#00aeaf]/20">
                {/* Hidden title for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="p-6 border-b border-[#00aeaf]/10 bg-gradient-to-r from-[#00aeaf]/5 to-[#0c4bb2]/5">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image 
                          src="/logo.png" 
                          alt="Mayura UI Logo" 
                          width={32} 
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-[#008c9d] to-[#0c4bb2] bg-clip-text text-transparent">
                        Mayura UI
                      </span>
                      <Badge className="bg-[#00aeaf]/10 text-[#008c9d] border-[#00aeaf]/20 text-xs">
                        Beta
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Mobile/Tablet navigation */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-2">
                      {[
                        { href: "/components", label: "Components" },
                        { href: "#", label: "Templates" },
                        { href: "#", label: "Documentation" }
                      ].map((item, index) => (
                        <Link
                          key={`mobile-nav-${index}-${item.label}`}
                          href={item.href}
                          className="block py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#0c4bb2] dark:hover:text-[#00aeaf] hover:bg-[#00aeaf]/5 rounded-lg transition-all duration-200 cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Mobile/Tablet footer actions */}
                  <div className="p-6 border-t border-[#00aeaf]/10 space-y-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] hover:from-[#008c9d] hover:to-[#006b8f] text-white shadow-lg cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-[#00aeaf]/30 text-[#008c9d] hover:bg-[#00aeaf]/10 cursor-pointer" 
                        asChild
                      >
                        <Link href="https://github.com/Amansingh0807/Mayura-UI" target="_blank" className="cursor-pointer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                          <Badge className="bg-[#0c4bb2]/10 text-[#0c4bb2] border-0 ml-2 text-xs cursor-pointer">
                            {loading ? '...' : formattedStars}
                          </Badge>
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={toggleTheme}
                        className="border-[#00aeaf]/30 hover:bg-[#00aeaf]/10 cursor-pointer"
                      >
                        <ThemeIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
