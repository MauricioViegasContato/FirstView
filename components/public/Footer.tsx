'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin, Lock, ArrowUpRight } from 'lucide-react';
import { FirstViewLogo } from '@/components/ui/FirstViewLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-20 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <FirstViewLogo size="md" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              Produtora audiovisual boutique especializada em narrativas cinematográficas de alto padrão. 
              Equipamentos de padrão internacional, pós-produção ACES e olhar autoral para marcas e pessoas extraordinárias.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/firstviewfilms/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#FF3823] border border-white/10 transition-colors flex items-center gap-2 text-xs"
              >
                <Instagram className="w-4 h-4 text-[#FF3823]" />
                <span className="font-medium">@firstviewfilms</span>
              </a>
            </div>
          </div>

          {/* VERTICAIS */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">Especialidades</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#verticais" className="hover:text-[#D4AF37] transition-colors">Casamentos Exclusivos</a></li>
              <li><a href="#verticais" className="hover:text-[#D4AF37] transition-colors">Esportivo & Automotivo</a></li>
              <li><a href="#verticais" className="hover:text-[#D4AF37] transition-colors">Arquitetura & Design</a></li>
              <li><a href="#verticais" className="hover:text-[#D4AF37] transition-colors">Grandes Marcas</a></li>
              <li><a href="#verticais" className="hover:text-[#D4AF37] transition-colors">Documentários Sociais</a></li>
            </ul>
          </div>

          {/* LOCALIZAÇÃO & CONTATO */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">Brasília / Brasil</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Lago Sul / Eixo Monumental • Brasília - DF, Brasil</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>+55 (61) 98123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>contato@firstview.com.br</span>
              </p>
            </div>
          </div>

          {/* ACESSO RESTRITO */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-bold">Intranet & TI</h4>
            <p className="text-xs text-slate-400">
              Ambiente protegido para colaboradores, diretores e operadores de câmera da produtora.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 text-xs uppercase tracking-wider font-semibold transition-all group"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Acesso da Equipe</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} First View Films Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Serviço</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade</span>
            <span className="text-[#D4AF37]/80 font-mono">DCI 4K Cinema Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
