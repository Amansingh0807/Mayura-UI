"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart, Code, Palette, Zap, Github, Twitter, Linkedin, Star, Lightbulb } from "lucide-react";
import Link from "next/link";

// Custom Hugging Face Icon Component
const HuggingFaceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.686 0 8.5 3.814 8.5 8.5s-3.814 8.5-8.5 8.5-8.5-3.814-8.5-8.5S7.314 3.5 12 3.5zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3.5 3c1.326 0 2.598.527 3.536 1.464l-1.061 1.061A2.494 2.494 0 0 0 12 14.5c-.663 0-1.299.263-1.768.732L9.171 14.171A3.994 3.994 0 0 1 12 12.5z"/>
  </svg>
);

// Simple Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 15 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <div 
    className="animate-bounce-slow"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
    }}
  >
    {children}
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating UI Elements */}
        <FloatingElement delay={0} duration={12}>
          <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-[#00aeaf]/5 to-[#0c4bb2]/5 rounded-lg backdrop-blur-sm border border-[#00aeaf]/10 opacity-60">
            <Code className="w-6 h-6 text-[#00aeaf] m-3" />
          </div>
        </FloatingElement>
        
        <FloatingElement delay={3} duration={15}>
          <div className="absolute bottom-40 right-10 w-10 h-10 bg-gradient-to-br from-[#0c4bb2]/5 to-[#008c9d]/5 rounded-full backdrop-blur-sm border border-[#0c4bb2]/10 opacity-60">
            <Sparkles className="w-5 h-5 text-[#0c4bb2] m-2.5" />
          </div>
        </FloatingElement>
        
        {/* Moving Stars */}
        <div className="absolute top-32 left-1/3 animate-ping">
          <Star className="w-4 h-4 text-[#00aeaf]/60 fill-current" />
        </div>
        <div className="absolute top-80 right-1/3 animate-ping" style={{ animationDelay: '1s' }}>
          <Star className="w-3 h-3 text-[#0c4bb2]/60 fill-current" />
        </div>
        <div className="absolute bottom-80 left-1/2 animate-ping" style={{ animationDelay: '2s' }}>
          <Star className="w-5 h-5 text-[#008c9d]/60 fill-current" />
        </div>
        <div className="absolute top-1/2 right-20 animate-ping" style={{ animationDelay: '3s' }}>
          <Star className="w-3 h-3 text-[#00aeaf]/40 fill-current" />
        </div>
        <div className="absolute bottom-1/3 left-20 animate-ping" style={{ animationDelay: '4s' }}>
          <Star className="w-4 h-4 text-[#0c4bb2]/50 fill-current" />
        </div>
        
        {/* Subtle Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#00aeaf]/5 to-[#0c4bb2]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-48 h-48 bg-gradient-to-br from-[#008c9d]/5 to-[#00aeaf]/5 rounded-full blur-3xl" />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00aeaf]/10 via-[#0c4bb2]/5 to-[#008c9d]/10" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-[#00aeaf]/10 to-[#0c4bb2]/10 border-[#00aeaf]/20 text-[#0c4bb2] dark:text-[#00aeaf]">
              <Sparkles className="h-3 w-3 mr-1" />
              About Mayura UI
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#0c4bb2] via-[#00aeaf] to-[#008c9d] bg-clip-text text-transparent leading-tight">
              Making the Web More
              <span className="block">Vibrant & Beautiful</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              In a world filled with digital interfaces, we believe in making the web a more vibrant and beautiful place. 
              Mayura UI is more than just a component library; it&apos;s a meticulously crafted collection of over 100 components 
              designed to help developers and designers build stunning, memorable user experiences with ease.
            </p>
          </div>
        </div>
        
        {/* Simple Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#00aeaf]/10 to-[#0c4bb2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-[#008c9d]/10 to-[#00aeaf]/10 rounded-full blur-3xl" />
      </section>

      {/* Inspiration Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-[#00aeaf]/30 text-[#0c4bb2] dark:text-[#00aeaf]">
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  Our Inspiration
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Inspired by the Grace of 
                  <span className="block text-[#00aeaf]">the Mayura</span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Inspired by the breathtaking beauty and grace of the Mayura (peacock), our library aims to bring 
                the same level of elegance and vibrancy to your applications. Just as the peacock displays its 
                magnificent plumage with pride, Mayura UI showcases components that are both functional and visually stunning.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#00aeaf]/10 rounded-full">
                  <Palette className="h-4 w-4 text-[#00aeaf]" />
                  <span className="text-sm font-medium text-[#0c4bb2] dark:text-[#00aeaf]">Elegant Design</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0c4bb2]/10 rounded-full">
                  <Zap className="h-4 w-4 text-[#0c4bb2]" />
                  <span className="text-sm font-medium text-[#0c4bb2] dark:text-[#00aeaf]">Vibrant Colors</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-[#00aeaf]/20 shadow-2xl">
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">100+ Components</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Meticulously crafted components that bring elegance and functionality to your applications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Creation Story Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-slate-100/50 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#00aeaf]/30 text-[#0c4bb2] dark:text-[#00aeaf]">
              <Code className="h-3 w-3 mr-1" />
              The Spark of Creation
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              From Passion to Purpose
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Mayura UI began as a passion project by Aman Singh, a software engineer based in India. 
              As an active open-source contributor and a professional working at the intersection of 
              computational mathematics and physics, Aman possesses a unique perspective on structure, logic, and aesthetics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-6 bg-white dark:bg-slate-800 border-[#00aeaf]/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00aeaf] to-[#008c9d] rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">The Problem</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  While many UI libraries offered functionality, there was a gap for components that truly elevated 
                  a design tool that was not just building blocks, but sources of inspiration.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white dark:bg-slate-800 border-[#0c4bb2]/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0c4bb2] to-[#00aeaf] rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white fill-current" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">The Solution</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  From this observation, Mayura UI was born: a project dedicated to injecting new life, 
                  creativity, and elegance into web development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#00aeaf]/30 text-[#0c4bb2] dark:text-[#00aeaf]">
              <Palette className="h-3 w-3 mr-1" />
              Our Philosophy
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Built on Four Pillars
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Vibrant by Design",
                description: "Every component is built not just to be functional, but to be visually impressive with clean aesthetics and smooth animations."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Precision Engineered",
                description: "Drawing from computational sciences, we ensure every component is robust, performant, and built with analytical rigor."
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Developer-First",
                description: "Clean, well-documented code that&apos;s easy to implement and customize, letting you focus on building amazing products."
              },
              {
                icon: <Heart className="h-8 w-8 fill-current" />,
                title: "Open & Evolving",
                description: "A contribution to the open-source community, constantly evolving with new components and community feedback."
              }
            ].map((pillar, index) => (
              <div key={index} className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                
                <Card className="relative p-6 text-center bg-white dark:bg-slate-800 border-[#00aeaf]/20 hover:shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00aeaf]/5 via-transparent to-[#0c4bb2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating sparkles */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-2 h-2 bg-[#00aeaf] rounded-full animate-ping" />
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-1.5 h-1.5 bg-[#0c4bb2] rounded-full animate-ping" />
                  </div>
                  <div className="absolute top-1/2 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                    <div className="w-1 h-1 bg-[#008c9d] rounded-full animate-ping" />
                  </div>
                  
                  <CardContent className="relative space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] rounded-full flex items-center justify-center text-white group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 glow-effect">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0c4bb2] dark:group-hover:text-[#00aeaf] transition-colors duration-300 group-hover:scale-105 transform">{pillar.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">{pillar.description}</p>
                  </CardContent>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 shimmer" />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-slate-100/50 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-[#00aeaf]/30 text-[#0c4bb2] dark:text-[#00aeaf]">
                  <Code className="h-3 w-3 mr-1" />
                  Meet the Creator
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Aman Singh
                  <span className="block text-[#00aeaf] text-2xl font-medium">Architect & Visionary</span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Aman Singh is the mind and architect behind Mayura UI. His work in complex scientific fields has 
                instilled a deep appreciation for precision and efficiency, while his passion for open-source drives 
                his commitment to building high-quality tools for the global developer community.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Mayura UI is the culmination of his technical expertise and his creative vision for a more beautiful web.
              </p>
              
              <div className="flex gap-4">
                <Button asChild className="bg-gradient-to-r from-[#00aeaf] to-[#008c9d] hover:from-[#008c9d] hover:to-[#00aeaf] text-white">
                  <a href="https://github.com/Amansingh0807" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Follow on GitHub
                  </a>
                </Button>
                
                <Button variant="outline" asChild className="border-[#00aeaf]/30 hover:bg-[#00aeaf]/10">
                  <a href="https://x.com/RealAman_Singh" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                 Follow
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-[#00aeaf]/20 shadow-2xl">
                <CardContent className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] rounded-full flex items-center justify-center mb-6">
                    <Code className="h-16 w-16 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Software Engineer</h3>
                    <p className="text-[#00aeaf] font-medium">Computational Mathematics & Physics</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Based in India • Open Source Contributor • UI/UX Enthusiast
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-4 pt-4">
                    {[
                      { icon: <Github className="h-5 w-5" />, href: "https://github.com/Amansingh0807" },
                      { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/RealAman_Singh" },
                      { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/amansingh08/" },
                      { icon: <HuggingFaceIcon className="h-5 w-5" />, href: "https://huggingface.co/amansingh08" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-gradient-to-br from-[#00aeaf]/10 to-[#0c4bb2]/10 rounded-full flex items-center justify-center text-[#00aeaf] hover:from-[#00aeaf] hover:to-[#0c4bb2] hover:text-white transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative px-4 py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00aeaf]/5 via-[#0c4bb2]/5 to-[#008c9d]/5" />
        
        {/* Floating elements for CTA */}
        <div className="absolute top-10 left-10 opacity-30">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] rounded-full animate-bounce-slow glow-effect">
            <Lightbulb className="w-8 h-8 text-white m-4" />
          </div>
        </div>
        
        <div className="absolute top-20 right-20 opacity-30">
          <div className="w-12 h-12 bg-gradient-to-br from-[#008c9d] to-[#00aeaf] rounded-lg animate-bounce-slow glow-effect" style={{ animationDelay: '1s' }}>
            <Star className="w-6 h-6 text-white m-3 fill-current" />
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/4 opacity-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0c4bb2] to-[#008c9d] rounded-xl animate-bounce-slow glow-effect" style={{ animationDelay: '2s' }}>
            <Code className="w-10 h-10 text-white m-5" />
          </div>
        </div>
        
        <div className="absolute bottom-20 right-1/4 opacity-20">
          <div className="w-14 h-14 bg-gradient-to-br from-[#00aeaf] to-[#0c4bb2] rounded-full animate-bounce-slow glow-effect" style={{ animationDelay: '3s' }}>
            <Heart className="w-7 h-7 text-white m-3.5 fill-current" />
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-gradient-to-r from-[#00aeaf]/10 to-[#0c4bb2]/10 border-[#00aeaf]/20 text-[#0c4bb2] dark:text-[#00aeaf] animate-pulse">
              <Sparkles className="h-3 w-3 mr-1" />
              Ready to Create
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Ready to create something 
              <span className="block bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] bg-clip-text text-transparent animate-gradient-float">
                beautiful?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive into our components and let your creativity take flight. Transform your ideas into stunning 
              digital experiences with Mayura UI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00aeaf] to-[#008c9d] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-float" />
                <Button size="lg" asChild className="relative bg-gradient-to-r from-[#00aeaf] to-[#008c9d] hover:from-[#008c9d] hover:to-[#00aeaf] text-white text-lg px-8 py-3 group hover:scale-110 transition-all duration-300">
                  <Link href="#">
                    <Palette className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Explore Components
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 group-hover:scale-125 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
              
              <Button variant="outline" size="lg" asChild className="border-[#00aeaf]/30 hover:bg-[#00aeaf]/10 text-lg px-8 py-3 hover:shadow-2xl hover:scale-110 transition-all duration-300 group hover:border-[#00aeaf] hover:text-[#0c4bb2] dark:hover:text-[#00aeaf]">
                <a href="https://github.com/Amansingh0807/Mayura-UI" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
