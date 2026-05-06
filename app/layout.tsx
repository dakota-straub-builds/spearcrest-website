import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-grotesk", weight: ["400","500","600","700"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","600","700"] });
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-display", weight: ["400"], style: ["normal","italic"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://spearcrestdigital.com"),
  title: {
    default: "SpearCrest Digital — Marketing that shows up for service businesses",
    template: "%s · SpearCrest Digital",
  },
  description: "Louisville-based digital marketing agency running SEO, Google Ads, and Business Profile management for service businesses across the South & Midwest.",
  keywords: ["digital marketing Louisville", "SEO agency Kentucky", "Google Ads management", "Google Business Profile", "junk removal marketing", "roofing SEO", "law firm marketing", "local SEO"],
  openGraph: {
    title: "SpearCrest Digital — Marketing that shows up for service businesses",
    description: "SEO, Google Ads, and Business Profile management built for service businesses.",
    url: "https://spearcrestdigital.com",
    siteName: "SpearCrest Digital",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "SpearCrest Digital", description: "Marketing that shows up for your service business." },
  robots: { index: true, follow: true },
  icons: { icon: "/spearcrest-logo.png", apple: "/spearcrest-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jakarta.variable} ${instrument.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
