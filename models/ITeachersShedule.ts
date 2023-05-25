export interface ITeachersShedule {
  class: string;
  dayOfWeek: number;
  end_time: string;
  group: string;
  number: number;
  oos: number;
  start_time: string;
  subject: string;
  subject_short: string;
  tag: string;
  tagId: number;
}

export interface IDataTeachersShedule {
  data: ITeachersShedule[];
}
