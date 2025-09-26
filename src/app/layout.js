import { ThemeProvider } from "@/provider/theme-provider"
import "@/app/globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import Navbar from "@/components/system/navbar";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap"
});

export const metadata = {
  title: "Unified Booking Platform",
  description: "Your all-in-one solution for booking Hotels, Marriage Gardens, and Water Parks.",
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={`${bricolage.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}