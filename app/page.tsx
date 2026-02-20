import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Servicos from "@/components/Servicos";
import Nichos from "@/components/Nichos";
import Inscricao from "@/components/Inscricao";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Historia />
        <Servicos />
        <Nichos />
        <Inscricao />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}