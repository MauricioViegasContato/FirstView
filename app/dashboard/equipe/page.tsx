'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/internal/DashboardHeader';
import { MemberModal } from '@/components/internal/MemberModal';
import { Profile } from '@/lib/types';
import {
  Users,
  Plus,
  Shield,
  User,
  MessageSquare,
  Mail,
  Phone,
  Award,
  Film,
  Camera,
} from 'lucide-react';

export default function EquipePage() {
  const { isAdmin, teamMembers, addMember } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenWhatsApp = (phone?: string, name?: string) => {
    if (!phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá ${name || 'Colega'}, estou entrando em contato pela plataforma interna da First View Films.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <DashboardHeader
        title="Diretório da Equipe First View"
        subtitle="Quadro de diretores, cinegrafistas, operadores de drone, editores e técnicos."
        actions={
          isAdmin ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3D476] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Profissional</span>
            </button>
          ) : undefined
        }
      />

      <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* GRID DE COLABORADORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => {
            const isUserAdmin = member.role === 'admin';

            return (
              <div
                key={member.id}
                className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  {/* CABEÇALHO DO CARD */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatar_url}
                          alt={member.full_name}
                          className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0A0C10]" />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {member.full_name}
                        </h3>
                        <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    {isUserAdmin ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#D4AF37]/15 text-[#F3D476] border border-[#D4AF37]/30">
                        <Shield className="w-3 h-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        <User className="w-3 h-3" />
                        Membro
                      </span>
                    )}
                  </div>

                  {/* CONTATOS */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* HABILITAÇÕES & SKILLS */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                        Especialidades & Habilitações:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTÃO DE CONTATO DIRETO VIA WHATSAPP */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleOpenWhatsApp(member.phone, member.full_name)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chamar no WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL DE NOVO MEMBRO */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addMember}
      />
    </div>
  );
}
