import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Datavant Job Viewer | View Job Details",
  description:
    "View detailed information about Datavant job postings in a clean, modern interface.",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b bg-white">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-cyan-500"></div>
                <h1 className="text-xl font-bold">Datavant Job Viewer</h1>
              </div>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    Jobs
                  </li>
                  <li className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    About
                  </li>
                  <li className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    Help
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className="border-t bg-slate-50">
          <div className="container mx-auto py-6 px-4 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Datavant Job Viewer | Not
            affiliated with Datavant
          </div>
        </footer>
      </body>
    </html>
  );
}
