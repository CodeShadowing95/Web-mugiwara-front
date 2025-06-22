"use client";

import { Navbar } from "@/app-components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const pageNotFound = pathname?.startsWith("/404");
  const isFermierPage = pathname?.startsWith("/fermier");

  const pagesWithoutNavbar = !isAuthPage && !pageNotFound && !isFermierPage;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-w-screen min-h-screen bg-[#f9f7f2] dark:bg-zinc-950 overflow-x-hidden" cz-shortcut-listen="true">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {pagesWithoutNavbar && <Navbar />}
          <Toaster richColors closeButton toastOptions={{ duration: 5000 }} position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
