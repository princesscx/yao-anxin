import { Injectable } from '@nestjs/common';
import { MedicationRecord } from '@/entities';

@Injectable()
export class RecordService {
  private records: MedicationRecord[] = [
    {
      id: '1',
      userId: '1',
      medicineId: '1',
      medicineName: '降压药',
      scheduledTime: '08:00',
      takenTime: '08:05',
      status: 'taken',
      dosage: '1片',
      date: '2024-01-15',
      createdAt: new Date('2024-01-15 08:00:00'),
      updatedAt: new Date(),
    },
    {
      id: '2',
      userId: '1',
      medicineId: '2',
      medicineName: '阿司匹林',
      scheduledTime: '10:00',
      takenTime: '10:08',
      status: 'taken',
      dosage: '1片',
      date: '2024-01-15',
      createdAt: new Date('2024-01-15 10:00:00'),
      updatedAt: new Date(),
    },
    {
      id: '3',
      userId: '1',
      medicineId: '3',
      medicineName: '降糖药',
      scheduledTime: '14:00',
      status: 'missed',
      dosage: '1片',
      date: '2024-01-15',
      createdAt: new Date('2024-01-15 14:00:00'),
      updatedAt: new Date(),
    },
    {
      id: '4',
      userId: '1',
      medicineId: '1',
      medicineName: '降压药',
      scheduledTime: '20:00',
      takenTime: '20:03',
      status: 'taken',
      dosage: '1片',
      date: '2024-01-15',
      createdAt: new Date('2024-01-15 20:00:00'),
      updatedAt: new Date(),
    },
  ];

  findAll(userId?: string, date?: string) {
    let result = this.records;
    if (userId) {
      result = result.filter(r => r.userId === userId);
    }
    if (date) {
      result = result.filter(r => r.date === date);
    }
    return result;
  }

  findOne(id: string) {
    return this.records.find(r => r.id === id);
  }

  findByDate(userId: string, date: string) {
    return this.records.filter(r => r.userId === userId && r.date === date);
  }

  create(data: Partial<MedicationRecord>) {
    const record: MedicationRecord = {
      id: String(Date.now()),
      userId: data.userId || '1',
      medicineId: data.medicineId || '',
      medicineName: data.medicineName || '',
      scheduledTime: data.scheduledTime || '',
      takenTime: data.takenTime,
      status: data.status || 'pending',
      dosage: data.dosage || '',
      date: data.date || new Date().toISOString().split('T')[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.records.push(record);
    return record;
  }

  update(id: string, data: Partial<MedicationRecord>) {
    const index = this.records.findIndex(r => r.id === id);
    if (index !== -1) {
      this.records[index] = { ...this.records[index], ...data, updatedAt: new Date() };
      return this.records[index];
    }
    return null;
  }

  confirmTaken(id: string, takenTime: string) {
    return this.update(id, { status: 'taken', takenTime });
  }

  getComplianceRate(userId: string, startDate: string, endDate: string) {
    const records = this.records.filter(
      r => r.userId === userId && r.date >= startDate && r.date <= endDate
    );
    if (records.length === 0) return 0;
    const takenCount = records.filter(r => r.status === 'taken').length;
    return Math.round((takenCount / records.length) * 100);
  }
}
