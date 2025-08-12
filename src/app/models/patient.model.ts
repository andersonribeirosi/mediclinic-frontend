export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  phone: string;
  specialty: string;
  service_date: string; // ISO ou yyyy-MM-dd
  created_at?: string;
}
