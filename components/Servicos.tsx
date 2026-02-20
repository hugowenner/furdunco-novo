import { Users, ShoppingBag, BookOpen, Zap } from "lucide-react";

const servicosItems = [
  {
    title: "Gestão de Vendas Online",
    description: "Sistema online para cadastro de produtos, gestão de estoque e análise de vendas.",
    icon: Zap,
  },
  {
    title: "Vendedores",
    description: "Profissionais engajados e qualificados, atendimento presencial e virtual ao cliente e também ao empreendedor.",
    icon: Users,
  },
  {
    title: "Exposição e Vendas",
    description: "Espaço de destaque no Mercado Novo, parcelamento de vendas e fornecimento de embalagem para os produtos.",
    icon: ShoppingBag,
  },
  {
    title: "Oficinas",
    description: "Única loja colaborativa com disponibilidade de aluguel de espaço exclusivo para workshops.",
    icon: BookOpen,
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="py-20 bg-brown-100/80">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-brown-800 font-slab">Serviços</h2>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto mb-16 font-lora">
            Oferecemos todo o suporte para que você, pequeno produtor, possa focar no que faz de melhor: criar. Conheça os benefícios de fazer parte do nosso coletivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicosItems.map((servico, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brown-100 flex items-center justify-center mb-6">
                <servico.icon className="w-10 h-10 text-brown-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brown-800 font-slab">{servico.title}</h3>
              <p className="text-brown-700 leading-relaxed font-lora flex-grow">{servico.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}