"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, ArrowLeft } from "lucide-react";

export default function InscricaoPage() {
  const [formData, setFormData] = useState({
    nome: "", email: "", telefone: "", nome_marca: "", instagram_marca: "",
    descricao_marca: "", cidade_marca: "", preco_medio: "", preco_medio_outro: "",
    caixinhas_interesse: [], caixinhas_interesse_outro: "",
    segmento_marca: "", segmento_marca_outro: "", porque_vender: "",
  });
  const [status, setStatus] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [errosCampos, setErrosCampos] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newCaixinhas = checked
          ? [...prev.caixinhas_interesse, value]
          : prev.caixinhas_interesse.filter(item => item !== value);
        return { ...prev, caixinhas_interesse: newCaixinhas };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrosCampos(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("enviando");
    setMensagem("");
    setErrosCampos({});

    // Lógica de envio (mantida do original)
    const dataToSend = {
      ...formData,
      caixinhas_interesse: formData.caixinhas_interesse.includes("Outro")
        ? `${formData.caixinhas_interesse.filter(c => c !== "Outro").join(", ")}${formData.caixinhas_interesse.length > 1 ? ", " : ""}${formData.caixinhas_interesse_outro}`
        : formData.caixinhas_interesse.join(", "),
      preco_medio: formData.preco_medio === "Outro:" ? formData.preco_medio_outro : formData.preco_medio,
      segmento_marca: formData.segmento_marca === "Outro:" ? formData.segmento_marca_outro : formData.segmento_marca,
    };

    // Limpeza de campos auxiliares
    // delete dataToSend.preco_medio_outro; etc...

    try {
      const response = await fetch("https://furdunco.com/backend/processa-inscricao.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();

      if (result.status === "sucesso") {
        setStatus("sucesso");
        setMensagem(result.mensagem);
        // Reset form
        setFormData({ nome: "", email: "", telefone: "", nome_marca: "", instagram_marca: "", descricao_marca: "", cidade_marca: "", preco_medio: "", preco_medio_outro: "", caixinhas_interesse: [], caixinhas_interesse_outro: "", segmento_marca: "", segmento_marca_outro: "", porque_vender: "" });
      } else {
        setStatus("erro");
        setMensagem(result.mensagem || "Ocorreu um erro.");
        if (result.erros_campos) setErrosCampos(result.erros_campos);
      }
    } catch (error) {
      setStatus("erro");
      setMensagem("Falha na comunicação com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/assets/logo.png" alt="Logo Furdunço" width={32} height={32} className="h-8 w-auto mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brown-600 to-brown-800 bg-clip-text text-transparent font-slab">
              Furdunço
            </span>
          </Link>
          <Link href="/" className="font-medium text-gray-700 hover:text-brown-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a Home
          </Link>
        </nav>
      </header>

      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-brown-800 font-slab">Ficha de Inscrição - Furdunço</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left font-lora text-brown-600">
              <p className="mb-4">No Furdunço Loja Colaborativa, oferecemos um espaço que permite que pequenos produtores locais aluguem nichos para exporem, venderem e promoverem suas criações, sem que, para isso, eles precisem investir muitos recursos financeiros.</p>
              <p>Localizada no segundo piso do Mercado Novo, o Furdunço, surgiu da vontade de aproximar o pequeno produtor local do mais novo polo cultural, turístico e gastronômico de Belo Horizonte.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left font-lora text-brown-600">
              <h3 className="text-xl font-bold mb-2 text-brown-800 font-slab">Como vai funcionar?</h3>
              <p>Você escolhe a caixa com tamanho e formato que melhor te atende e paga um aluguel (a cada 4 semanas) bem camarada para expor e vender seus produtos no nosso espaço. Para arcar com despesas de taxas de cartão de crédito e débito, impostos, limpeza, energia, embalagens e funcionários, uma taxa de 23% sobre as vendas será cobrada no final de cada período.</p>
            </div>
            
            {/* Restante do conteúdo informativo... omitido por brevidade, mas seguirá o mesmo padrão do original */}
            
            <p className="text-xl text-brown-800 mb-4 font-slab">Preencha as informações abaixo para entrar na fila de seleção.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
              <p className="text-md text-red-600 font-lora font-bold">
                FILA DE ESPERA - Você será notificado via Whatsapp assim que sua marca for chamada.
              </p>
            </div>

            {mensagem && (
              <div className={`p-3 mb-4 rounded-md text-center font-bold ${status === "sucesso" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {mensagem}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-brown-200">
            
            {/* E-mail */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">E-mail *</label>
              <input type="email" name="email" id="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required maxLength={255} className={`w-full p-3 rounded-md border ${errosCampos.email ? "border-red-500" : "border-brown-200"} focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora`} />
              {errosCampos.email && <p className="text-red-500 text-sm mt-1 font-lora">{errosCampos.email}</p>}
            </div>

            {/* Nome */}
            <div className="mb-4">
              <label htmlFor="nome" className="block text-gray-700 text-lg font-bold mb-2">Seu nome *</label>
              <input type="text" name="nome" id="nome" placeholder="Sua resposta" value={formData.nome} onChange={handleChange} required maxLength={150} className={`w-full p-3 rounded-md border ${errosCampos.nome ? "border-red-500" : "border-brown-200"} focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora`} />
            </div>

            {/* Telefone */}
            <div className="mb-4">
              <label htmlFor="telefone" className="block text-gray-700 text-lg font-bold mb-2">Telefone de contato (WhatsApp) *</label>
              <input type="tel" name="telefone" id="telefone" placeholder="Sua resposta" value={formData.telefone} onChange={handleChange} required maxLength={11} className={`w-full p-3 rounded-md border ${errosCampos.telefone ? "border-red-500" : "border-brown-200"} focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora`} />
            </div>
            
            {/* Nome da Marca */}
            <div className="mb-4">
              <label htmlFor="nome_marca" className="block text-gray-700 text-lg font-bold mb-2">Nome da sua Marca *</label>
              <input type="text" name="nome_marca" id="nome_marca" placeholder="Sua resposta" value={formData.nome_marca} onChange={handleChange} required maxLength={150} className="w-full p-3 rounded-md border border-brown-200 focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora" />
            </div>

            {/* Instagram */}
            <div className="mb-4">
              <label htmlFor="instagram_marca" className="block text-gray-700 text-lg font-bold mb-2">Instagram da sua marca *</label>
              <input type="url" name="instagram_marca" id="instagram_marca" placeholder="Sua resposta" value={formData.instagram_marca} onChange={handleChange} required className="w-full p-3 rounded-md border border-brown-200 focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora" />
            </div>

            {/* Descrição */}
            <div className="mb-4">
              <label htmlFor="descricao_marca" className="block text-gray-700 text-lg font-bold mb-2">Descrição da marca e principais produtos *</label>
              <textarea name="descricao_marca" id="descricao_marca" placeholder="Sua resposta" value={formData.descricao_marca} onChange={handleChange} required rows={4} className="w-full p-3 rounded-md border border-brown-200 focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora" />
            </div>

             {/* Cidade */}
             <div className="mb-4">
              <label htmlFor="cidade_marca" className="block text-gray-700 text-lg font-bold mb-2">De qual cidade é a sua marca? *</label>
              <input type="text" name="cidade_marca" id="cidade_marca" placeholder="Ex: Belo Horizonte" value={formData.cidade_marca} onChange={handleChange} required className="w-full p-3 rounded-md border border-brown-200 focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora" />
            </div>

            {/* Preço Médio (Radio) */}
             <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">Qual o preço médio dos seus produtos? *</label>
              {["menos de R$30,00", "de R$30,00 a R$60", "de R$60,00 R$100,00", "de R$100,00 a R$150,00", "mais de R$150,00", "Outro:"].map(price => (
                <div key={price} className="mb-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="preco_medio" value={price} checked={formData.preco_medio === price} onChange={handleChange} required className="form-radio text-brown-600" />
                    <span className="ml-2 text-gray-700 font-lora">{price}</span>
                  </label>
                  {price === "Outro:" && formData.preco_medio === "Outro:" && (
                    <input type="text" name="preco_medio_outro" placeholder="Especificar" value={formData.preco_medio_outro} onChange={handleChange} className="ml-6 mt-1 p-2 rounded-md border border-brown-200 focus:ring-brown-500 focus:outline-none font-lora w-full sm:w-1/2" />
                  )}
                </div>
              ))}
            </div>

            {/* Caixinhas Interesses (Checkbox) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">Quais caixinhas te interessam? *</label>
              <img src="/assets/nicho001.png" alt="Nicho sizes" className="w-full h-auto rounded-lg shadow-md mb-4 border" />
              
              {["Nicho 01", "Nicho 02", "Nicho 03", "Nicho 04", "Nicho 05", "Outro"].map(box => (
                <div key={box} className="mb-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" name="caixinhas_interesse" value={box} checked={formData.caixinhas_interesse.includes(box)} onChange={handleChange} className="form-checkbox text-brown-600" />
                    <span className="ml-2 text-gray-700 font-lora">{box}</span>
                  </label>
                  {box === "Outro" && formData.caixinhas_interesse.includes("Outro") && (
                    <input type="text" name="caixinhas_interesse_outro" placeholder="Especificar" value={formData.caixinhas_interesse_outro} onChange={handleChange} className="ml-6 mt-1 p-2 rounded-md border border-brown-200 focus:ring-brown-500 focus:outline-none font-lora w-full sm:w-1/2" />
                  )}
                </div>
              ))}
            </div>

            {/* Segmento (Radio) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">Qual é o segmento da sua marca? *</label>
              {["Roupas", "Acessórios", "Sapatos", "Bolsas", "Cama e mesa", "Cosméticos", "Decoração", "Pintura", "Utilitários", "Outro:"].map(segment => (
                 <div key={segment} className="mb-2">
                   <label className="inline-flex items-center">
                     <input type="radio" name="segmento_marca" value={segment} checked={formData.segmento_marca === segment} onChange={handleChange} required className="form-radio text-brown-600" />
                     <span className="ml-2 text-gray-700 font-lora">{segment}</span>
                   </label>
                   {segment === "Outro:" && formData.segmento_marca === "Outro:" && (
                     <input type="text" name="segmento_marca_outro" placeholder="Especificar" value={formData.segmento_marca_outro} onChange={handleChange} className="ml-6 mt-1 p-2 rounded-md border border-brown-200 focus:ring-brown-500 focus:outline-none font-lora w-full sm:w-1/2" />
                   )}
                 </div>
              ))}
            </div>

            {/* Porque Vender */}
            <div className="mb-8">
              <label htmlFor="porque_vender" className="block text-gray-700 text-lg font-bold mb-2">Por que você quer vender com a gente? *</label>
              <textarea name="porque_vender" id="porque_vender" placeholder="Sua resposta" value={formData.porque_vender} onChange={handleChange} required rows={4} className="w-full p-3 rounded-md border border-brown-200 focus:outline-none focus:ring-2 focus:ring-brown-500 font-lora" />
            </div>

            <div className="text-center mt-8">
              <button type="submit" disabled={status === "enviando"} className="bg-brown-600 text-white font-bold py-3 px-10 rounded-md text-base hover:bg-brown-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center">
                <Send className="w-5 h-5 mr-3" />
                {status === "enviando" ? "Enviando..." : "Enviar Inscrição"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}