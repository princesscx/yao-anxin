import { Injectable } from '@nestjs/common';
import { Device } from '@/entities';

@Injectable()
export class DeviceService {
  private devices: Device[] = [
    {
      id: 'YA-2024-001',
      userId: '1',
      name: '智能药盒 A1',
      deviceType: 'medicine_box',
      status: 'online',
      signal: 'strong',
      battery: 85,
      lastSync: new Date(),
      firmware: 'V1.2.5',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
  ];

  findAll(userId?: string) {
    if (userId) {
      return this.devices.filter(d => d.userId === userId);
    }
    return this.devices;
  }

  findOne(id: string) {
    return this.devices.find(d => d.id === id);
  }

  findByUserId(userId: string) {
    return this.devices.filter(d => d.userId === userId);
  }

  create(data: Partial<Device>) {
    const device: Device = {
      id: data.id || `YA-${Date.now()}`,
      userId: data.userId || '',
      name: data.name || '',
      deviceType: data.deviceType || 'medicine_box',
      status: 'offline',
      signal: 'weak',
      battery: 100,
      lastSync: new Date(),
      firmware: 'V1.0.0',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.devices.push(device);
    return device;
  }

  update(id: string, data: Partial<Device>) {
    const index = this.devices.findIndex(d => d.id === id);
    if (index !== -1) {
      this.devices[index] = { ...this.devices[index], ...data, updatedAt: new Date() };
      return this.devices[index];
    }
    return null;
  }

  updateStatus(id: string, status: 'online' | 'offline', signal?: 'strong' | 'medium' | 'weak', battery?: number) {
    return this.update(id, { status, signal, battery });
  }

  restart(id: string) {
    return this.update(id, { status: 'offline' });
  }

  unbind(id: string) {
    const index = this.devices.findIndex(d => d.id === id);
    if (index !== -1) {
      this.devices.splice(index, 1);
      return true;
    }
    return false;
  }
}
