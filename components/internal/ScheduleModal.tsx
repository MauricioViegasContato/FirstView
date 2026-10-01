'use client';

import React, { useState } from 'react';
import { Production, Profile, Equipment, ProductionCrewMember } from '@/lib/types';
import { X, Calendar, Save, AlertTriangle, Check, UserPlus } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prod: Omit<Production, 'id'>) => void;
  teamMembers: Profile[];
  equipmentList: Equipment[];
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  teamMembers,
  equipmentList,
}) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('BYD - DENZA');
  const [vertical, setVertical] = useState('Esportivo & Automotivo');
  const [location, setLocation] = useState('Autódromo Internacional de Brasília');
  const [startTime, setStartTime] = useState('2026-09-25T07:00');
  const [endTime, setEndTime] = useState('2026-09-25T18:00');
  const [directorId, setDirectorId] = useState(teamMembers[0]?.id || '');
  const [notes, setNotes] = useState('');

  // Equipe selecionada com papéis
  const [selectedCrewIds, setSelectedCrewIds] = useState<string[]>([teamMembers[0]?.id || '']);
  // Equipamentos selecionados
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCrewMember = (id: string) => {
    if (selectedCrewIds.includes(id)) {
      setSelectedCrewIds(selectedCrewIds.filter((cid) => cid !== id));
    } else {
      setSelectedCrewIds([...selectedCrewIds, id]);
    }
  };

  const toggleEquipment = (id: string) => {
    if (selectedEquipmentIds.includes(id)) {
      setSelectedEquipmentIds(selectedEquipmentIds.filter((eid) => eid !== id));
    } else {
      setSelectedEquipmentIds([...selectedEquipmentIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const director = teamMembers.find((m) => m.id === directorId);

    const crewPayload: ProductionCrewMember[] = selectedCrewIds.map((cid) => {
      const member = teamMembers.find((m) => m.id === cid);
      return {
        profile_id: cid,
        full_name: member?.full_name || 'Membro',
        assigned_role: member?.position || 'Operador',
      };
    });

    const newProd: Omit<Production, 'id'> = {
      title,
      client_name: clientName,
      vertical,
      location,
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
      status: 'confirmada',
      director_id: directorId,
      director_name: director?.full_name || 'Diretor First View',
      notes,
      crew: crewPayload,
      equipment_ids: selectedEquipmentIds,
    };

    onSave(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0E1015] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Escalar Nova Diária de Gravação</h3>
              <p className="text-xs text-slate-400">
                Alocação de profissionais e reserva de kits de equipamentos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              Título da Diária / Produção
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Campanha BYD Denza - Diária 2 Autódromo"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Cliente / Marca
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: BYD - DENZA, UNICEF, Denise Zuba..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Vertical de Produção
              </label>
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Casamentos & Celebrações">Casamentos & Celebrações</option>
                <option value="Esportivo & Automotivo">Esportivo & Automotivo</option>
                <option value="Arquitetura & Interiores">Arquitetura & Interiores</option>
                <option value="Corporativo & Grandes Marcas">Corporativo & Grandes Marcas</option>
                <option value="Documentários & Causas Globais">Documentários & Causas Globais</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Local da Gravação
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Autódromo / Lago Sul / Setor Bancário"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Início (Call Time)
              </label>
              <input
                type="datetime-local"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Encerramento Previsto
              </label>
              <input
                type="datetime-local"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* ESCALA DE PROFISSIONAIS */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-medium">
              Alocação da Equipe First View (Selecione os profissionais)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-black/40 rounded-xl border border-white/10">
              {teamMembers.map((member) => {
                const isSelected = selectedCrewIds.includes(member.id);
                return (
                  <div
                    key={member.id}
                    onClick={() => toggleCrewMember(member.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-white'
                        : 'bg-white/5 border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-slate-500'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <img
                      src={member.avatar_url}
                      alt={member.full_name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-white leading-none">{member.full_name}</p>
                      <p className="text-[10px] text-slate-400">{member.position}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RESERVA DE EQUIPAMENTOS */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-medium">
              Kits de Equipamentos Reservados para a Diária
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-2 bg-black/40 rounded-xl border border-white/10">
              {equipmentList.map((eq) => {
                const isSelected = selectedEquipmentIds.includes(eq.id);
                const isUnavailable = eq.status === 'manutencao';

                return (
                  <div
                    key={eq.id}
                    onClick={() => !isUnavailable && toggleEquipment(eq.id)}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                      isUnavailable
                        ? 'opacity-40 cursor-not-allowed bg-rose-500/10 border-rose-500/20'
                        : isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-white cursor-pointer'
                        : 'bg-white/5 border-transparent text-slate-400 hover:text-white cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 ${
                        isSelected ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-slate-500'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{eq.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{eq.serial_number}</p>
                      </div>
                    </div>

                    {isUnavailable && (
                      <span className="text-[9px] uppercase font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                        Manutenção
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              Call Sheet & Recomendações
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Chegada às 06h30 para montagem dos rigs. Previsão de luz dourada às 17h40. Canal de rádio 4."
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3D476] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Confirmar e Escalar Diária</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
