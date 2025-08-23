"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowUpRight,
  Star,
  ExternalLink
} from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Real-time GitHub stars
  const { loading, formattedStars } = useGitHubStars("Amansingh0807", "Mayura-UI");

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Components", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Examples", href: "#" },
        { name: "Changelog", href: "#" },
      ] as FooterLink[]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Getting Started", href: "#" },
        { name: "Design System", href: "#" },
        { name: "Accessibility", href: "#" },
      ] as FooterLink[]
    },
    {
      title: "Community",
      links: [
        { name: "GitHub", href: "https://github.com/Amansingh0807/Mayura-UI", external: true },
        { name: "Discord", href: "#", external: true },
        { name: "Twitter", href: "#", external: true },
        { name: "Discussions", href: "https://github.com/Amansingh0807/Mayura-UI/discussions", external: true },
      ] as FooterLink[]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ] as FooterLink[]
    }
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Amansingh0807/Mayura-UI", icon: <Github className="h-5 w-5" /> },
    { name: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
    { name: "Email", href: "mailto:contact@mayuraui.com", icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <footer className="relative border-t border-[#00aeaf]/20 bg-black">
      {/* Gradient overlay with your colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00aeaf]/[0.05] to-[#0c4bb2]/[0.05]" />
      
      <div className="relative">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div> */}
                  <div className="relative overflow-hidden rounded-lg flex items-center justify-center">
                                  <Image 
                                    src="/logo.png" 
                                    alt="Mayura UI Logo" 
                                    width={50} 
                                    height={50}
                                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-200 group-hover:scale-110"
                                    style={{ minWidth: '40px', minHeight: '40px' }}
                                    priority
                                  />
                                  {/* Hover glow effect */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-[#00aeaf]/20 to-[#0c4bb2]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                                </div>
                            
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#00aeaf]/20 to-[#0c4bb2]/20 opacity-50 blur-sm -z-10" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#00aeaf] via-white to-[#00b0ad] bg-clip-text text-transparent">
                    Mayura UI
                  </span>
                  <Badge className="bg-[#00aeaf]/20 text-[#00aeaf] border-[#00aeaf]/30 text-xs font-medium">
                    Beta
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed max-w-md">
                  A modern, accessible, and customizable component library. 
                  Create beautiful interfaces with our futuristic design system.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Star className={`h-4 w-4 fill-[#00aeaf] text-[#00aeaf] ${loading ? 'animate-pulse' : ''}`} />
                    <span className="font-medium text-white">{loading ? '...' : formattedStars}</span>
                    <span>stars on GitHub</span>
                  </div>
                </div>
              </div>

              {/* Newsletter subscription */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Stay updated</h4>
                <div className="flex space-x-2 max-w-sm">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm bg-gray-900 border border-[#00aeaf]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aeaf]/50 focus:border-[#00aeaf] text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="px-4 bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] hover:from-[#008c9d] hover:to-[#006b8f] cursor-pointer"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Get notified about new components and updates.
                </p>
              </div>
            </div>

            {/* Links sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="group flex items-center space-x-2 text-sm text-gray-300 hover:text-[#00aeaf] transition-colors cursor-pointer"
                        >
                          <span>{link.name}</span>
                          {link.external && (
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="opacity-20 bg-[#00aeaf]/20" />

        {/* Bottom section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Copyright and links */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <span>© {currentYear} Mayura UI. Made with</span>
                <Heart className="h-4 w-4 fill-[#00aeaf] text-[#00aeaf]" />
                <span>in India.</span>
              </div>
            </div>

            {/* Social links and actions */}
            <div className="flex items-center space-x-4">
              {/* Social icons */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer"
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-[#00aeaf] hover:bg-[#00aeaf]/10 group-hover:scale-110 transition-all duration-200 cursor-pointer"
                    >
                      {social.icon}
                    </Button>
                  </Link>
                ))}
              </div>

              <Separator orientation="vertical" className="h-6 bg-[#00aeaf]/20" />

              {/* Back to top */}
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-400 hover:text-[#00aeaf] hover:bg-[#00aeaf]/10 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span>Back to top</span>
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Animated gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00aeaf]/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
