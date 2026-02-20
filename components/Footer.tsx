import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="bg-gradient-to-t from-brown-900 to-brown-800 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <div className="text-2xl font-bold text-white mb-4 font-slab">
            Furdunço
          </div>
          <div className="flex items-center justify-center text-white/80 mb-4 font-lora">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Av. Olegário Maciel, 742 - Loja 2010 - Centro, Belo Horizonte - MG, 30180-110</span>
          </div>
        </div>

        <div className="border-t border-brown-700 pt-6">
          <p className="text-white/60 text-sm font-lora">
            © {new Date().getFullYear()} Furdunço Loja Colaborativa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}