import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahul Rao — CS Student & Software Developer at Northeastern University",
  description:
    "Rahul Rao is a Computer Science student at Northeastern University (Khoury College) building full-stack applications, machine learning pipelines, and quantitative systems. Open to co-ops and internships.",
  keywords: [
    "Rahul Rao",
    "Rahul Rao Northeastern",
    "Rahul Rao software engineer",
    "Northeastern University computer science",
    "Khoury College of Computer Sciences",
    "software developer Boston",
    "machine learning engineer",
  ],
  authors: [{ name: "Rahul Rao" }],
  openGraph: {
    title: "Rahul Rao — CS Student & Software Developer at Northeastern University",
    description:
      "Computer Science student at Northeastern University building full-stack apps, ML pipelines, and quantitative systems.",
    url: "https://rahulrao.dev",
    siteName: "Rahul Rao",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rahul Rao — CS @ Northeastern University",
    description:
      "Computer Science student at Northeastern University building full-stack apps and ML systems.",
  },
  metadataBase: new URL("https://rahulrao.dev"),
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
      </body>
    </html>
  );
}
