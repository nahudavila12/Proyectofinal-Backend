import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NavbarProvider } from "@/context/navbar";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "InstaStay",
  description: "Plataforma de alquiler y reservas de lugares en todo el mundo",
  icons: {
    icon: "/InstaStay.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        
        <NavbarProvider>
        <NavbarComponent />
        {children}
        <Footer />
        </NavbarProvider>
       
      </body>
    </html>
  );
}
