'use client';

import React from 'react';
import { CLIENT_BRANDS } from '@/lib/mockData';
import { Sparkles } from 'lucide-react';

export const ClientsMarquee: React.FC = () => {
  // Dividir em duas linhas para um visual dinâmico com movimentos opostos
  const rowOne = CLIENT_BRANDS.slice(0, 9);
  const rowTwo = CLIENT_BRANDS.slice(9);

  return (
    <section id="clientes" className="py-24 bg-[#0A0C10] border-t border-white/5 overflow-hidden relative">
      {/* GLOW DECORATIVO CENTRAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-40 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Confiança de Grandes Líderes</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          MARCAS QUE <span className="text-gradient-gold">CONFIAM EM NOSSAS LENTES</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto font-light">
          Corporações globais, instituições públicas federais, marcas premium e projetos humanitários de relevância mundial.
        </p>
      </div>

      {/* GRADIENTES DE DESVANECIMENTO LATERAL (FADE IN/OUT) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#0A0C10] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#0A0C10] to-transparent z-10 pointer-events-none" />

        {/* LINHA 1: MOVIMENTO ESQUERDA (Com logos duplicados para loop contínuo perfeito) */}
        <div className="flex w-max space-x-6 animate-marquee pause-on-hover mb-6">
          {[...rowOne, ...rowOne, ...rowOne].map((brand, idx) => (
            <div
              key={`${brand.id}-r1-${idx}`}
              className="group flex items-center gap-4 px-7 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#D4AF37]/40 transition-all cursor-default backdrop-blur-sm"
            >
              {/* Logo Real (SVG/PNG) ou Badge Tipográfico Monocromático */}
              {brand.logoUrl ? (
                <div className="h-8 flex items-center justify-center min-w-[90px] max-w-[140px]">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-7 max-w-[130px] object-contain filter grayscale brightness-200 opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:filter-none transition-all duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/10 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#D4AF37]">
                    {brand.name.substring(0, 2)}
                  </span>
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-[0.15em] text-slate-300 group-hover:text-white transition-colors uppercase whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                  {brand.sector}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* LINHA 2: MOVIMENTO DIREITA (REVERSO) */}
        <div className="flex w-max space-x-6 animate-marquee-reverse pause-on-hover">
          {[...rowTwo, ...rowTwo, ...rowTwo].map((brand, idx) => (
            <div
              key={`${brand.id}-r2-${idx}`}
              className="group flex items-center gap-4 px-7 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#D4AF37]/40 transition-all cursor-default backdrop-blur-sm"
            >
              {brand.logoUrl ? (
                <div className="h-8 flex items-center justify-center min-w-[90px] max-w-[140px]">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-7 max-w-[130px] object-contain filter grayscale brightness-200 opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:filter-none transition-all duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/10 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#D4AF37]">
                    {brand.name.substring(0, 2)}
                  </span>
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold tracking-[0.15em] text-slate-300 group-hover:text-white transition-colors uppercase whitespace-nowrap">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                  {brand.sector}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
