import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbare";
import { ClerkProvider } from "@clerk/nextjs";
import middleware from "@/middleware";



export const metadata: Metadata = {
  title: "take-note",
  description: "genrated by tilahun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className=""
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
