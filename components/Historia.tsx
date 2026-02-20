export default function Historia() {
  return (
    <section id="historia" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('/assets/furduncio.avif')` }}
      />
      <div className="absolute inset-0 bg-brown-800 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-brown-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-white font-slab">QUEM SOMOS</h2>
            <p className="text-lg text-brown-100 leading-relaxed font-lora">
              No epicentro do agito cultural do Mercado Novo, o Furdunço <strong>impulsiona</strong>. Somos o ponto de encontro que aproxima a <strong>alma criativa</strong> de pequenos produtores do público de BH.
              <br /><br />
              Oferecemos nichos acessíveis para transformar sua <strong>paixão em negócio</strong>. Um lugar para expor, vender e crescer, de forma <em>descomplicada</em>. É simples, colaborativo e feito para quem cria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}