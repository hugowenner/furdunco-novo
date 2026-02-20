"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navigationLinks = [
  { id: "historia", label: "História" },
  { id: "servicos", label: "Serviços" },
  { id: "nichos", label: "Alugue um Nicho" },
  { id: "inscricao", label: "Inscrição" },
  { id: "instagram", label: "Instagram" },
  { id: "contato", label: "Contato" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Lógica do Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Detecta o item no meio da tela
    );

    const sections = navigationLinks.map((link) => document.getElementById(link.id));
    // Adiciona hero para observar, mas não está no menu de navegação
    const hero = document.getElementById("hero");
    
    if (hero) observer.observe(hero);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (hero) observer.unobserve(hero);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-brown-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          
          <Link href="/#hero" className="flex items-center" onClick={handleCloseMenu}>
            <Image 
              src="/assets/logo.png" 
              alt="Logo Furdunço" 
              width={32} 
              height={32} 
              className="h-8 w-auto mr-2" 
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-brown-600 to-brown-800 bg-clip-text text-transparent font-slab">
              Furdunço
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-medium transition-all duration-300 hover:text-brown-600 ${
                  activeSection === item.id
                    ? "text-brown-600 border-b-2 border-brown-600"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className="text-gray-700 hover:text-brown-600 p-1"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100 border-t border-brown-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 bg-white">
          {navigationLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleCloseMenu}
              className={`block w-full text-left py-3 px-4 font-medium transition-colors duration-200 ${
                activeSection === item.id
                  ? "bg-brown-100 text-brown-800"
                  : "text-gray-700 hover:bg-brown-50 hover:text-brown-600"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}