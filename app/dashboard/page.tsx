'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/internal/DashboardHeader';
import { ScheduleModal } from '@/components/internal/ScheduleModal';
import { EquipmentModal } from '@/components/internal/EquipmentModal';
import {
  Camera,
  Calendar,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Plus,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const {
    user,
    isAdmin,
    equipmentList,
    productions,
    teamMembers,
    addProduction,
    addEquipment,
  } = useAuth();

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);

  // Métricas
  const totalEquipment = equipmentList.length;
  const inUseEquipment = equipmentList.filter((e) => e.status === 'em_uso');
  const availableEquipment = equipmentList.filter((e) => e.status === 'disponivel');
  const maintenanceEquipment = equipmentList.filter((e) => e.status === 'manutencao');
  const upcomingProductions = productions.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <DashboardHeader
        title="Visão Geral Operacional"
        subtitle={`Bem-vindo, ${user?.full_name}. Central de Controle de Diárias e Infraestrutura.`}
        actions={
          isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsScheduleOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3D476] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nova Diária</span>
              </button>
            </div>
          ) : undefined
        }
      />

      <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
        
        {/* CARDS DE KPIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total da Frota</span>
              <Camera className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{totalEquipment}</span>
              <span className="text-xs text-slate-400">itens registrados</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Valor assegurado</span>
              <span className="text-emerald-400 font-mono">100% Coberto</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Em Gravação (Em Uso)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-300 font-mono">{inUseEquipment.length}</span>
              <span className="text-xs text-slate-400">em campo agora</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <Link href="/dashboard/equipamentos" className="text-[#D4AF37] hover:underline">
                Ver custodiantes →
              </Link>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Disponíveis na Sede</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">{availableEquipment.length}</span>
              <span className="text-xs text-slate-400">prontos para checkout</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Armários A1 & B1</span>
              <span className="text-slate-500">Brasília</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Em Manutenção</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-400 font-mono">{maintenanceEquipment.length}</span>
              <span className="text-xs text-slate-400">em bancada</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Previsão de retorno</span>
              <span className="text-slate-300">24/09</span>
            </div>
          </div>
        </div>

        {/* SEÇÃO PRINCIPAL DIVIDIDA EM 2 COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PRÓXIMAS DIÁRIAS / CRONOGRAMA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Diárias de Gravação Agendadas
                </h2>
              </div>
              <Link
                href="/dashboard/cronograma"
                className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Ver cronograma completo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingProductions.map((prod) => (
                <div
                  key={prod.id}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-[#D4AF37]/20 text-[#F3D476] border border-[#D4AF37]/30">
                          {prod.client_name}
                        </span>
                        <span className="text-[11px] text-slate-400">• {prod.vertical}</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{new Date(prod.start_time).toLocaleDateString('pt-BR')} • {new Date(prod.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      {prod.status}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Equipe ({prod.crew.length}): </span>
                      <span className="text-slate-300 font-medium">
                        {prod.crew.map((c) => c.full_name.split(' ')[0]).join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Kits: </span>
                      <span className="text-[#D4AF37] font-mono">{prod.equipment_ids.length} itens</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EQUIPAMENTOS EM GRAVAÇÃO / AÇÃO RÁPIDA */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  Custódia de Equipamentos em Campo
                </h2>
              </div>
              <Link
                href="/dashboard/equipamentos"
                className="text-xs text-[#D4AF37] hover:underline"
              >
                Inventário →
              </Link>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              {inUseEquipment.length > 0 ? (
                inUseEquipment.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Com: <span className="text-[#F3D476] font-medium">{item.current_holder_name || 'Profissional'}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                      Em Campo
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 py-6 text-center">
                  Todos os equipamentos estão recolhidos na sede.
                </p>
              )}

              {isAdmin && (
                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={() => setIsEquipmentOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Cadastrar Novo Equipamento</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL DE AGENDAMENTO DE DIÁRIA */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSave={addProduction}
        teamMembers={teamMembers}
        equipmentList={equipmentList}
      />

      {/* MODAL DE CADASTRO DE EQUIPAMENTO */}
      <EquipmentModal
        isOpen={isEquipmentOpen}
        onClose={() => setIsEquipmentOpen(false)}
        onSave={addEquipment}
        teamMembers={teamMembers}
      />
    </div>
  );
}
