
import type { Metadata } from "next";
import Header from "@/components/HomePage/header";
import Footer from "@/components/HomePage/footer";

export const metadata: Metadata = {
    title: {
        template: "%s | Mayura UI - Open Source Components",
        default: "Mayura UI - Open Source Components",
    },
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}