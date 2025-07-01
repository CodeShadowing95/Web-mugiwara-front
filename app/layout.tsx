"use client";

import { Navbar } from "@/app-components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { UserProvider } from "@/app/UserContext";
import { FarmProvider2 } from "@/app/FarmContext2";
import { LocationProvider } from "./LocationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const pageNotFound = pathname?.startsWith("/404");
  const isFermierPage = pathname?.startsWith("/fermier");

  const pagesWithoutNavbar = !isAuthPage && !pageNotFound && !isFermierPage;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Cocotte Connect - De la ferme à l'assiette !</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Commandez vos produits locaux en ligne et venez chercher votre commande au plus proche des producteurs !" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ico/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ico/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ico/favicon-16x16.png" />
        <link rel="manifest" href="/ico/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#8fb573" />
        <meta name="theme-color" content="#8fb573" />
      </head>

      <body className="max-w-screen min-h-screen bg-[#f9f7f2] dark:bg-zinc-950 overflow-x-hidden"
        cz-shortcut-listen="true">
          <UserProvider>
              <FarmProvider2>
                <LocationProvider>
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
                </LocationProvider>
              </FarmProvider2>
          </UserProvider>
      </body>
    </html>
  );
}
