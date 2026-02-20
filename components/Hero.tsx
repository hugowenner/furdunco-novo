import { MapPin, Users } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('/assets/mercadonovo03.png')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-brown-800 opacity-60" />

      {/* Conteúdo */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto bg-brown-900/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight font-slab">
            Bem-vindo ao nosso Furdunço
          </h1>
          <h2 className="text-xl md:text-3xl text-brown-100 mb-8 font-light font-lora">
            Loja Colaborativa de pequenos produtores
          </h2>
          <div className="flex justify-center space-x-4 text-sm text-brown-200 font-lora">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Mercado Novo, BH
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Espaço Colaborativo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}