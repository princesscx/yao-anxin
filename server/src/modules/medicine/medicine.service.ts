import { Injectable } from '@nestjs/common';
import { Medicine } from '@/entities';

@Injectable()
export class MedicineService {
  private medicines: Medicine[] = [
    {
      id: '1',
      userId: '1',
      name: '降压药',
      genericName: '硝苯地平缓释片',
      dosage: '1片',
      unit: '10mg',
      frequency: '每日2次',
      times: ['08:00', '20:00'],
      method: '口服，餐后服用',
      contraindications: '严重低血压、心源性休克禁用',
      sideEffects: '头痛、面部潮红、外周水肿',
      slot: 1,
      enabled: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
    {
      id: '2',
      userId: '1',
      name: '阿司匹林',
      genericName: '阿司匹林肠溶片',
      dosage: '1片',
      unit: '100mg',
      frequency: '每日1次',
      times: ['10:00'],
      method: '口服，空腹服用',
      contraindications: '对阿司匹林过敏、哮喘禁用',
      sideEffects: '胃肠道不适、出血风险增加',
      slot: 2,
      enabled: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
    {
      id: '3',
      userId: '1',
      name: '降糖药',
      genericName: '二甲双胍片',
      dosage: '1片',
      unit: '500mg',
      frequency: '每日1次',
      times: ['14:00'],
      method: '口服，餐中服用',
      contraindications: '严重肝肾功能不全禁用',
      sideEffects: '恶心、腹泻、维生素B12缺乏',
      slot: 3,
      enabled: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
  ];

  findAll(userId?: string) {
    if (userId) {
      return this.medicines.filter(m => m.userId === userId);
    }
    return this.medicines;
  }

  findOne(id: string) {
    return this.medicines.find(m => m.id === id);
  }

  findByUserId(userId: string) {
    return this.medicines.filter(m => m.userId === userId);
  }

  create(data: Partial<Medicine>) {
    const medicine: Medicine = {
      id: String(Date.now()),
      userId: data.userId || '1',
      name: data.name || '',
      genericName: data.genericName || '',
      dosage: data.dosage || '',
      unit: data.unit || '',
      frequency: data.frequency || '',
      times: data.times || [],
      method: data.method || '',
      contraindications: data.contraindications,
      sideEffects: data.sideEffects,
      slot: data.slot,
      enabled: data.enabled !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.medicines.push(medicine);
    return medicine;
  }

  update(id: string, data: Partial<Medicine>) {
    const index = this.medicines.findIndex(m => m.id === id);
    if (index !== -1) {
      this.medicines[index] = { ...this.medicines[index], ...data, updatedAt: new Date() };
      return this.medicines[index];
    }
    return null;
  }

  delete(id: string) {
    const index = this.medicines.findIndex(m => m.id === id);
    if (index !== -1) {
      this.medicines.splice(index, 1);
      return true;
    }
    return false;
  }
}
