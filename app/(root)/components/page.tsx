"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Button as MayuraButton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/mayur-ui";
import {
  Layers,
  MousePointerClick,
  FormInput,
  Loader2,
  Bell,
  MessageSquare,
  Menu,
  Navigation,
  Table,
  ChevronRight,
} from "lucide-react";

interface ComponentCategory {
  name: string;
  icon: React.ReactNode;
  items: {
    name: string;
    slug: string;
    description: string;
  }[];
}

const componentCategories: ComponentCategory[] = [
  {
    name: "Form Controls",
    icon: <FormInput className="w-4 h-4" />,
    items: [
      { name: "Button", slug: "button", description: "Clickable button component with multiple variants" },
      { name: "Input", slug: "input", description: "Text input with validation and icons" },
      { name: "Textarea", slug: "textarea", description: "Multi-line text input with auto-resize" },
      { name: "Checkbox", slug: "checkbox", description: "Checkbox with indeterminate state" },
      { name: "Radio", slug: "radio", description: "Radio button for single selection" },
      { name: "Switch", slug: "switch", description: "Toggle switch component" },
      { name: "Select", slug: "select", description: "Dropdown select with search" },
    ],
  },
  {
    name: "Display",
    icon: <Layers className="w-4 h-4" />,
    items: [
      { name: "Avatar", slug: "avatar", description: "User avatar with status indicators" },
      { name: "Badge", slug: "badge", description: "Small status badge component" },
      { name: "Card", slug: "card", description: "Container card with header and footer" },
      { name: "Skeleton", slug: "skeleton", description: "Loading placeholder component" },
      { name: "Spinner", slug: "spinner", description: "Loading spinner indicator" },
    ],
  },
  {
    name: "Feedback",
    icon: <Bell className="w-4 h-4" />,
    items: [
      { name: "Alert", slug: "alert", description: "Alert message with variants" },
      { name: "Tooltip", slug: "tooltip", description: "Hover tooltip component" },
    ],
  },
  {
    name: "Overlays",
    icon: <MessageSquare className="w-4 h-4" />,
    items: [
      { name: "Modal", slug: "modal", description: "Dialog modal with backdrop" },
    ],
  },
  {
    name: "Navigation",
    icon: <Navigation className="w-4 h-4" />,
    items: [
      { name: "Tabs", slug: "tabs", description: "Tab navigation component" },
      { name: "Dropdown", slug: "dropdown", description: "Dropdown menu component" },
    ],
  },
  {
    name: "Data Display",
    icon: <Table className="w-4 h-4" />,
    items: [
      { name: "Table", slug: "table", description: "Data table with sorting" },
      { name: "Pagination", slug: "pagination", description: "Page navigation component" },
    ],
  },
];

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 flex flex-col",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Sidebar Header - Fixed */}
          <div className="px-4 pt-24 pb-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-2">Components</h2>
            <p className="text-sm text-muted-foreground">
              All components with multiple variants
            </p>
          </div>

          {/* Sidebar Navigation - Scrollable */}
          <nav className="px-2 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-thin">
            {componentCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {category.items.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => {
                        setSelectedComponent(item.slug);
                        setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200",
                        selectedComponent === item.slug
                          ? "bg-gradient-to-r from-[#00aeaf]/10 to-[#0c4bb2]/10 text-[#00aeaf] font-medium border-l-2 border-[#00aeaf]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <span>{item.name}</span>
                      {selectedComponent === item.slug && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto h-screen scrollbar-thin">
          <div className="p-8 pt-24 lg:pt-8">
            <div className="max-w-6xl mx-auto">
              <ComponentDisplay componentSlug={selectedComponent} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component Display based on selected component
function ComponentDisplay({ componentSlug }: { componentSlug: string }) {
  const componentContent: Record<string, React.ReactNode> = {
    button: <ButtonShowcase />,
    input: <InputShowcase />,
    textarea: <TextareaShowcase />,
    checkbox: <CheckboxShowcase />,
    radio: <RadioShowcase />,
    switch: <SwitchShowcase />,
    select: <SelectShowcase />,
    avatar: <AvatarShowcase />,
    badge: <BadgeShowcase />,
    card: <CardShowcase />,
    skeleton: <SkeletonShowcase />,
    spinner: <SpinnerShowcase />,
    alert: <AlertShowcase />,
    tooltip: <TooltipShowcase />,
    modal: <ModalShowcase />,
    tabs: <TabsShowcase />,
    dropdown: <DropdownShowcase />,
    table: <TableShowcase />,
    pagination: <PaginationShowcase />,
  };

  return componentContent[componentSlug] || <div>Component not found</div>;
}

// Individual component showcases
function ButtonShowcase() {
  const [copied, setCopied] = React.useState<string>("");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-3">Button</h1>
        <p className="text-lg text-muted-foreground">
          Clickable button component with multiple variants, sizes, and loading states.
        </p>
      </div>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>Import the Button component from Mayura UI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`import { Button as MayuraButton } from "@/components/mayur-ui";`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`import { Button as MayuraButton } from "@/components/mayur-ui";`, "import")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "import" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>Different button styles for various use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <MayuraButton variant="primary">Primary</MayuraButton>
            <MayuraButton variant="secondary">Secondary</MayuraButton>
            <MayuraButton variant="gradient">Gradient</MayuraButton>
            <MayuraButton variant="ghost">Ghost</MayuraButton>
            <MayuraButton variant="outline">Outline</MayuraButton>
            <MayuraButton variant="danger">Danger</MayuraButton>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<MayuraButton variant="primary">Primary</MayuraButton>
<MayuraButton variant="secondary">Secondary</MayuraButton>
<MayuraButton variant="gradient">Gradient</MayuraButton>
<MayuraButton variant="ghost">Ghost</MayuraButton>
<MayuraButton variant="outline">Outline</MayuraButton>
<MayuraButton variant="danger">Danger</MayuraButton>`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`<MayuraButton variant="primary">Primary</MayuraButton>\n<MayuraButton variant="secondary">Secondary</MayuraButton>\n<MayuraButton variant="gradient">Gradient</MayuraButton>\n<MayuraButton variant="ghost">Ghost</MayuraButton>\n<MayuraButton variant="outline">Outline</MayuraButton>\n<MayuraButton variant="danger">Danger</MayuraButton>`, "variants")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "variants" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>Four different button sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <MayuraButton size="sm" variant="primary">Small</MayuraButton>
            <MayuraButton size="md" variant="primary">Medium</MayuraButton>
            <MayuraButton size="lg" variant="primary">Large</MayuraButton>
            <MayuraButton size="xl" variant="primary">Extra Large</MayuraButton>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<MayuraButton size="sm">Small</MayuraButton>
<MayuraButton size="md">Medium</MayuraButton>
<MayuraButton size="lg">Large</MayuraButton>
<MayuraButton size="xl">Extra Large</MayuraButton>`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`<MayuraButton size="sm">Small</MayuraButton>\n<MayuraButton size="md">Medium</MayuraButton>\n<MayuraButton size="lg">Large</MayuraButton>\n<MayuraButton size="xl">Extra Large</MayuraButton>`, "sizes")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "sizes" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* With Icons */}
      <Card>
        <CardHeader>
          <CardTitle>With Icons</CardTitle>
          <CardDescription>Buttons with left or right positioned icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <MayuraButton icon={<MousePointerClick className="w-4 h-4" />} iconPosition="left" variant="primary">
              Click Me
            </MayuraButton>
            <MayuraButton icon={<ChevronRight className="w-4 h-4" />} iconPosition="right" variant="gradient">
              Next
            </MayuraButton>
            <MayuraButton icon={<Loader2 className="w-4 h-4" />} iconPosition="left" variant="secondary">
              Process
            </MayuraButton>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { MousePointerClick, ChevronRight } from "lucide-react";

<MayuraButton 
  icon={<MousePointerClick className="w-4 h-4" />} 
  iconPosition="left"
>
  Click Me
</MayuraButton>

<MayuraButton 
  icon={<ChevronRight className="w-4 h-4" />} 
  iconPosition="right"
>
  Next
</MayuraButton>`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`import { MousePointerClick, ChevronRight } from "lucide-react";\n\n<MayuraButton icon={<MousePointerClick className="w-4 h-4" />} iconPosition="left">Click Me</MayuraButton>\n<MayuraButton icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">Next</MayuraButton>`, "icons")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "icons" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      <Card>
        <CardHeader>
          <CardTitle>Loading State</CardTitle>
          <CardDescription>Buttons with loading spinners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <MayuraButton loading variant="primary">Processing...</MayuraButton>
            <MayuraButton loading variant="gradient">Loading...</MayuraButton>
            <MayuraButton loading variant="outline">Please wait...</MayuraButton>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<MayuraButton loading variant="primary">
  Processing...
</MayuraButton>

<MayuraButton loading variant="gradient">
  Loading...
</MayuraButton>`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`<MayuraButton loading variant="primary">Processing...</MayuraButton>\n<MayuraButton loading variant="gradient">Loading...</MayuraButton>`, "loading")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "loading" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled State</CardTitle>
          <CardDescription>Disabled buttons across variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <MayuraButton disabled variant="primary">Disabled</MayuraButton>
            <MayuraButton disabled variant="gradient">Disabled</MayuraButton>
            <MayuraButton disabled variant="outline">Disabled</MayuraButton>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<MayuraButton disabled variant="primary">
  Disabled
</MayuraButton>`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(`<MayuraButton disabled variant="primary">Disabled</MayuraButton>`, "disabled")}
              className="absolute top-2 right-2 p-2 rounded-md bg-background hover:bg-accent text-xs"
            >
              {copied === "disabled" ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Props */}
      <Card>
        <CardHeader>
          <CardTitle>Props</CardTitle>
          <CardDescription>Available props for the Button component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Prop</th>
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-left py-2 px-4">Default</th>
                  <th className="text-left py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">variant</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;primary&quot; | &quot;secondary&quot; | &quot;gradient&quot; | &quot;ghost&quot; | &quot;outline&quot; | &quot;danger&quot;</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;primary&quot;</td>
                  <td className="py-2 px-4">Button style variant</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">size</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;md&quot;</td>
                  <td className="py-2 px-4">Button size</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">loading</td>
                  <td className="py-2 px-4 font-mono text-xs">boolean</td>
                  <td className="py-2 px-4 font-mono text-xs">false</td>
                  <td className="py-2 px-4">Show loading spinner</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">disabled</td>
                  <td className="py-2 px-4 font-mono text-xs">boolean</td>
                  <td className="py-2 px-4 font-mono text-xs">false</td>
                  <td className="py-2 px-4">Disable button</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">icon</td>
                  <td className="py-2 px-4 font-mono text-xs">ReactNode</td>
                  <td className="py-2 px-4 font-mono text-xs">-</td>
                  <td className="py-2 px-4">Icon element</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono">iconPosition</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;left&quot; | &quot;right&quot;</td>
                  <td className="py-2 px-4 font-mono text-xs">&quot;left&quot;</td>
                  <td className="py-2 px-4">Icon position</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder showcases for other components (we'll implement more)
function InputShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Input</h1>
        <p className="text-lg text-muted-foreground">
          Text input component with validation, icons, and multiple variants.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Input component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TextareaShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Textarea</h1>
        <p className="text-lg text-muted-foreground">
          Multi-line text input with auto-resize and character count.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Textarea component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckboxShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Checkbox</h1>
        <p className="text-lg text-muted-foreground">
          Checkbox component with indeterminate state support.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Checkbox component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function RadioShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Radio</h1>
        <p className="text-lg text-muted-foreground">
          Radio button for single selection from multiple options.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Radio component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SwitchShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Switch</h1>
        <p className="text-lg text-muted-foreground">
          Toggle switch component with multiple sizes.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Switch component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SelectShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Select</h1>
        <p className="text-lg text-muted-foreground">
          Dropdown select component with search functionality.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Select component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Avatar</h1>
        <p className="text-lg text-muted-foreground">
          User avatar with status indicators and group support.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Avatar component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function BadgeShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Badge</h1>
        <p className="text-lg text-muted-foreground">
          Small status badge with multiple variants.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Badge component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CardShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Card</h1>
        <p className="text-lg text-muted-foreground">
          Container card with header, content, and footer sections.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Card component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SkeletonShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Skeleton</h1>
        <p className="text-lg text-muted-foreground">
          Loading placeholder with multiple shapes and animations.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Skeleton component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SpinnerShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Spinner</h1>
        <p className="text-lg text-muted-foreground">
          Loading spinner with multiple variants and sizes.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Spinner component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AlertShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Alert message component with multiple variants.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Alert component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TooltipShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Tooltip</h1>
        <p className="text-lg text-muted-foreground">
          Hover tooltip with multiple positions and variants.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Tooltip component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ModalShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Modal</h1>
        <p className="text-lg text-muted-foreground">
          Dialog modal with backdrop and multiple sizes.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Modal component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TabsShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Tabs</h1>
        <p className="text-lg text-muted-foreground">
          Tab navigation with animated indicator.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Tabs component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function DropdownShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Dropdown</h1>
        <p className="text-lg text-muted-foreground">
          Dropdown menu with nested items support.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Dropdown component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TableShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Table</h1>
        <p className="text-lg text-muted-foreground">
          Data table with sorting and row selection.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Table component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

function PaginationShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-3">Pagination</h1>
        <p className="text-lg text-muted-foreground">
          Page navigation with multiple variants.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Pagination component showcase coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
