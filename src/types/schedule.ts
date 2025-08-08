export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  assignedEmployees: string[];
}

export interface DaySchedule {
  openingHours: string;
  closingHours: string;
  shifts: Shift[];
}

export interface ScheduleWizardStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DayOfWeek {
  key: string;
  label: string;
  short: string;
}
