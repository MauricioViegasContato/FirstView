'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FirstViewLogo } from '@/components/ui/FirstViewLogo';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Manifesto', href: '#manifesto' },
    { label: 'Verticais', href: '#verticais' },
    { label: 'Cases & Filmes', href: '#cases' },
    { label: 'Marcas', href: '#clientes' },
    { label: 'Equipamentos', href: '#tecnologia' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07080A]/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#07080A]/90 via-[#07080A]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO OFICIAL FIRST VIEW */}
        <Link href="/" className="group flex items-center">
          <FirstViewLogo size="md" />
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF3823] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* AÇÕES DIREITA */}
        <div className="hidden md:flex items-center gap-4">
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-white bg-gradient-to-r from-[#FF3823]/20 to-[#0066FF]/20 hover:from-[#FF3823]/40 hover:to-[#0066FF]/40 border border-[#FF3823]/60 hover:border-[#FF3823] rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,56,35,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF3823]" />
              <span>Briefing</span>
            </button>
          )}

          {/* BOTÃO DISCRETO DE LOGIN PARA EQUIPE */}
          <Link
            href={user ? '/dashboard' : '/login'}
            className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0066FF]/50 rounded-full transition-all group"
            title={user ? `Logado como ${user.full_name}` : 'Acesso restrito para funcionários'}
          >
            <Lock className="w-3 h-3 text-[#FF3823] group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-medium">
              {user ? 'Intranet' : 'Equipe'}
            </span>
            {user && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0C10] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-widest uppercase text-slate-300 hover:text-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {onOpenContact && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 text-xs uppercase tracking-widest text-center font-bold bg-[#D4AF37] text-black rounded-lg"
              >
                Solicitar Briefing
              </button>
            )}
            <Link
              href={user ? '/dashboard' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-xs uppercase tracking-widest text-center font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{user ? 'Acessar Intranet' : 'Área da Equipe'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
