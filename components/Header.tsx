"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detecta scroll para mudar estilo do header (opcional, mas melhora a UX)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy (mantido)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const sections = navigationLinks.map((link) => document.getElementById(link.id));
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        hasScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-brown-200" 
          : "bg-transparent border-transparent"
      }`}
    >
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
            <div className={`text-2xl font-bold font-slab transition-colors duration-300 ${hasScrolled ? 'bg-gradient-to-r from-brown-600 to-brown-800 bg-clip-text text-transparent' : 'text-white'}`}>
              Furdunço
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative font-medium transition-colors duration-300 hover:text-brown-600 ${
                  hasScrolled 
                    ? activeSection === item.id 
                      ? "text-brown-600" 
                      : "text-gray-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                {/* Indicador animado sob o link ativo */}
                {activeSection === item.id && hasScrolled && (
                   <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brown-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                   />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className={`p-1 transition-colors ${hasScrolled ? 'text-gray-700 hover:text-brown-600' : 'text-white'}`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu com Animação */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-brown-100 overflow-hidden"
          >
            <div className="flex flex-col p-4">
              {navigationLinks.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleCloseMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block w-full text-left py-3 px-4 font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-brown-100 text-brown-800"
                      : "text-gray-700 hover:bg-brown-50 hover:text-brown-600"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}