'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Film, UserCheck, AlertCircle } from 'lucide-react';
import { FirstViewLogo } from '@/components/ui/FirstViewLogo';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Se já estiver logado, pode ir direto para o dashboard
  if (user) {
    router.push('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas. Tente novamente.');
    }
  };

  const handleQuickDemo = (role: 'admin' | 'member') => {
    loginAsDemo(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#07080A] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* BACKGROUND CINEMÁTICO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,56,35,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* LOGO FIRST VIEW */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="inline-block group mb-4">
            <FirstViewLogo size="lg" />
          </Link>
          <p className="text-xs text-slate-400 font-light">
            Sistema Integrado de TI, Inventário de Cinema & Escalas
          </p>
        </div>

        {/* CARD DE LOGIN */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-2xl">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                E-mail Corporativo
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: diretoria@firstview.com.br"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#FF3823] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#FF3823] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF3823] via-[#FF523F] to-[#CC2513] text-white font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,56,35,0.4)] disabled:opacity-50"
              >
                <span>{isLoading ? 'Autenticando...' : 'Entrar no Sistema'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* DIVISOR DE ACESSO RÁPIDO PARA AVALIAÇÃO */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-4 bg-[#0E1015] text-[10px] uppercase tracking-widest text-slate-500 font-mono">
              Acesso Rápido de Teste (RBAC)
            </span>
          </div>

          {/* BOTÕES DE ACESSO RÁPIDO DEMO */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickDemo('admin')}
              type="button"
              className="p-3 rounded-xl bg-white/5 hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/40 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F3D476]">
                  Diretor (Admin)
                </span>
              </div>
              <p className="text-[10px] text-slate-400 group-hover:text-slate-300">
                Acesso total (CRUD, escalas, inventário)
              </p>
            </button>

            <button
              onClick={() => handleQuickDemo('member')}
              type="button"
              className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/40 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Cinegrafista
                </span>
              </div>
              <p className="text-[10px] text-slate-400 group-hover:text-slate-300">
                Membro (check-in/out, agenda)
              </p>
            </button>
          </div>

          {/* RETORNO AO SITE */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Voltar ao Site Público First View
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
