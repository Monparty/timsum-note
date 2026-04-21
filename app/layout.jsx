import { Itim } from "next/font/google";
import "./globals.css";

const itim = Itim({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-itim",
});

export const metadata = {
    title: "Timsum Note",
    description: "Timsum Note",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={` ${itim.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
