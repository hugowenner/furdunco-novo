"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Ruler } from "lucide-react";

// Dados definidos dentro do arquivo
const nichosItems = [
  { numero: "01", valor: "R$ 195,00", largura: "60 cm", altura: "35 cm", profundidade: "50 cm", imgSrc: "/assets/nicho01.png" },
  { numero: "02", valor: "R$ 300,00", largura: "60 cm", altura: "70 cm", profundidade: "50 cm", imgSrc: "/assets/nicho02.png" },
  { numero: "03", valor: "R$ 215,00", largura: "60 cm", altura: "90 cm", profundidade: "50 cm", imgSrc: "/assets/nicho03.png" },
  { numero: "04", valor: "R$ 345,00", largura: "60 cm", altura: "130 cm", profundidade: "50 cm", imgSrc: "/assets/nicho04.png" },
  { numero: "05", valor: "R$ 410,00", largura: "125 cm", altura: "90 cm", profundidade: "50 cm", imgSrc: "/assets/nicho05.png" },
];

const rentalInfo = {
  period: "Periodicidade: Mensal",
  salesFee: "Taxa sobre vendas: 23%",
};

export default function Nichos() {
  return (
    <section id="nichos" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/furduncio.avif')` }}
      />
      <div className="absolute inset-0 bg-brown-800 opacity-90" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-fit mx-auto bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-2xl mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-brown-800 font-slab">Alugue um Nicho</h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {nichosItems.map((nicho, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="w-full h-64 overflow-hidden relative">
                <img src={nicho.imgSrc} alt={`Nicho ${nicho.numero}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-brown-500 to-brown-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 font-slab">
                    Nicho {nicho.numero}
                  </div>
                  <div className="text-3xl font-bold text-brown-800 mb-2 font-slab">{nicho.valor}</div>
                </div>

                <div className="space-y-3 font-lora">
                  <div className="flex items-center text-sm text-brown-700">
                    <Ruler className="w-4 h-4 mr-2 text-brown-600" />
                    <span>L: {nicho.largura}</span>
                  </div>
                  <div className="flex items-center text-sm text-brown-700">
                    <Ruler className="w-4 h-4 mr-2 text-brown-600" />
                    <span>A: {nicho.altura}</span>
                  </div>
                  <div className="flex items-center text-sm text-brown-700">
                    <Ruler className="w-4 h-4 mr-2 text-brown-600" />
                    <span>P: {nicho.profundidade}</span>
                  </div>
                </div>

                <div className="border-t border-brown-200 pt-3 mt-auto font-lora">
                  <div className="flex items-center text-xs text-brown-600 mb-1">
                    <Clock className="w-3 h-3 mr-1 text-brown-500" />
                    <span>{rentalInfo.period}</span>
                  </div>
                  <div className="flex items-center text-xs text-brown-600">
                    <DollarSign className="w-3 h-3 mr-1 text-brown-500" />
                    <span>{rentalInfo.salesFee}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}