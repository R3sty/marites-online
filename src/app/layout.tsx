import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: 'Marites',
  description: 'Tambayan ng mga Marites online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        "bg-white text-slate-900 anialiased light",
        inter.className
      )}>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Navbar/>
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  )
}
