'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Check, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vertical, setVertical] = useState('Corporativo & Grandes Marcas');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Olá First View Films! Me chamo ${name || 'Cliente'} e gostaria de solicitar um orçamento/briefing para um projeto na vertical: ${vertical}.\n\nContato: ${phone || 'Não informado'} | ${email || 'Não informado'}\nDetalhes: ${message || 'Gostaria de agendar uma reunião.'}`
    );
    window.open(`https://wa.me/5561981234567?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#0E1015] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* BOTÃO FECHAR */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inicie Sua Produção</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                SOLICITAR <span className="text-gradient-gold">BRIEFING</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-light">
                Conte-nos sobre a visão do seu filme ou campanha. Retornaremos com uma proposta e análise de viabilidade técnica em até 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Nome Completo ou Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana Silva / BYD Brasil"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                      E-mail Corporativo
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                      WhatsApp / Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(61) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Vertical do Projeto
                  </label>
                  <select
                    value={vertical}
                    onChange={(e) => setVertical(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Casamentos & Celebrações Exclusivas">Casamentos & Celebrações Exclusivas</option>
                    <option value="Esportivo & Automotivo">Esportivo & Alta Performance</option>
                    <option value="Arquitetura & Design de Luxo">Arquitetura & Interiores</option>
                    <option value="Corporativo & Grandes Marcas">Corporativo & Grandes Marcas</option>
                    <option value="Documentários & Causas Globais">Documentários & Causas Globais</option>
                    <option value="Outro Formato">Outro Formato / Projeto Especial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Detalhes do Projeto / Data Prevista
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva o objetivo do filme, referências visuais e prazos desejados..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3D476] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 fill-black" />
                    <span>Enviar Proposta</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="px-5 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Direto</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Briefing Recebido!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Agradecemos o interesse na First View Films. Nossa equipe de direção e atendimento entrará em contato em breve para alinhar os próximos passos.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Continuar no WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
