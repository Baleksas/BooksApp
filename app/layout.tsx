import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Notifications from "@/components/shared/Notifications";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Read Away",
  description:
    "Read Away is a platform where you can explore, review, and manage your book collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <main>
            <Notifications />
            <Sidebar>{children}</Sidebar>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
