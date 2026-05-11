import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import {
  Bell,
  Clock,
  CircleAlert,
  Phone,
  MessageCircle,
  Volume2,
  Plus,
  Trash2,
  Pencil
} from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import './index.css';

// 模拟提醒数据
const mockReminders = [
  { id: 1, time: '08:00', medicine: '降压药', dosage: '1片', enabled: true, repeat: '每天' },
  { id: 2, time: '10:00', medicine: '阿司匹林', dosage: '1片', enabled: true, repeat: '每天' },
  { id: 3, time: '14:00', medicine: '降糖药', dosage: '1片', enabled: true, repeat: '每天' },
  { id: 4, time: '20:00', medicine: '降压药', dosage: '1片', enabled: false, repeat: '每天' },
];

const AlarmPage = () => {
  const [reminders, setReminders] = useState(mockReminders);
  const [settings, setSettings] = useState({
    voiceReminder: true,
    screenFlash: true,
    familyNotification: true,
    missedAlarm: true,
  });

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const enabledCount = reminders.filter(r => r.enabled).length;

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <View className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-6">
        <Text className="block text-xl font-bold">告警设置</Text>
        <Text className="block text-gray-400 text-sm mt-1">管理服药提醒和告警通知</Text>
      </View>

      {/* 提醒概览 */}
      <View className="px-4 -mt-4">
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <View className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bell size={24} color="#f59e0b" />
                </View>
                <View>
                  <Text className="block text-gray-900 font-bold">{enabledCount} 个提醒</Text>
                  <Text className="block text-gray-500 text-sm">已启用</Text>
                </View>
              </View>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus size={18} color="#3b82f6" className="mr-1" />
                <Text className="block">添加</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 提醒列表 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-700 font-bold mb-3">服药提醒</Text>
        <View className="flex flex-col gap-3">
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent className="p-4">
                <View className="flex flex-row items-center">
                  <View className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mr-3">
                    <Clock size={24} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2">
                      <Text className="block text-gray-900 font-bold text-lg">{reminder.time}</Text>
                      <Badge className={reminder.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                        {reminder.repeat}
                      </Badge>
                    </View>
                    <Text className="block text-gray-600 mt-1">
                      {reminder.medicine} - {reminder.dosage}
                    </Text>
                  </View>
                  <Switch 
                    checked={reminder.enabled}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                    className="mr-3"
                  />
                  <View className="flex flex-row gap-2">
                    <View className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                      <Pencil size={16} color="#6b7280" />
                    </View>
                    <View 
                      className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>

      {/* 告警设置 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-700 font-bold mb-3">告警通知设置</Text>
        <Card>
          <CardContent className="p-0">
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Volume2 size={20} color="#10b981" className="mr-3" />
                <View>
                  <Text className="block text-gray-900">语音提醒</Text>
                  <Text className="block text-gray-500 text-xs">播放语音提醒服药</Text>
                </View>
              </View>
              <Switch 
                checked={settings.voiceReminder}
                onCheckedChange={() => setSettings(prev => ({...prev, voiceReminder: !prev.voiceReminder}))}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Bell size={20} color="#10b981" className="mr-3" />
                <View>
                  <Text className="block text-gray-900">屏幕闪烁</Text>
                  <Text className="block text-gray-500 text-xs">提醒时屏幕闪烁</Text>
                </View>
              </View>
              <Switch 
                checked={settings.screenFlash}
                onCheckedChange={() => setSettings(prev => ({...prev, screenFlash: !prev.screenFlash}))}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <MessageCircle size={20} color="#10b981" className="mr-3" />
                <View>
                  <Text className="block text-gray-900">家属通知</Text>
                  <Text className="block text-gray-500 text-xs">漏服时通知家属</Text>
                </View>
              </View>
              <Switch 
                checked={settings.familyNotification}
                onCheckedChange={() => setSettings(prev => ({...prev, familyNotification: !prev.familyNotification}))}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4">
              <View className="flex flex-row items-center">
                <CircleAlert size={20} color="#10b981" className="mr-3" />
                <View>
                  <Text className="block text-gray-900">漏服告警</Text>
                  <Text className="block text-gray-500 text-xs">超时未服药发送告警</Text>
                </View>
              </View>
              <Switch 
                checked={settings.missedAlarm}
                onCheckedChange={() => setSettings(prev => ({...prev, missedAlarm: !prev.missedAlarm}))}
              />
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 告警阈值设置 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-700 font-bold mb-3">告警阈值</Text>
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-col gap-4">
              <View>
                <View className="flex flex-row justify-between mb-2">
                  <Text className="block text-gray-700">提醒间隔</Text>
                  <Text className="block text-primary font-medium">30 分钟</Text>
                </View>
                <View className="w-full bg-gray-200 rounded-full h-2">
                  <View className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
                </View>
                <Text className="block text-gray-400 text-xs mt-1">提醒后每30分钟再次提醒</Text>
              </View>
              <View>
                <View className="flex flex-row justify-between mb-2">
                  <Text className="block text-gray-700">漏服判定时间</Text>
                  <Text className="block text-primary font-medium">60 分钟</Text>
                </View>
                <View className="w-full bg-gray-200 rounded-full h-2">
                  <View className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }} />
                </View>
                <Text className="block text-gray-400 text-xs mt-1">服药时间超过1小时判定为漏服</Text>
              </View>
              <View>
                <View className="flex flex-row justify-between mb-2">
                  <Text className="block text-gray-700">连续漏服告警</Text>
                  <Text className="block text-red-500 font-medium">2 次</Text>
                </View>
                <View className="w-full bg-gray-200 rounded-full h-2">
                  <View className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }} />
                </View>
                <Text className="block text-gray-400 text-xs mt-1">连续2次漏服时触发家属告警</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 紧急联系人 */}
      <View className="px-4 mt-6 mb-6">
        <Text className="block text-gray-700 font-bold mb-3">紧急联系人</Text>
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row items-center justify-between mb-4">
              <View className="flex flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Phone size={18} color="#3b82f6" />
                </View>
                <View>
                  <Text className="block text-gray-900 font-medium">张先生（子女）</Text>
                  <Text className="block text-gray-500 text-sm">138****8888</Text>
                </View>
              </View>
              <Badge className="bg-blue-100 text-blue-700">主要联系人</Badge>
            </View>
            <View className="flex flex-row items-center justify-between pt-4 border-t border-gray-100">
              <View className="flex flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Phone size={18} color="#22c55e" />
                </View>
                <View>
                  <Text className="block text-gray-900 font-medium">李女士（子女）</Text>
                  <Text className="block text-gray-500 text-sm">139****6666</Text>
                </View>
              </View>
              <View className="flex flex-row gap-2">
                <View className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                  <Pencil size={14} color="#6b7280" />
                </View>
                <View className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center cursor-pointer">
                  <Trash2 size={14} color="#ef4444" />
                </View>
              </View>
            </View>
            <Button variant="outline" className="w-full mt-4 border-dashed border-2 border-gray-300 text-gray-500">
              <Plus size={18} color="#3b82f6" className="mr-1" />
              <Text className="block">添加紧急联系人</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

export default AlarmPage;
