export interface Appointment {
  id?: number;
  patient_id: number;
  date: string;        // formato ISO string para datetime
  doctor: string;
  specialty: string;
  notes?: string;
}
