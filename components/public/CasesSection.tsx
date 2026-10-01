'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_CASES } from '@/lib/mockData';
import { ProjectCase } from '@/lib/types';
import { Play, Sparkles, X, Clock, Camera, User, Award, Maximize2 } from 'lucide-react';

export const CasesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalCase, setActiveModalCase] = useState<ProjectCase | null>(null);

  const categories = ['Todos', 'Automotivo', 'Documentário', 'Arquitetura', 'Casamentos', 'Corporativo'];

  const filteredCases = selectedCategory === 'Todos'
    ? PROJECT_CASES
    : PROJECT_CASES.filter(c => c.category === selectedCategory);

  return (
    <section id="cases" className="py-32 bg-[#07080A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfólio Selecionado</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CASES DE <span className="text-gradient-gold">SUCESSO</span>
            </h2>
          </div>

          {/* FILTROS DE CATEGORIA */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE CASES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCases.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveModalCase(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden glass-card flex flex-col bg-[#0F1116] border border-white/10 hover:border-[#D4AF37]/50"
              >
                {/* THUMBNAIL COM OVERLAYS */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* BADGE DO CLIENTE */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-black/70 backdrop-blur-md text-[#F3D476] border border-[#D4AF37]/30">
                      {project.client}
                    </span>
                  </div>

                  {/* DURAÇÃO */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-slate-300">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{project.duration}</span>
                  </div>

                  {/* PLAY BUTTON HOVER */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#D4AF37]/90 group-hover:bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 fill-black translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* INFO DO PROJETO */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                      {project.category} • {project.year}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#F3D476] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.synopsis}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="truncate max-w-[170px]">{project.camera_used}</span>
                    </div>
                    <span className="text-[#D4AF37] font-semibold group-hover:underline">Assistir Filme</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* MODAL DE VÍDEO LIGHTBOX */}
      <AnimatePresence>
        {activeModalCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-[#0C0E12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* HEADER DO MODAL */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                      {activeModalCase.client}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{activeModalCase.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {activeModalCase.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalCase(null)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* REPRODUTOR DE VÍDEO */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                  poster={activeModalCase.thumbnail}
                  src={activeModalCase.videoUrl}
                />
              </div>

              {/* METADADOS & NOTAS DE PRODUÇÃO */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0E1116]">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Sinopse & Abordagem Visual</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeModalCase.synopsis}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeModalCase.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#F3D476] border border-[#D4AF37]/20 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Direção</p>
                      <p className="text-xs font-semibold text-white">{activeModalCase.director}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Direção de Fotografia & Câmera</p>
                      <p className="text-xs font-semibold text-white">{activeModalCase.dop}</p>
                      <p className="text-[11px] text-slate-400">{activeModalCase.camera_used}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">Formato de Entrega</p>
                      <p className="text-xs font-semibold text-white">4K DCI HDR • Duração {activeModalCase.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
