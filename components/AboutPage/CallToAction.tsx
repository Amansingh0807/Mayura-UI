import React from 'react'


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Heart, Code, Palette, Github,  Star, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div>
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
  )
}
