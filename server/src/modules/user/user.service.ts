import { Injectable } from '@nestjs/common';
import { User } from '@/entities';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      name: '张爷爷',
      phone: '138****8888',
      avatar: '',
      deviceId: 'YA-2024-001',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(u => u.id === id);
  }

  create(data: Partial<User>) {
    const user: User = {
      id: String(Date.now()),
      name: data.name || '',
      phone: data.phone || '',
      avatar: data.avatar,
      deviceId: data.deviceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  update(id: string, data: Partial<User>) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
      return this.users[index];
    }
    return null;
  }

  delete(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
