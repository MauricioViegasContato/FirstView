'use client';

import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowDown, ChevronRight, Film, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#07080A]">
      {/* VÍDEO DE FUNDO EM LOOP (SHOWREEL) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.15]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-curved-track-42792-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAYS CINEMÁTICOS */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-[#07080A]/40 to-[#07080A]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      </div>

      {/* CONTEÚDO PRINCIPAL DO HERO */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* BADGE DE AUTORIDADE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#FF3823]/40 backdrop-blur-md mb-8 text-xs font-medium tracking-[0.25em] text-white uppercase shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF3823] animate-ping" />
          <span>FIRST VIEW FILMS • SHOWREEL 2025/2026</span>
        </motion.div>

        {/* FRASE DE IMPACTO / TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl mb-6"
        >
          VISÕES <span className="text-gradient-red">EXTRAORDINÁRIAS</span> TRANSFORMADAS EM CINEMA.
        </motion.h1>

        {/* SUBTÍTULO REFINADO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10 tracking-wide"
        >
          Produtora audiovisual de alto padrão sediada em Brasília. Narrativas de impacto para marcas globais, 
          casamentos icônicos, arquitetura de luxo e registros documentais.
        </motion.p>

        {/* BOTÕES DE AÇÃO (CTAS) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#cases"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3823] via-[#FF523F] to-[#CC2513] text-white font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,56,35,0.45)] flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Explorar Portfólio</span>
          </a>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#0066FF] font-semibold text-xs uppercase tracking-[0.2em] backdrop-blur-sm transition-all flex items-center justify-center gap-2 group"
          >
            <span>Iniciar Projeto</span>
            <ChevronRight className="w-4 h-4 text-[#0066FF] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* ESPECIFICAÇÕES DE CÂMERA / CREDENCIAIS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left w-full max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-[#FF3823] flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400">Padrão de Cinema</p>
              <p className="text-sm font-semibold text-white">RED & Sony FX 6K/8K</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400">Optics</p>
              <p className="text-sm font-semibold text-white">Atlas Orion Anamorphic</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse flex-shrink-0" />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400">Aéreas Especializadas</p>
              <p className="text-sm font-semibold text-white">Drones FPV & Inspire 3</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#FF3823] font-sans font-bold text-lg flex-shrink-0">ACES</span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400">Color Pipeline</p>
              <p className="text-sm font-semibold text-white">DaVinci Studio HDR</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CONTROLE DE SOM E SCROLL DOWN */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-all backdrop-blur-md"
          title={isMuted ? 'Ativar som' : 'Silenciar som'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
        </button>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono hidden sm:inline">
          {isMuted ? 'Muted Reel' : 'Audio Live'}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 text-slate-400 text-xs tracking-widest uppercase">
        <span>Scroll down</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
      </div>
    </section>
  );
};
