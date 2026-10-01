'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-32 bg-[#07080A] border-t border-white/5 overflow-hidden">
      {/* GLOW DECORATIVO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Manifesto First View</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
            A LUZ NÃO É ACASO. <br />
            <span className="text-gradient-gold">É A NOSSA LINGUAGEM.</span>
          </h2>
        </div>

        {/* CITAÇÃO EDITORIAL EM DESTAQUE */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 mb-20 border border-white/10 shadow-2xl">
          <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 text-[#D4AF37]/20 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-100 leading-relaxed italic">
              “Não viemos para registrar eventos comuns. Viemos para transformar momentos efêmeros em patrimônio cinematográfico duradouro.”
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-3xl mx-auto text-justify sm:text-center">
              Na First View, acreditamos que a verdadeira sofisticação audiovisual está na harmonia absoluta entre o olhar artístico refinado e a excelência tecnológica. Seja na velocidade de um supercarro no autódromo, no silêncio emocionado de um casamento exclusivo, na imensidão de um projeto arquitetônico ou na gravidade de um documentário humanitário: cada quadro é composto com a disciplina dos mestres do cinema.
            </p>
            <div className="pt-4 flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F3D476] font-bold">Felipe Villela Vieira</span>
              <span className="text-[11px] text-slate-500 uppercase tracking-widest mt-0.5">Fundador & Diretor Criativo</span>
            </div>
          </div>
        </div>

        {/* GRID DE DIFERENCIAIS / PILARES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold mb-5">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Óticas & Sensores de Cinema</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Equipamentos nativos de Hollywood. Lentes anamórficas Atlas Orion, câmeras RED 6K e Sony FX Cinema Line para entregar textura, profundidade de campo e bokeh inconfundíveis.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold mb-5">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Direção Autoral de Cena</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cada diária conta com direção especializada que compreende a psicologia da imagem, ritmo de montagem e sound design de alta imersão sensorial.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold mb-5">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Engenharia de Pós-Produção</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Workflows colorimétricos ACES em DaVinci Resolve Studio calibrado em monitores profissionais OLED HDR, assegurando fidelidade de cor para qualquer tela no mundo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
