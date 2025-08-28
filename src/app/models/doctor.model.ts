export interface Doctor {
  id?: number;               // Identificador único
  name: string;              // Nome completo
  crm_number: string;        // Número do CRM
  crm_uf: string;            // UF do CRM (ex.: SP, RJ)
  specialty: string;         // Especialidade principal
  phone?: string;            // Telefone
  email?: string;            // Email
  created_at?: string;       // Data de cadastro
  updated_at?: string;       // Última atualização
  active?: boolean           // indica se o médico esta ativo ou inativo
}
