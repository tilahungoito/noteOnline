import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbare";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import middleware from "@/middleware";
import ErrorBoundary from "@/components/ErrorBoudary";

export const metadata: Metadata = {
  title: "take-note",
  description: "generated by tilahun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <ClerkProvider afterSignOutUrl={'/signout'}>
      <html lang="en">
        <body className="">
          <SignedIn>
            {/* Flex container for Navbar and UserButton */}
            <div className="flex items-center px-10 py-2">
              {/* Navbar takes 90% of the width */}
              <div className="w-[100%]">
                <Navbar />
              </div>
              {/* UserButton on the remaining 10% */}
              <div className="w-[10%] flex justify-end">
                <UserButton />
              </div>
            </div>
            {children}
          </SignedIn>

          <SignedOut>
            <div className="flex justify-center items-center h-screen">
              <SignIn />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
