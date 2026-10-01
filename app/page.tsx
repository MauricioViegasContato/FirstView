'use client';

import React, { useState } from 'react';
import { Header } from '@/components/public/Header';
import { HeroSection } from '@/components/public/HeroSection';
import { ManifestoSection } from '@/components/public/ManifestoSection';
import { VerticalsSection } from '@/components/public/VerticalsSection';
import { CasesSection } from '@/components/public/CasesSection';
import { ClientsMarquee } from '@/components/public/ClientsMarquee';
import { ContactModal } from '@/components/public/ContactModal';
import { Footer } from '@/components/public/Footer';
import { Film, Sliders, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#07080A] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* HEADER INSTITUCIONAL */}
      <Header onOpenContact={() => setContactModalOpen(true)} />

      {/* HERO SECTION COM SHOWREEL */}
      <HeroSection onOpenContact={() => setContactModalOpen(true)} />

      {/* MANIFESTO FIRST VIEW */}
      <ManifestoSection />

      {/* VERTICAIS (MONKEY BUSINESS HOVER INTERACTION) */}
      <VerticalsSection />

      {/* CASES DE SUCESSO (PORTFÓLIO FILTRÁVEL E LIGHTBOX) */}
      <CasesSection />

      {/* MARCAS & CLIENTES (MARQUEE CONTÍNUO MONOCROMÁTICO) */}
      <ClientsMarquee />

      {/* SEÇÃO DE INFRAESTRUTURA & TECNOLOGIA CINEMATOGRÁFICA */}
      <section id="tecnologia" className="py-28 bg-[#090B0F] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
                <Film className="w-3.5 h-3.5" />
                <span>Padrão de Cinema e Rigor Técnico</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                ARSENAL TÉCNICO DE <span className="text-gradient-gold">ÚLTIMA GERAÇÃO</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Não alugamos equipamentos desconhecidos no dia do projeto. Toda a nossa frota de câmeras RED Komodo-X, Sony FX Cinema Line, lentes anamórficas Atlas Orion e drones Inspire 3 pertence ao inventário proprietário da First View, revisada e calibrada com rigor militar pelo nosso time de TI e Infraestrutura.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-extrabold text-[#D4AF37] font-mono">6K / 8K</span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Sensores Full-Frame RAW</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-extrabold text-[#D4AF37] font-mono">100%</span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Inventário In-House Rastreado</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#F3D476] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] inline-flex items-center gap-2"
                >
                  <span>Agendar Reunião de Produção</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD INTERNO DE PREVIEW DA GESTÃO */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl p-8 glass-panel border border-[#D4AF37]/30 shadow-2xl">
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-widest font-mono text-slate-300">
                      Sistema Interno First View
                    </span>
                  </div>
                  <Link
                    href="/login"
                    className="text-xs text-[#D4AF37] hover:underline font-mono"
                  >
                    Acessar Intranet →
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">RED Komodo-X 6K Cinema</h4>
                      <p className="text-[11px] text-slate-400">Em Uso • Alocado para Rodrigo Alves (DoP)</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Em Diária
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">DJI Inspire 3 8K Cinema Drone</h4>
                      <p className="text-[11px] text-slate-400">Reservado • Campanha BYD Denza</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Reservado
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Atlas Orion 2x Anamorphic Prime Set</h4>
                      <p className="text-[11px] text-slate-400">Disponível • Armário A1 Brasília</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Disponível
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <p className="text-[11px] text-slate-500">
                    Controle de frota integrado por QR Code, alocação de diárias e inventário em tempo real.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* MODAL DE BRIEFING / CONTATO */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </main>
  );
}
