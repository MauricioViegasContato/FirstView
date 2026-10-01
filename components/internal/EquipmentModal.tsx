'use client';

import React, { useState, useEffect } from 'react';
import { Equipment, EquipmentCategory, EquipmentStatus, Profile } from '@/lib/types';
import { X, Save, Camera, AlertCircle } from 'lucide-react';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Equipment, 'id'> | Equipment) => void;
  initialData?: Equipment | null;
  teamMembers: Profile[];
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  teamMembers,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState<EquipmentCategory>('camera');
  const [status, setStatus] = useState<EquipmentStatus>('disponivel');
  const [currentHolderId, setCurrentHolderId] = useState<string>('');
  const [locationStorage, setLocationStorage] = useState('Sede Brasília - Armário A1');
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBrand(initialData.brand);
      setModel(initialData.model);
      setSerialNumber(initialData.serial_number);
      setCategory(initialData.category);
      setStatus(initialData.status);
      setCurrentHolderId(initialData.current_holder_id || '');
      setLocationStorage(initialData.location_storage);
      setDailyRate(initialData.daily_rate || 0);
      setNotes(initialData.notes || '');
    } else {
      setName('');
      setBrand('');
      setModel('');
      setSerialNumber(`FV-${Date.now().toString().slice(-6)}`);
      setCategory('camera');
      setStatus('disponivel');
      setCurrentHolderId('');
      setLocationStorage('Sede Brasília - Sala de Câmeras');
      setDailyRate(500);
      setNotes('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedMember = teamMembers.find((m) => m.id === currentHolderId);

    const payload = {
      ...(initialData ? { id: initialData.id } : {}),
      name,
      brand,
      model,
      serial_number: serialNumber,
      category,
      status,
      current_holder_id: currentHolderId || null,
      current_holder_name: selectedMember ? selectedMember.full_name : null,
      location_storage: locationStorage,
      daily_rate: Number(dailyRate),
      notes,
    };

    onSave(payload as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E1015] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {initialData ? 'Editar Equipamento' : 'Cadastrar Novo Equipamento'}
              </h3>
              <p className="text-xs text-slate-400">
                Controle patrimonial e alocação de frota da First View
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              Nome do Equipamento
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: RED Komodo-X 6K Cinema Camera"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Marca / Fabricante
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ex: RED, Sony, Atlas, DJI, Aputure"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Modelo
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ex: Komodo-X 6K / Orion 50mm T2"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Número de Série / Patrimônio
              </label>
              <input
                type="text"
                required
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Ex: SNY-FX6-9901"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="camera">Câmera de Cinema</option>
                <option value="lente">Lentes / Óticas</option>
                <option value="luz">Iluminação / Luz Contínua</option>
                <option value="drone">Drone Aéreo / FPV</option>
                <option value="audio">Áudio / Microfones</option>
                <option value="estabilizador_suporte">Gimbal / Tripés / Suporte</option>
                <option value="acessorio">Acessório / Baterias / CFexpress</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Status Operacional
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EquipmentStatus)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="disponivel">Disponível (Na Base)</option>
                <option value="em_uso">Em Uso (Em Diária / Com Operador)</option>
                <option value="reservado">Reservado (Para Próxima Produção)</option>
                <option value="manutencao">Em Manutenção / Calibração</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Profissional com a Custódia Atual
              </label>
              <select
                value={currentHolderId}
                onChange={(e) => setCurrentHolderId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Nenhum (Guardado na Sede)</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name} ({member.position})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Local de Armazenamento
              </label>
              <input
                type="text"
                value={locationStorage}
                onChange={(e) => setLocationStorage(e.target.value)}
                placeholder="Ex: Armário A1 - Maleta Pelicase Vermelha"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Valor Base da Diária (R$)
              </label>
              <input
                type="number"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              Observações Técnicas / Acessórios Inclusos
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Acompanha cabos, 4x baterias V-Mount, carregador quádruplo e case estanque."
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
              <span>Salvar Equipamento</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
