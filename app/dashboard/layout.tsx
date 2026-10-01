'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DashboardSidebar } from '@/components/internal/DashboardSidebar';
import { Lock, ArrowRight, ShieldCheck, Film } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, loginAsDemo } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07080A] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">
          Carregando Sessão First View...
        </p>
      </div>
    );
  }

  // PROTEÇÃO DE ROTA (SE NÃO ESTIVER AUTENTICADO)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#07080A] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Acesso Restrito à Equipe</h2>
            <p className="text-xs text-slate-400 mt-1">
              Esta área é restrita aos profissionais cadastrados da First View Films.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link
              href="/login"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3D476] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <span>Ir para Tela de Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => loginAsDemo('admin')}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Entrar Rapidamente como Diretor (Admin)
            </button>
          </div>

          <div className="pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors">
              ← Voltar à página inicial pública
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080A] text-slate-100 flex flex-col md:flex-row">
      {/* SIDEBAR DA INTRANET */}
      <DashboardSidebar />

      {/* ÁREA PRINCIPAL DE CONTEÚDO */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07080A] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
