'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/internal/DashboardHeader';
import { ScheduleModal } from '@/components/internal/ScheduleModal';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from 'lucide-react';

export default function CronogramaPage() {
  const {
    isAdmin,
    productions,
    addProduction,
    deleteProduction,
    updateProduction,
    equipmentList,
    teamMembers,
  } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todas');

  const filteredProductions = filterStatus === 'todas'
    ? productions
    : productions.filter((p) => p.status === filterStatus);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja cancelar a diária "${title}"?`)) {
      deleteProduction(id);
    }
  };

  const handleMarkCompleted = (prod: any) => {
    updateProduction({
      ...prod,
      status: 'concluida',
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <DashboardHeader
        title="Cronograma & Escalas de Gravação"
        subtitle="Alocação de equipe técnica, horários de call time e kits de cinema por diária."
        actions={
          isAdmin ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3D476] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Escalar Nova Diária</span>
            </button>
          ) : undefined
        }
      />

      <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* FILTROS E INDICADORES DE CALENDÁRIO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Filtrar por Status:</span>
            <div className="flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
              {['todas', 'confirmada', 'planejamento', 'concluida'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                    filterStatus === st
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {filteredProductions.length} diárias encontradas
          </div>
        </div>

        {/* LISTA DE DIÁRIAS / PRODUÇÕES */}
        <div className="space-y-5">
          {filteredProductions.map((prod) => {
            const startDate = new Date(prod.start_time);
            const endDate = new Date(prod.end_time);

            // Mapear equipamentos alocados para esta diária
            const reservedEquipments = equipmentList.filter((eq) =>
              prod.equipment_ids.includes(eq.id)
            );

            return (
              <div
                key={prod.id}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6"
              >
                {/* CABEÇALHO DA DIÁRIA */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-md text-xs uppercase font-bold tracking-widest bg-[#D4AF37]/15 text-[#F3D476] border border-[#D4AF37]/30">
                        {prod.client_name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {prod.vertical}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {prod.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs uppercase font-bold tracking-wider ${
                      prod.status === 'confirmada'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : prod.status === 'planejamento'
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-500/15 text-slate-300 border border-slate-500/30'
                    }`}>
                      {prod.status}
                    </span>

                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(prod.id, prod.title)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Cancelar esta diária"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* HORÁRIOS & LOCAL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Call Time & Horário</p>
                      <p className="text-white font-medium text-sm mt-0.5">
                        {startDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                      <p className="text-slate-300 font-mono text-xs">
                        {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} até {endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Locação de Gravação</p>
                      <p className="text-white font-medium text-sm mt-0.5">{prod.location}</p>
                      <p className="text-slate-400 text-xs">Direção de Cena: {prod.director_name || 'Felipe Villela'}</p>
                    </div>
                  </div>
                </div>

                {/* EQUIPE ESCALADA & KITS DE EQUIPAMENTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* EQUIPE */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>Profissionais Alocados ({prod.crew.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {prod.crew.map((member) => (
                        <div
                          key={member.profile_id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
                        >
                          <span className="font-semibold text-white">{member.full_name}</span>
                          <span className="text-slate-400 text-[11px] font-mono uppercase">
                            {member.assigned_role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KITS RESERVADOS */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#D4AF37]" />
                      <span>Kits de Câmera & Luz Reservados ({reservedEquipments.length})</span>
                    </h4>
                    <div className="space-y-2">
                      {reservedEquipments.length > 0 ? (
                        reservedEquipments.map((eq) => (
                          <div
                            key={eq.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
                          >
                            <span className="font-medium text-white truncate max-w-[220px]">{eq.name}</span>
                            <span className="text-[#D4AF37] font-mono text-[10px] uppercase">
                              {eq.serial_number}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic py-2">
                          Nenhum kit registrado especificamente para esta diária.
                        </p>
                      )}
                    </div>
                  </div>

                </div>

                {/* CALL SHEET NOTES */}
                {prod.notes && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                        Instruções de Produção & Call Sheet:
                      </span>
                      <span>{prod.notes}</span>
                    </div>
                  </div>
                )}

                {/* AÇÕES DA DIÁRIA */}
                {prod.status !== 'concluida' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleMarkCompleted(prod)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Concluir Diária</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredProductions.length === 0 && (
          <div className="py-16 text-center glass-panel rounded-2xl border border-white/10 space-y-3">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Nenhuma diária agendada</p>
            <p className="text-xs text-slate-500">Utilize o botão "Escalar Nova Diária" para criar um novo registro.</p>
          </div>
        )}

      </div>

      {/* MODAL DE ESCALA */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addProduction}
        teamMembers={teamMembers}
        equipmentList={equipmentList}
      />
    </div>
  );
}
