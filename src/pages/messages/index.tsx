import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Bell as BellIcon } from 'lucide-react-taro/icons/bell';
import { CircleAlert as CircleAlertIcon } from 'lucide-react-taro/icons/circle-alert';
import { CircleCheck as CircleCheckIcon } from 'lucide-react-taro/icons/circle-check';
import { Clock as ClockIcon } from 'lucide-react-taro/icons/clock';
import { MessageCircle as MessageCircleIcon } from 'lucide-react-taro/icons/message-circle';
import { ChevronRight as ChevronRightIcon } from 'lucide-react-taro/icons/chevron-right';
import { Settings as SettingsIcon } from 'lucide-react-taro/icons/settings';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import './index.css';

// 模拟消息数据
const mockMessages = [
  { 
    id: 1, 
    type: 'alarm', 
    title: '漏服告警', 
    content: '您有一条漏服记录：降糖药（14:00）尚未服用，距预定时间已超过30分钟。',
    time: '14:35',
    date: '今天',
    read: false
  },
  { 
    id: 2, 
    type: 'reminder', 
    title: '服药提醒', 
    content: '现在是20:00，该服用降压药了。',
    time: '20:00',
    date: '今天',
    read: true
  },
  { 
    id: 3, 
    type: 'success', 
    title: '服药确认', 
    content: '已确认您于20:03服用降压药，感谢您的配合！',
    time: '20:03',
    date: '今天',
    read: true
  },
  { 
    id: 4, 
    type: 'alarm', 
    title: '设备离线告警', 
    content: '智能药盒已离线超过10分钟，请检查设备电源和网络连接。',
    time: '09:30',
    date: '昨天',
    read: false
  },
  { 
    id: 5, 
    type: 'reminder', 
    title: '服药提醒', 
    content: '现在是10:00，该服用阿司匹林了。',
    time: '10:00',
    date: '昨天',
    read: true
  },
  { 
    id: 6, 
    type: 'success', 
    title: '服药确认', 
    content: '已确认您于10:08服用阿司匹林，感谢您的配合！',
    time: '10:08',
    date: '昨天',
    read: true
  },
  { 
    id: 7, 
    type: 'system', 
    title: '系统通知', 
    content: '您的用药方案已更新，请确认新的服药计划。',
    time: '10:30',
    date: '前天',
    read: true
  },
];

const MessagesPage = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [activeTab, setActiveTab] = useState('all');

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'alarm':
        return <CircleAlertIcon size={24} color="#ef4444" />;
      case 'reminder':
        return <BellIcon size={24} color="#f59e0b" />;
      case 'success':
        return <CircleCheckIcon size={24} color="#22c55e" />;
      case 'system':
        return <SettingsIcon size={24} color="#6b7280" />;
      default:
        return <MessageCircleIcon size={24} color="#6b7280" />;
    }
  };

  const getMessageBg = (type: string) => {
    switch (type) {
      case 'alarm':
        return 'bg-red-100';
      case 'reminder':
        return 'bg-orange-100';
      case 'success':
        return 'bg-green-100';
      case 'system':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getMessageBadge = (type: string) => {
    switch (type) {
      case 'alarm':
        return <Badge className="bg-red-500 text-white">告警</Badge>;
      case 'reminder':
        return <Badge className="bg-orange-500 text-white">提醒</Badge>;
      case 'success':
        return <Badge className="bg-green-500 text-white">成功</Badge>;
      case 'system':
        return <Badge className="bg-gray-500 text-white">系统</Badge>;
      default:
        return null;
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !msg.read;
    if (activeTab === 'alarm') return msg.type === 'alarm';
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const alarmCount = messages.filter(m => m.type === 'alarm' && !m.read).length;

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    ));
  };

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <View className="bg-primary text-white px-4 py-4">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="block text-xl font-bold">消息通知</Text>
            <Text className="block text-gray-400 text-sm mt-1">服药提醒与告警信息</Text>
          </View>
          <View className="relative">
            <BellIcon size={24} color="white" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full flex items-center justify-center px-1">
                <Text className="block text-white text-xs">{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 消息统计 */}
      <View className="px-4 py-4">
        <View className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-primary to-emerald-600 text-white">
            <CardContent className="p-3 text-center">
              <Text className="block text-2xl font-bold">{unreadCount}</Text>
              <Text className="block text-gray-400 text-xs">未读消息</Text>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-3 text-center">
              <Text className="block text-2xl font-bold">{alarmCount}</Text>
              <Text className="block text-gray-400 text-xs">待处理告警</Text>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-3 text-center">
              <Text className="block text-2xl font-bold">{messages.length}</Text>
              <Text className="block text-gray-400 text-xs">消息总数</Text>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* 筛选标签 */}
      <View className="px-4 mb-2">
        <View className="flex flex-row gap-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'unread', label: '未读' },
            { key: 'alarm', label: '告警' },
          ].map((tab) => (
            <View
              key={tab.key}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
                activeTab === tab.key 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Text className="block text-sm font-medium">{tab.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 消息列表 */}
      <View className="px-4">
        {filteredMessages.length > 0 ? (
          <View className="flex flex-col gap-3">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`${!message.read ? 'border-l-4 border-l-primary' : ''}`}
                onClick={() => markAsRead(message.id)}
              >
                <CardContent className="p-4">
                  <View className="flex flex-row items-start gap-3">
                    <View className={`w-12 h-12 rounded-full flex items-center justify-center ${getMessageBg(message.type)}`}>
                      {getMessageIcon(message.type)}
                    </View>
                    <View className="flex-1">
                      <View className="flex flex-row items-center justify-between mb-1">
                        <View className="flex flex-row items-center gap-2">
                          <Text className="block text-gray-900 font-bold">{message.title}</Text>
                          {getMessageBadge(message.type)}
                        </View>
                        {!message.read && (
                          <View className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </View>
                      <Text className="block text-gray-600 text-sm mb-2">{message.content}</Text>
                      <View className="flex flex-row items-center gap-3">
                        <View className="flex flex-row items-center gap-1">
                          <ClockIcon size={12} color="#9ca3af" />
                          <Text className="block text-gray-400 text-xs">{message.time}</Text>
                        </View>
                        <Text className="block text-gray-400 text-xs">{message.date}</Text>
                      </View>
                    </View>
                    <ChevronRightIcon size={20} color="#d1d5db" />
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <BellIcon size={48} color="#d1d5db" />
              <Text className="block text-gray-400 mt-4">暂无消息</Text>
            </CardContent>
          </Card>
        )}
      </View>

      {/* 快速操作 */}
      <View className="px-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <Text className="block text-gray-900 font-bold mb-3">快捷操作</Text>
            <View className="flex flex-row gap-3">
              <View className="flex-1 bg-orange-50 rounded-xl p-3 text-center cursor-pointer">
                <BellIcon size={24} color="#f59e0b" />
                <Text className="block text-gray-700 text-sm mt-1">设置提醒</Text>
              </View>
              <View className="flex-1 bg-green-50 rounded-xl p-3 text-center cursor-pointer">
                <CircleCheckIcon size={24} color="#22c55e" />
                <Text className="block text-gray-700 text-sm mt-1">确认服药</Text>
              </View>
              <View className="flex-1 bg-blue-50 rounded-xl p-3 text-center cursor-pointer">
                <SettingsIcon size={24} color="#3b82f6" />
                <Text className="block text-gray-700 text-sm mt-1">消息设置</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

export default MessagesPage;
