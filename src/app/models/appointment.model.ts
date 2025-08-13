import { Patient } from "./patient.model";

export interface Appointment {
  id?: number;                // Identificador único da consulta
  patient_id: number;         // ID do paciente (FK)
  patient?: Patient;          // Dados completos do paciente (opcional, se quiser carregar junto)
  doctor_id: number;          // ID do médico (FK)
  specialty?: string;         // Especialidade da consulta
  date: string;               // Data no formato YYYY-MM-DD
  time: string;               // Hora no formato HH:mm
  reason?: string;            // Motivo da consulta
  status?: 'scheduled' | 'completed' | 'canceled'; // Status
  notes?: string;             // Observações do médico
  created_at?: string;        // Data de criação
  updated_at?: string;        // Última atualização
}
