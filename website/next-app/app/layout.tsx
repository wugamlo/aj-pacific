import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "AJ Pacific | Your Partner in AI & Finance",
  description:
    "Practical AI education, consulting, and controlling from Hong Kong. Orientation, opportunity assessment, automation, and financial clarity for small and mid-sized organisations.",
};

// Dynamically import ChatWidget with no SSR to prevent chunk loading issues
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={`${lato.className} min-h-screen flex flex-col`}>
        <nav className="fixed top-0 w-full z-50 glass m-4 max-w-4xl left-1/2 -translate-x-1/2 px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center h-10">
            <img src="/images/ajp-logo.jpg" alt="AJ Pacific Logo" className="h-10 w-auto" />
          </Link>
          <div className="space-x-6 text-sm font-medium text-slate-900 flex items-center">
            {/* Services Dropdown */}
            <div className="relative group">
              <Link 
                href="/services" 
                className="hover:text-brand transition-colors flex items-center gap-1 py-2"
              >
                Services
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {/* Dropdown Menu — Education → Consulting → Controlling */}
              <div className="absolute top-full left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                <div className="glass py-2 shadow-xl">
                  <Link
                    href="/services/education"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand transition-colors"
                  >
                    <div className="font-medium">AI Education</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Practical orientation before you act
                    </div>
                  </Link>
                  <Link
                    href="/services/ai"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand transition-colors"
                  >
                    <div className="font-medium">AI Consulting</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Opportunity scan to agents & enablement
                    </div>
                  </Link>
                  <Link
                    href="/services/controlling"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-brand/10 hover:text-brand transition-colors"
                  >
                    <div className="font-medium">Controlling & Performance</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      KPIs, budgeting & forecasting
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/explore" className="hover:text-brand transition-colors">Explore</Link>
            <Link href="/about" className="hover:text-brand transition-colors">About</Link>
            <Link href="/contact" className="hover:text-brand transition-colors">Contact</Link>
          </div>
        </nav>
        <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
