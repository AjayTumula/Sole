import { Inter } from "next/font/google";
import "./globals.css";
import './layout.scss'
import Providers from "./themeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <script src="https://kit.fontawesome.com/eb380a6b56.js" crossOrigin="anonymous" defer></script>
    </head>
      <body className={inter.className}>
            <Providers>    
              {children}
          </Providers>         
      </body>
    </html>
  );
}
