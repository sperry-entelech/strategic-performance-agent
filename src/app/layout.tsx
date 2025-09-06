import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' }
  ]
};

export const metadata: Metadata = {
  title: {
    default: "Strategic Performance Agent - AI-Powered Daily Briefing",
    template: "%s | Strategic Performance Agent"
  },
  description: "Transform evening reflections into strategic morning directives with AI-powered intelligence. Optimize your goals and priorities while adapting to real-world constraints.",
  keywords: [
    "strategic planning",
    "AI productivity",
    "morning briefing",
    "goal optimization",
    "business intelligence",
    "performance tracking",
    "strategic agent",
    "daily planning"
  ],
  authors: [
    {
      name: "Strategic Performance Agent",
      url: "https://strategic-performance-agent.vercel.app"
    }
  ],
  creator: "Strategic Performance Agent",
  publisher: "Strategic Performance Agent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://strategic-performance-agent.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Strategic Performance Agent',
    title: 'Strategic Performance Agent - AI-Powered Daily Briefing',
    description: 'Transform evening reflections into strategic morning directives with AI-powered intelligence.',
    url: 'https://strategic-performance-agent.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Strategic Performance Agent - AI-Powered Daily Briefing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategic Performance Agent - AI-Powered Daily Briefing',
    description: 'Transform evening reflections into strategic morning directives with AI-powered intelligence.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Strategic Performance Agent",
              "description": "AI-powered daily briefing and strategic planning tool",
              "url": "https://strategic-performance-agent.vercel.app",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Strategic Performance Agent"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black`}
      >
        <ToastProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ToastProvider>
      </body>
    </html>
  );
}
