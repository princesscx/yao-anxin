export class User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  deviceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Medicine {
  id: string;
  userId: string;
  name: string;
  genericName: string;
  dosage: string;
  unit: string;
  frequency: string;
  times: string[];
  method: string;
  contraindications?: string;
  sideEffects?: string;
  slot?: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class MedicationRecord {
  id: string;
  userId: string;
  medicineId: string;
  medicineName: string;
  scheduledTime: string;
  takenTime?: string;
  status: 'pending' | 'taken' | 'missed';
  dosage: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Device {
  id: string;
  userId: string;
  name: string;
  deviceType: string;
  status: 'online' | 'offline';
  signal: 'strong' | 'medium' | 'weak';
  battery: number;
  lastSync?: Date;
  firmware: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Message {
  id: string;
  userId: string;
  type: 'alarm' | 'reminder' | 'success' | 'system';
  title: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export class AlarmSetting {
  id: string;
  userId: string;
  voiceReminder: boolean;
  screenFlash: boolean;
  familyNotification: boolean;
  missedAlarm: boolean;
  alarmInterval: number;
  missedThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}
