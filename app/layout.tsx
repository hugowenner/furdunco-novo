import type { Metadata } from "next";
import { Lora, Roboto_Slab } from "next/font/google";
import "./globals.css";

const lora = Lora({ 
  subsets: ["latin"], 
  variable: "--font-lora",
  display: "swap",
});

const slab = Roboto_Slab({ 
  subsets: ["latin"], 
  variable: "--font-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furdunço - Loja Colaborativa",
  description: "Loja Colaborativa de pequenos produtores no Mercado Novo, BH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${slab.variable}`}>
      <body className="font-lora antialiased text-brown-900">
        {children}
      </body>
    </html>
  );
}