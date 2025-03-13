import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title:"Weight Loss"
} 

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors/>
        </CartProvider>
      </body>
    </html>
  );
}
