export interface IJournalHistoryItem {
  date: string;
  hours: string;
  is_current_teacher: boolean;
  number: number;
  original_type: string;
  payment_group: null;
  payment_option: number;
  payment_type: number;
  program_hours: number;
  public_type: string;
  schedule_hours: number;
  sources: string;
  sub_group: number;
  teacher: string;
  topic: string;
}

export interface IJournalTotals {
  class: string;
  program: string;
  schedule: string;
  srs: string;
}

export interface IJournalHistory {
  items: IJournalHistoryItem[];
  totals: IJournalTotals;
}
