import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/components/context/use-auth";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store'

const mitr = Sarabun({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "http://210.246.215.108:3000"
      : "http://localhost:3000"
  ),
  title: {
    default: "Srisongrak Wittaya School",
    template: "%s - Srisongrak Wittaya",
    absolute: "Home - Srisongrak Wittaya",
  },
  description: "เรียนดี มีวินัย ใฝ่กีฬา ร่วมพัฒนาชุมชน ฝึกฝนอาชีพ 231 หมู่ที่ 2 ตำบลด่านซ้าย อำเภอด่านซ้าย จังหวัดเลย 42120 สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาเลย หนองบัวลำภู",
  openGraph: {
    siteName: "Srisongrak Wittaya School",
    images: ["images/hero.jpg"]
  },
  twitter: {
    title: "Srisongrak Wittaya School",
    images: ["images/hero.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={mitr.style}
        className="antialiased"
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
