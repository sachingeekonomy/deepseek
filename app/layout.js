import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeepSeek",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <ThemeContextProvider>
          <html lang="en">
            <body className={`${inter.className} antialiased`}>
              <Toaster toastOptions={
                {
                  success: {style: { background: "black", color: "white"}},
                  error: {style: { background: "black", color: "white"}}
                }
              }/>
              {children}
            </body>
          </html>
        </ThemeContextProvider>
      </AppContextProvider>
    </ClerkProvider>
  );
}
