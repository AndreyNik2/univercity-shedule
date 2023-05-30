export interface ILoadPayment_type_2Item {
  group: string;
  hours_1: number;
  hours_2: number;
  hours_per_student: null;
  is_base_subject: number;
  students_count: number;
  subject: string;
  subject_type: string;
  total: number;
}

export interface ILoadPayment_type_2 {
  total: string;
  items: ILoadPayment_type_2Item[];
}

export interface ILoad {
  changes: [];
  payment_type_1: null;
  payment_type_2: ILoadPayment_type_2
}
