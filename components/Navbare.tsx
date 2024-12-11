import { SignedIn, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import middleware from "@/middleware";
import { ClerkProvider } from "@clerk/nextjs";

export default function Navbar()
{
    return (
        <ClerkProvider>
            <nav className="flex justify-between items-center bg-slate-900 py-8 px-10">
                <Link className="text-white font-bold" href="/">
                    your notes</Link>
                <div>
                    <Link className="text-white font-bold" href="/addnew">

                        new-note  <span className=""></span></Link>
                    {/* <SignedIn>
                    <UserButton />
                </SignedIn> */}
                </div>
            </nav>
        </ClerkProvider>
    )
}