-- ==============================================================================
-- FIRST VIEW FILMS - SUPABASE DATABASE SCHEMA (DDL + RLS + SEED)
-- Produtora Audiovisual de Alto Padrão - Brasília/DF
-- ==============================================================================

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'member');
CREATE TYPE equipment_status AS ENUM ('disponivel', 'em_uso', 'manutencao', 'reservado');
CREATE TYPE equipment_category AS ENUM ('camera', 'lente', 'luz', 'drone', 'audio', 'estabilizador_suporte', 'acessorio');
CREATE TYPE production_status AS ENUM ('planejamento', 'confirmada', 'em_gravacao', 'pos_producao', 'concluida', 'cancelada');

-- 2. TABELA DE PERFIS DE USUÁRIOS (Vinculada ao auth.users do Supabase)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'member',
    position TEXT NOT NULL, -- Ex: 'Diretor Geral', 'Diretor de Fotografia', 'Cinegrafista', 'Piloto FPV', 'Editor Chefe'
    phone TEXT,
    avatar_url TEXT,
    skills TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. TABELA DE EQUIPAMENTOS (Inventário de Câmeras, Lentes, Drones, etc.)
CREATE TABLE public.equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    serial_number TEXT UNIQUE NOT NULL,
    category equipment_category NOT NULL,
    status equipment_status NOT NULL DEFAULT 'disponivel',
    current_holder_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    location_storage TEXT DEFAULT 'Sede Brasília - Armário A1',
    daily_rate NUMERIC(10,2) DEFAULT 0.00,
    notes TEXT,
    last_maintenance_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. TABELA DE PRODUÇÕES E DIÁRIAS (Cronograma & Escala)
CREATE TABLE public.productions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    client_name TEXT NOT NULL,
    vertical TEXT NOT NULL, -- 'Casamentos', 'Esportivo/Automotivo', 'Arquitetura', 'Corporativo', 'Documentário'
    location TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status production_status NOT NULL DEFAULT 'planejamento',
    director_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. TABELA DE ESCALA DA EQUIPE (Alocação de Profissionais nas Diárias)
CREATE TABLE public.production_crew (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    production_id UUID NOT NULL REFERENCES public.productions(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_role TEXT NOT NULL, -- Ex: 'Diretor de Fotografia', 'Operador de Câmera A', 'Operador de Drone'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(production_id, profile_id)
);

-- 6. TABELA DE ALOCAÇÃO DE EQUIPAMENTOS (Kits reservados ou em uso nas Diárias)
CREATE TABLE public.production_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    production_id UUID NOT NULL REFERENCES public.productions(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE CASCADE,
    checkout_time TIMESTAMP WITH TIME ZONE,
    checkin_time TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(production_id, equipment_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_crew ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_equipment ENABLE ROW LEVEL SECURITY;

-- Helper function: Verifica se usuário é Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLÍTICAS PROFILES
CREATE POLICY "Perfis visíveis para todos os membros logados" 
    ON public.profiles FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Usuário pode atualizar seu próprio perfil" 
    ON public.profiles FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Admins podem inserir ou modificar qualquer perfil" 
    ON public.profiles FOR ALL 
    TO authenticated 
    USING (public.is_admin());

-- POLÍTICAS EQUIPMENT
CREATE POLICY "Inventário visível para todos os membros autenticados" 
    ON public.equipment FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Membros podem atualizar status de equipamento em checkin/checkout" 
    ON public.equipment FOR UPDATE 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins têm controle total sobre equipamentos" 
    ON public.equipment FOR ALL 
    TO authenticated 
    USING (public.is_admin());

-- POLÍTICAS PRODUCTIONS & CRONOGRAMA
CREATE POLICY "Produções visíveis para todos os membros autenticados" 
    ON public.productions FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Admins podem gerenciar produções e diárias" 
    ON public.productions FOR ALL 
    TO authenticated 
    USING (public.is_admin());

CREATE POLICY "Equipe visível para membros autenticados" 
    ON public.production_crew FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Equipamentos alocados visíveis para membros autenticados" 
    ON public.production_equipment FOR SELECT 
    TO authenticated 
    USING (true);

CREATE POLICY "Admins gerenciam alocações" 
    ON public.production_crew FOR ALL 
    TO authenticated 
    USING (public.is_admin());

CREATE POLICY "Admins gerenciam alocações de equipamento" 
    ON public.production_equipment FOR ALL 
    TO authenticated 
    USING (public.is_admin());

-- ==============================================================================
-- TRIGGER PARA SINCRONIZAÇÃO AUTOMÁTICA DE SIGN-UP DO SUPABASE AUTH
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, position, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Membro First View'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'member'),
        COALESCE(NEW.raw_user_meta_data->>'position', 'Cinegrafista'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
