"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Star, Github, Mail, Heart, User, Settings, Bell, ChevronDown } from "lucide-react";
import { useGitHubStars } from "@/hooks/use-github-stars";
import {
  Button as MayuraButton,
  Input as MayuraInput,
  Textarea as MayuraTextarea,
  Checkbox,
  Radio,
  Switch,
  Avatar,
  AvatarGroup,
  Badge as MayuraBadge,
  Skeleton,
  SkeletonText,
  Spinner,
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MayuraTooltip,
  MayuraModal,
  MayuraModalFooter,
  MayuraTabs,
  MayuraDropdown,
  MayuraSelect,
  MayuraTable,
  MayuraPagination,
  MayuraPaginationInfo,
} from "@/components/mayur-ui";



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

      {/* Component Playground - Comprehensive demo */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Component Showcase</h2>
              <p className="text-muted-foreground">Explore our vibrant components with unique designs</p>
            </div>

            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Multiple variants with loading states and icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <MayuraButton variant="primary">Primary</MayuraButton>
                  <MayuraButton variant="secondary">Secondary</MayuraButton>
                  <MayuraButton variant="gradient">Gradient</MayuraButton>
                  <MayuraButton variant="ghost">Ghost</MayuraButton>
                  <MayuraButton variant="outline">Outline</MayuraButton>
                  <MayuraButton variant="danger">Danger</MayuraButton>
                  <MayuraButton loading>Loading...</MayuraButton>
                  <MayuraButton icon={<Heart className="w-4 h-4" />} iconPosition="left">With Icon</MayuraButton>
                </div>
              </CardContent>
            </Card>

            {/* Form Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Form Inputs</CardTitle>
                <CardDescription>Inputs, Textarea with variants and validation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <MayuraInput label="Email" placeholder="you@example.com" type="email" leftIcon={<Mail className="w-4 h-4" />} />
                  <MayuraInput label="Password" placeholder="Enter password" type="password" variant="filled" />
                  <MayuraInput error="This field is required" placeholder="Error state" />
                  <MayuraTextarea label="Message" placeholder="Write your message..." maxLength={200} showCount />
                </div>
              </CardContent>
            </Card>

            {/* Selection Controls & Display Components - 2 Column Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Selection Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Selection Controls</CardTitle>
                  <CardDescription>Checkbox, Radio, and Switch components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Checkbox label="Accept terms" />
                      <Checkbox label="Gradient variant" variant="gradient" />
                      <Checkbox label="With description" description="This is a checkbox with extra info" />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Radio name="option" label="Option 1" />
                      <Radio name="option" label="Option 2" />
                      <Radio name="option" label="Gradient" variant="gradient" />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Switch label="Notifications" />
                      <Switch label="Gradient switch" variant="gradient" />
                      <Switch label="Large size" size="lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Display Components */}
              <Card>
                <CardHeader>
                  <CardTitle>Display Components</CardTitle>
                  <CardDescription>Avatar, Badge, and Spinner variations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Avatars</h4>
                      <div className="flex flex-wrap items-center gap-4">
                        <Avatar fallback="JD" status="online" />
                        <Avatar fallback="AS" status="busy" size="lg" />
                        <Avatar src="https://i.pravatar.cc/150?img=1" status="away" />
                        <AvatarGroup max={3}>
                          <Avatar fallback="U1" />
                          <Avatar fallback="U2" />
                          <Avatar fallback="U3" />
                          <Avatar fallback="U4" />
                          <Avatar fallback="U5" />
                        </AvatarGroup>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3">Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <MayuraBadge>Default</MayuraBadge>
                        <MayuraBadge variant="success" dot>Success</MayuraBadge>
                        <MayuraBadge variant="warning">Warning</MayuraBadge>
                        <MayuraBadge variant="error" dot pulse>Error</MayuraBadge>
                        <MayuraBadge variant="info">Info</MayuraBadge>
                        <MayuraBadge variant="gradient">Gradient</MayuraBadge>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3">Spinners</h4>
                      <div className="flex flex-wrap items-center gap-4">
                        <Spinner variant="ring" />
                        <Spinner variant="dots" />
                        <Spinner variant="pulse" />
                        <Spinner variant="gradient" size="lg" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert & Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Loading States</CardTitle>
                <CardDescription>Alert messages and skeleton loaders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="success" title="Success!" description="Your changes have been saved successfully." />
                  <Alert variant="warning" title="Warning" description="Please review your input before submitting." dismissible />
                  <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Skeleton Loaders</h4>
                    <div className="space-y-2">
                      <Skeleton variant="rectangular" width="100%" height={40} />
                      <SkeletonText lines={3} />
                      <div className="flex gap-2">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width="100%" height={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tooltip & Modal */}
            <Card>
              <CardHeader>
                <CardTitle>Tooltip & Modal</CardTitle>
                <CardDescription>Interactive overlays and tooltips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Tooltips</h4>
                    <div className="flex flex-wrap gap-4">
                      <MayuraTooltip content="This is a tooltip" position="top">
                        <MayuraButton variant="outline">Hover me (Top)</MayuraButton>
                      </MayuraTooltip>
                      <MayuraTooltip content="Gradient tooltip!" position="bottom" variant="gradient">
                        <MayuraButton variant="gradient">Gradient Tooltip</MayuraButton>
                      </MayuraTooltip>
                      <MayuraTooltip content="Dark variant" position="right" variant="dark">
                        <MayuraButton variant="secondary">Dark Tooltip</MayuraButton>
                      </MayuraTooltip>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Modal</h4>
                    <ModalDemo />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Tab navigation with different variants</CardDescription>
              </CardHeader>
              <CardContent>
                <MayuraTabs
                  items={[
                    {
                      label: "Profile",
                      value: "profile",
                      icon: <User className="w-4 h-4" />,
                      content: (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h3 className="font-semibold mb-2">Profile Settings</h3>
                          <p className="text-sm text-muted-foreground">Manage your profile information and preferences.</p>
                        </div>
                      ),
                    },
                    {
                      label: "Settings",
                      value: "settings",
                      icon: <Settings className="w-4 h-4" />,
                      content: (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h3 className="font-semibold mb-2">Account Settings</h3>
                          <p className="text-sm text-muted-foreground">Configure your account and security options.</p>
                        </div>
                      ),
                    },
                    {
                      label: "Notifications",
                      value: "notifications",
                      icon: <Bell className="w-4 h-4" />,
                      content: (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h3 className="font-semibold mb-2">Notification Preferences</h3>
                          <p className="text-sm text-muted-foreground">Choose what notifications you want to receive.</p>
                        </div>
                      ),
                    },
                  ]}
                  variant="gradient"
                />
              </CardContent>
            </Card>

            {/* Dropdown & Select */}
            <Card>
              <CardHeader>
                <CardTitle>Dropdown & Select</CardTitle>
                <CardDescription>Menu and selection components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Dropdown Menu</h4>
                    <MayuraDropdown
                      trigger={
                        <MayuraButton variant="outline" icon={<ChevronDown className="w-4 h-4" />} iconPosition="right">
                          Actions
                        </MayuraButton>
                      }
                      items={[
                        { label: "Edit", value: "edit", icon: <Settings className="w-4 h-4" /> },
                        { label: "Share", value: "share", icon: <Star className="w-4 h-4" /> },
                        { divider: true, label: "", value: "divider1" },
                        { label: "Delete", value: "delete", danger: true, icon: <Github className="w-4 h-4" /> },
                      ]}
                      variant="gradient"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-3">Select</h4>
                    <MayuraSelect
                      options={[
                        { label: "React", value: "react" },
                        { label: "Vue", value: "vue" },
                        { label: "Angular", value: "angular" },
                        { label: "Svelte", value: "svelte" },
                      ]}
                      placeholder="Select a framework"
                      variant="filled"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table & Pagination */}
            <Card>
              <CardHeader>
                <CardTitle>Table & Pagination</CardTitle>
                <CardDescription>Data table with sorting and pagination</CardDescription>
              </CardHeader>
              <CardContent>
                <TableDemo />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// Modal Demo Component
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <MayuraButton onClick={() => setIsOpen(true)} variant="primary">
        Open Modal
      </MayuraButton>
      <MayuraModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Beautiful Modal"
        variant="gradient"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This is a beautiful modal with gradient borders and backdrop blur effects.
          </p>
          <MayuraInput label="Name" placeholder="Enter your name" />
          <MayuraTextarea label="Message" placeholder="Your message here..." />
        </div>
        <MayuraModalFooter>
          <MayuraButton variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </MayuraButton>
          <MayuraButton variant="gradient" onClick={() => setIsOpen(false)}>
            Submit
          </MayuraButton>
        </MayuraModalFooter>
      </MayuraModal>
    </>
  );
}

// Table Demo Component
function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Active" },
  ];
  
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  return (
    <div className="space-y-4">
      <MayuraTable
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "role", label: "Role" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <MayuraBadge variant={value === "Active" ? "success" : "error"}>
                {value as string}
              </MayuraBadge>
            ),
          },
        ]}
        data={paginatedData}
        variant="striped"
        hoverable
      />
      <div className="flex items-center justify-between">
        <MayuraPaginationInfo
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={data.length}
        />
        <MayuraPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant="rounded"
        />
      </div>
    </div>
  );
}
