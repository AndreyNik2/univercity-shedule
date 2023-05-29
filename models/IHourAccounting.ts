export interface IHourItem {
  fact: string;
  group: string;
  is_base_subject: number;
  m_1: string;
  m_2: string;
  m_3: string;
  m_4: string;
  m_5: string;
  m_6: string;
  m_7: string;
  m_8: string;
  m_9: string;
  m_10: string;
  m_11: string;
  m_12: string;
  plan: string;
  subject: string;
  subject_type: string;
}

export interface IHourTotal {
  fact: string;
  m_1: string;
  m_2: string;
  m_3: string;
  m_4: string;
  m_5: string;
  m_6: string;
  m_7: string;
  m_8: string;
  m_9: string;
  m_10: string;
  m_11: string;
  m_12: string;
  plan: string;
}

export interface IHourAccounting {
  totals: IHourTotal;
  items: IHourItem[];
}
