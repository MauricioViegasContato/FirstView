'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VERTICALS } from '@/lib/mockData';
import { VerticalItem } from '@/lib/types';
import { ArrowRight, Video, Sparkles, Camera, Check } from 'lucide-react';

export const VerticalsSection: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState<VerticalItem>(VERTICALS[0]);

  return (
    <section id="verticais" className="py-32 bg-[#0A0C10] border-t border-white/5 relative overflow-hidden">
      {/* GLOW DECORATIVO DE FUNDO */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Áreas de Atuação</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              VERTICAIS <span className="text-gradient-gold">CINEMÁTICAS</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Passe o mouse sobre as verticais para visualizar o preview de cada especialidade audiovisual e seus setups de câmera dedicados.
          </p>
        </div>

        {/* ESTRUTURA INTERATIVA (ESTILO MONKEY BUSINESS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LISTA DE VERTICAIS (ESQUERDA) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            {VERTICALS.map((vertical, idx) => {
              const isSelected = activeVertical.id === vertical.id;

              return (
                <div
                  key={vertical.id}
                  onMouseEnter={() => setActiveVertical(vertical)}
                  onClick={() => setActiveVertical(vertical)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-white/10 to-white/5 border-[#D4AF37]/60 shadow-[0_4px_30px_rgba(212,175,55,0.15)]'
                      : 'bg-[#11141A]/50 hover:bg-[#151922] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-bold transition-colors ${
                        isSelected ? 'text-[#D4AF37]' : 'text-slate-500 group-hover:text-slate-300'
                      }`}>
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {vertical.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {vertical.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`p-2 rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37] text-black translate-x-1'
                        : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Detalhe extra visível quando selecionado */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {vertical.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {vertical.clients.map((client) => (
                          <span
                            key={client}
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PALCO DINÂMICO DE PRÉ-VISUALIZAÇÃO (DIREITA) */}
          <div className="lg:col-span-6 relative min-h-[460px] rounded-3xl overflow-hidden glass-panel border border-white/15 flex flex-col justify-end p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
              >
                {activeVertical.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    key={activeVertical.videoUrl}
                    poster={activeVertical.image}
                    className="w-full h-full object-cover filter brightness-[0.5] contrast-110"
                  >
                    <source src={activeVertical.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={activeVertical.image}
                    alt={activeVertical.title}
                    className="w-full h-full object-cover filter brightness-[0.5] contrast-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* OVERLAY DE METADADOS DO PALCO */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#F3D476] text-xs font-mono">
                <Video className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>PREVIEW AO VIVO DA VERTICAL</span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activeVertical.title}
                </h4>
                <p className="text-sm text-slate-300 font-light max-w-xl">
                  {activeVertical.stats}
                </p>
              </div>

              {/* SETUP DE CÂMERA & LENTES UTILIZADAS */}
              <div className="p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                    Setup de Câmera & Ótica Padrão
                  </p>
                  <p className="text-xs text-white mt-0.5 font-medium">
                    {activeVertical.camera_kit}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
