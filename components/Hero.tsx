"use client"; // Necessário para motion

import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

export default function Hero() {
  // Variantes para orquestração (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center shadow-xl scale-105" // Leve scale inicial para efeito parallax sutil
        style={{ backgroundImage: `url('/assets/mercadonovo03.png')` }}
      />
      <div className="absolute inset-0 bg-brown-800 opacity-60" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto bg-brown-900/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight font-slab">
            Bem-vindo ao nosso Furdunço
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-xl md:text-3xl text-brown-100 mb-8 font-light font-lora">
            Loja Colaborativa de pequenos produtores
          </motion.h2>
          <motion.div variants={itemVariants} className="flex justify-center space-x-4 text-sm text-brown-200 font-lora">
            <div className="flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-1" />
              Mercado Novo, BH
            </div>
            <div className="flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              Espaço Colaborativo
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}