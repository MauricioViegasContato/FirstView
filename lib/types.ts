export type UserRole = 'admin' | 'member';

export type EquipmentStatus = 'disponivel' | 'em_uso' | 'manutencao' | 'reservado';

export type EquipmentCategory = 
  | 'camera' 
  | 'lente' 
  | 'luz' 
  | 'drone' 
  | 'audio' 
  | 'estabilizador_suporte' 
  | 'acessorio';

export type ProductionStatus = 
  | 'planejamento' 
  | 'confirmada' 
  | 'em_gravacao' 
  | 'pos_producao' 
  | 'concluida' 
  | 'cancelada';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  position: string;
  phone?: string;
  avatar_url: string;
  skills: string[];
  is_active: boolean;
  active_shoots_count?: number;
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  serial_number: string;
  category: EquipmentCategory;
  status: EquipmentStatus;
  current_holder_id?: string | null;
  current_holder_name?: string | null;
  location_storage: string;
  daily_rate?: number;
  notes?: string;
  last_maintenance_date?: string;
}

export interface ProductionCrewMember {
  profile_id: string;
  full_name: string;
  assigned_role: string;
  avatar_url?: string;
}

export interface Production {
  id: string;
  title: string;
  client_name: string;
  vertical: string;
  location: string;
  start_time: string;
  end_time: string;
  status: ProductionStatus;
  director_id?: string;
  director_name?: string;
  notes?: string;
  crew: ProductionCrewMember[];
  equipment_ids: string[];
}

export interface ProjectCase {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  director: string;
  dop: string;
  thumbnail: string;
  videoUrl: string;
  synopsis: string;
  tags: string[];
  camera_used: string;
  aspect_ratio?: string;
}

export interface ClientBrand {
  id: string;
  name: string;
  sector: string;
  logoUrl?: string;
}

export interface VerticalItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stats: string;
  camera_kit: string;
  image: string;
  videoUrl?: string;
  clients: string[];
}
