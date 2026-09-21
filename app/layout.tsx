import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Rao — Quantitative Research & Software Engineering | Northeastern",
  description:
    "Rahul Rao is a Computer Science student at Northeastern University: ML research on high-frequency market data (temporal nowcasting with lead-lag structure, walk-forward validated) and production data engineering at Wayfair. Seeking Summer 2027 quantitative research, trading, and software engineering internships.",
  keywords: [
    "Rahul Rao",
    "Rahul Rao Northeastern",
    "Rahul Rao quantitative research",
    "Rahul Rao software engineer",
    "quantitative research intern 2027",
    "quantitative trading intern 2027",
    "software engineering intern 2027",
    "quant researcher Northeastern",
    "high-frequency market data machine learning",
    "Northeastern University computer science",
    "Khoury College of Computer Sciences",
    "machine learning engineer Boston",
  ],
  authors: [{ name: "Rahul Rao" }],
  openGraph: {
    title: "Rahul Rao — Quantitative Research & Software Engineering | Northeastern",
    description:
      "ML research on high-frequency market data (0.28 walk-forward R² vs 0.21 Ridge baseline) and production data engineering at Wayfair. Seeking Summer 2027 quant and SWE roles.",
    url: SITE_URL,
    siteName: "Rahul Rao",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rahul Rao — Quant Research & Software Engineering @ Northeastern",
    description:
      "ML research on high-frequency market data and production data engineering at Wayfair. Seeking Summer 2027 quant and SWE internships.",
  },
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "ajbY1T0Gzbt92_4XbxBYkAFezmwIrPiWN0OSbAG30mI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
