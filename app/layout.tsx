import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Wallah We Can | Investing in Childhood for a Sustainable Future',
  description: 'Wallah We Can is a Tunisian non-profit organization that develops entrepreneurial and ecological solutions to address major social issues related to childhood. Join us to make a difference.',
  keywords: 'Wallah We Can, non-profit, Tunisia, childhood, education, health, protection, Green School, Kidchen, Ecolibree',
  openGraph: {
    title: 'Wallah We Can | Investing in Childhood for a Sustainable Future',
    description: 'Join Wallah We Can in our mission to create a sustainable and fair future for children in Tunisia and beyond through innovative, entrepreneurial projects.',
    url: 'https://wallahwecan.org',
    siteName: 'Wallah We Can',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wallah We Can | Investing in Childhood for a Sustainable Future',
    description: 'Support our mission to empower children through sustainable projects in education, health, and environmental action.',
    images: ['/twitter-image.jpg'], 
  },
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const htmlLang = locale || 'en';
  
  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Slabo+27px&family=Poppins:wght@400;600;800&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
