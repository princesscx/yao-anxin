import { Injectable } from '@nestjs/common';
import { Message } from '@/entities';

@Injectable()
export class MessageService {
  private messages: Message[] = [
    {
      id: '1',
      userId: '1',
      type: 'alarm',
      title: '漏服告警',
      content: '您有一条漏服记录：降糖药（14:00）尚未服用，距预定时间已超过30分钟。',
      read: false,
      createdAt: new Date('2024-01-15 14:35:00'),
    },
    {
      id: '2',
      userId: '1',
      type: 'reminder',
      title: '服药提醒',
      content: '现在是20:00，该服用降压药了。',
      read: true,
      createdAt: new Date('2024-01-15 20:00:00'),
    },
    {
      id: '3',
      userId: '1',
      type: 'success',
      title: '服药确认',
      content: '已确认您于20:03服用降压药，感谢您的配合！',
      read: true,
      createdAt: new Date('2024-01-15 20:03:00'),
    },
    {
      id: '4',
      userId: '1',
      type: 'alarm',
      title: '设备离线告警',
      content: '智能药盒已离线超过10分钟，请检查设备电源和网络连接。',
      read: false,
      createdAt: new Date('2024-01-14 09:30:00'),
    },
  ];

  findAll(userId?: string) {
    if (userId) {
      return this.messages.filter(m => m.userId === userId).sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
    }
    return this.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  findOne(id: string) {
    return this.messages.find(m => m.id === id);
  }

  findUnread(userId: string) {
    return this.messages.filter(m => m.userId === userId && !m.read);
  }

  create(data: Partial<Message>) {
    const message: Message = {
      id: String(Date.now()),
      userId: data.userId || '1',
      type: data.type || 'system',
      title: data.title || '',
      content: data.content || '',
      read: false,
      createdAt: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  markAsRead(id: string) {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages[index].read = true;
      return this.messages[index];
    }
    return null;
  }

  markAllAsRead(userId: string) {
    this.messages.forEach(m => {
      if (m.userId === userId) {
        m.read = true;
      }
    });
    return true;
  }

  delete(id: string) {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }

  getUnreadCount(userId: string) {
    return this.messages.filter(m => m.userId === userId && !m.read).length;
  }
}
