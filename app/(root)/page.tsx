"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Star, Github } from "lucide-react";
import { useGitHubStars } from "@/hooks/use-github-stars";

export default function Home() {
  // Real-time GitHub stars
  const { loading, formattedStars } = useGitHubStars("Amansingh0807", "Mayura-UI");
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Beta Badge */}
            <div className="inline-flex items-center space-x-2 bg-background/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Now in Beta</span>
              <Badge variant="secondary" className="text-xs">
                v0.1.0
              </Badge>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                Beautiful
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Components
              </span>
              <br />
              <span className="text-muted-foreground text-3xl sm:text-5xl lg:text-6xl">
                For Modern Apps
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
              Build stunning user interfaces with our comprehensive component library. 
              Modern, accessible, and fully customizable components.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button variant="outline" size="lg" className="group" asChild>
                <a href="https://github.com/Amansingh0807/Mayura-UI" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  <span>View on GitHub</span>
                  <div className="flex items-center ml-2 space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{loading ? "..." : formattedStars}</span>
                  </div>
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">100%</div>
                <div className="text-sm text-muted-foreground">TypeScript</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">A11y</div>
                <div className="text-sm text-muted-foreground">Accessible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From simple buttons to complex data tables, we&apos;ve got you covered with a complete set of components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Design",
                description: "Clean, minimal, and beautiful components that follow modern design principles."
              },
              {
                title: "Fully Customizable",
                description: "Customize every aspect of the components to match your brand and design system."
              },
              {
                title: "Developer Experience",
                description: "Built with TypeScript, excellent documentation, and great developer ergonomics."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
