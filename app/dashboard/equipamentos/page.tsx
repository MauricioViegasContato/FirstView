'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/internal/DashboardHeader';
import { EquipmentModal } from '@/components/internal/EquipmentModal';
import { Equipment, EquipmentCategory, EquipmentStatus } from '@/lib/types';
import {
  Camera,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Edit2,
  User,
  ArrowRightLeft,
  QrCode,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function EquipamentosPage() {
  const {
    user,
    isAdmin,
    equipmentList,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    checkoutEquipment,
    checkinEquipment,
    teamMembers,
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const categories = [
    { label: 'Todas as Categorias', value: 'todas' },
    { label: 'Câmeras Cinema', value: 'camera' },
    { label: 'Lentes & Óticas', value: 'lente' },
    { label: 'Iluminação', value: 'luz' },
    { label: 'Drones & FPV', value: 'drone' },
    { label: 'Áudio de Cinema', value: 'audio' },
    { label: 'Estabilizadores & Gimbals', value: 'estabilizador_suporte' },
  ];

  const statuses = [
    { label: 'Todos os Status', value: 'todos' },
    { label: 'Disponível na Sede', value: 'disponivel' },
    { label: 'Em Uso (Em Campo)', value: 'em_uso' },
    { label: 'Reservado', value: 'reservado' },
    { label: 'Em Manutenção', value: 'manutencao' },
  ];

  // Filtro
  const filteredList = equipmentList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.current_holder_name && item.current_holder_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'todas' || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'todos' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingEquipment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Equipment) => {
    setEditingEquipment(item);
    setIsModalOpen(true);
  };

  const handleSave = (itemData: any) => {
    if (editingEquipment) {
      updateEquipment(itemData);
    } else {
      addEquipment(itemData);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover "${name}" do inventário da First View?`)) {
      deleteEquipment(id);
    }
  };

  const handleQuickCheckout = (item: Equipment) => {
    if (user) {
      checkoutEquipment(item.id, user.id, user.full_name);
    }
  };

  const handleQuickCheckin = (item: Equipment) => {
    checkinEquipment(item.id);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <DashboardHeader
        title="Gestão de Inventário & Equipamentos"
        subtitle="Controle patrimonial de câmeras de cinema, óticas, luzes e drones."
        actions={
          isAdmin ? (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3D476] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Equipamento</span>
            </button>
          ) : undefined
        }
      />

      <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* BARRA DE FILTROS & BUSCA */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, série, marca ou custodiante..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#11141A] border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#11141A] border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-[#D4AF37]"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* LISTAGEM DE EQUIPAMENTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((item) => {
            const isAvailable = item.status === 'disponivel';
            const isInUse = item.status === 'em_uso';
            const isMaintenance = item.status === 'manutencao';
            const isReserved = item.status === 'reservado';

            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  {/* CATEGORIA E STATUS */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item.brand} • {item.category}
                    </span>

                    {isAvailable && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Disponível
                      </span>
                    )}
                    {isInUse && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Em Uso
                      </span>
                    )}
                    {isMaintenance && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        Manutenção
                      </span>
                    )}
                    {isReserved && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        <Clock className="w-3 h-3" />
                        Reservado
                      </span>
                    )}
                  </div>

                  {/* NOME E MODELO */}
                  <h3 className="text-base font-bold text-white mb-1 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-[#D4AF37]">
                    S/N: {item.serial_number}
                  </p>

                  {/* CUSTÓDIA ATUAL */}
                  <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Custódia Atual:
                      </span>
                      <span className={`font-semibold ${item.current_holder_name ? 'text-amber-300' : 'text-slate-400'}`}>
                        {item.current_holder_name || 'Na Sede First View'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Local:
                      </span>
                      <span className="text-slate-300 text-[11px] truncate max-w-[150px]">
                        {item.location_storage}
                      </span>
                    </div>
                  </div>

                  {item.notes && (
                    <p className="text-[11px] text-slate-400 mt-3 line-clamp-2 italic">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                {/* AÇÕES (CHECK-IN, CHECK-OUT, EDITAR, DELETAR) */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* AÇÃO DO MEMBRO DA EQUIPE: PEGAR / DEVOLVER */}
                    {isAvailable && (
                      <button
                        onClick={() => handleQuickCheckout(item)}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F3D476] border border-[#D4AF37]/30 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        title="Retirar este equipamento para gravação"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>Retirar (Check-out)</span>
                      </button>
                    )}

                    {isInUse && (
                      <button
                        onClick={() => handleQuickCheckin(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        title="Devolver equipamento à sede"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Devolver (Check-in)</span>
                      </button>
                    )}

                    {isMaintenance && (
                      <button
                        onClick={() => handleQuickCheckin(item)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium"
                      >
                        Liberar Manutenção
                      </button>
                    )}
                  </div>

                  {/* AÇÕES DE ADMINISTRADOR */}
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Editar detalhes do equipamento"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Remover do patrimônio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredList.length === 0 && (
          <div className="py-16 text-center glass-panel rounded-2xl border border-white/10 space-y-3">
            <Camera className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Nenhum equipamento encontrado</p>
            <p className="text-xs text-slate-500">Tente ajustar os termos de busca ou filtros selecionados.</p>
          </div>
        )}

      </div>

      {/* MODAL DE CADASTRO / EDIÇÃO */}
      <EquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingEquipment}
        teamMembers={teamMembers}
      />
    </div>
  );
}
