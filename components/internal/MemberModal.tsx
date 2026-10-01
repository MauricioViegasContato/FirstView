'use client';

import React, { useState } from 'react';
import { Profile, UserRole } from '@/lib/types';
import { X, Save, UserCheck, Shield, Award } from 'lucide-react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<Profile, 'id'>) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({ isOpen, onClose, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('member');
  const [position, setPosition] = useState('Cinegrafista & Operador de Câmera');
  const [phone, setPhone] = useState('+55 (61) 9');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
  );
  const [skillsInput, setSkillsInput] = useState('Operação Sony FX, Foco Manual, Iluminação');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      full_name: fullName,
      email,
      role,
      position,
      phone,
      avatar_url: avatarUrl,
      skills,
      is_active: true,
      active_shoots_count: 0,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0E1015] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cadastrar Profissional</h3>
              <p className="text-xs text-slate-400">Adicionar cinegrafista, diretor ou editor à equipe First View</p>
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
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Carlos Eduardo"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                E-mail Corporativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos@firstview.com.br"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Nível de Acesso (RBAC)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="member">Membro da Equipe (Cinegrafista/Editor)</option>
                <option value="admin">Administrador (Diretor/Gestor)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                Cargo / Função Principal
              </label>
              <input
                type="text"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Ex: Diretor de Fotografia"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                WhatsApp de Contato
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+55 (61) 98888-7777"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              URL da Foto / Avatar
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
              Habilitações & Skills (separadas por vírgula)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Piloto ANAC Drone, DRT Cinema, DaVinci Studio..."
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
              <span>Salvar Colaborador</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
