'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Clock, Shield, User, Bell, CheckCircle, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  const { user, isAdmin, loginAsDemo } = useAuth();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-[#07080A]/80 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* RELÓGIO OFICIAL DE BRASÍLIA */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>BSB {timeString || '14:00:00'}</span>
        </div>

        {/* ATALHO DE TESTE RBAC (TROCAR CARGO EM TEMPO REAL) */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
          <button
            onClick={() => loginAsDemo('admin')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
              isAdmin
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Alternar para visão de Diretor/Admin"
          >
            <Shield className="w-2.5 h-2.5" />
            <span>Admin</span>
          </button>
          <button
            onClick={() => loginAsDemo('member')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
              !isAdmin
                ? 'bg-cyan-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Alternar para visão de Membro da Equipe"
          >
            <User className="w-2.5 h-2.5" />
            <span>Membro</span>
          </button>
        </div>

        {/* AÇÕES CUSTOMIZADAS DA PÁGINA (Ex: Botão "+ Novo Equipamento") */}
        {actions && <div>{actions}</div>}
      </div>
    </header>
  );
};
