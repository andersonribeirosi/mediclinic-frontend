export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  rg?: string;
  birth_date: string;
  gender?: string;
  phone: string;
  email?: string;

  // Campos achatados
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip?: string;

  emergency_name?: string;
  emergency_phone?: string;
  emergency_relationship?: string;

  health_plan_name?: string;
  health_plan_card?: string;
  health_plan_validity?: string;

  observations?: string;
  created_at?: string;
  updated_at?: string;
}
