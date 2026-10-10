import type {Metadata} from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata={title:"Rabyte-Tech | The Zero-Fee Digital Product Marketplace",description:"Discover top-tier digital products, AI tools, templates, and courses. Creators can list their products for free and keep 100% of their revenue."};


export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
