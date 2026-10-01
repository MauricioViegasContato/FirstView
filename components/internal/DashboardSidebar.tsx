'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Camera,
  CalendarDays,
  Users,
  ExternalLink,
  LogOut,
  Shield,
  User,
  Sliders,
} from 'lucide-react';
import { FirstViewLogo } from '@/components/ui/FirstViewLogo';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    {
      label: 'Visão Geral',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Equipamentos & Frota',
      href: '/dashboard/equipamentos',
      icon: Camera,
    },
    {
      label: 'Cronograma & Escalas',
      href: '/dashboard/cronograma',
      icon: CalendarDays,
    },
    {
      label: 'Diretório da Equipe',
      href: '/dashboard/equipe',
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 bg-[#0A0C10] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      <div>
        {/* LOGO DA INTRANET */}
        <div className="p-5 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center group">
            <FirstViewLogo size="sm" />
          </Link>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <div className="p-4 space-y-1.5">
          <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
            Módulos Operacionais
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FF3823]/15 text-white border border-[#FF3823]/50 shadow-[0_0_15px_rgba(255,56,35,0.2)] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF3823]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* ATALHO SITE PÚBLICO */}
        <div className="px-4 pt-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/5 border border-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ver Site Público</span>
            </span>
            <span className="text-[10px] text-slate-600 font-mono">↗</span>
          </Link>
        </div>
      </div>

      {/* PERFIL DO USUÁRIO & LOGOUT */}
      <div className="p-4 border-t border-white/10 bg-[#07080A]/60">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.full_name || 'Usuário'}
              className="w-8 h-8 rounded-full object-cover border border-white/20 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.full_name || 'Profissional'}
              </p>
              <div className="flex items-center gap-1.5">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    <Shield className="w-2.5 h-2.5" />
                    Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                    <User className="w-2.5 h-2.5" />
                    Membro
                  </span>
                )}
                <span className="text-[9px] text-slate-500">•</span>
                <span className="text-[9px] text-slate-400 truncate max-w-[80px]">
                  {user?.position?.split(' ')[0] || 'Equipe'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Sair do sistema"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
