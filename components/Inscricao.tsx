"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function Inscricao() {
  return (
    <section id="inscricao" className="py-20 bg-gradient-to-br from-brown-500 via-brown-700 to-brown-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8 text-white font-slab"
        >
          QUER FAZER PARTE?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-lora"
        >
          Clique no botão abaixo e preencha nosso formulário para entrar na lista de espera!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Link
            href="/inscricao"
            className="bg-white text-brown-800 font-bold py-3 px-8 rounded-md text-base hover:bg-brown-100 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center mx-auto w-fit group"
          >
            <Edit className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
            FAZER INSCRIÇÃO
          </Link>
        </motion.div>
      </div>
    </section>
  );
}