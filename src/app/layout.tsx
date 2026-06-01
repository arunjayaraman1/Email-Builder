import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Shell from "@/components/layout/shell";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HCP Campaign Studio",
  description: "Create pharma HCP emails in a few clicks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body style={{ margin: 0, padding: 0 }}>
        <Shell>{children}</Shell>
        <Toaster />
      </body>
    </html>
  );
}
