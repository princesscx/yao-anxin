import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import {
  User,
  Bell,
  CircleQuestionMark,
  Phone,
  LogOut,
  ChevronRight,
  Pill,
  Battery,
  Volume2,
  Shield,
  Info,
  Wifi
} from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import './index.css';

// 模拟用户数据
const mockUser = {
  name: '张爷爷',
  phone: '138****8888',
  avatar: '',
  deviceId: 'YA-2024-001',
  deviceName: '智能药盒 A1',
  deviceStatus: 'online',
  bindTime: '2024-01-01'
};

const ProfilePage = () => {
  const [settings, setSettings] = useState({
    voiceReminder: true,
    alarmNotification: true,
    familyNotification: true,
    lowBatteryAlert: true,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const menuItems = [
    { icon: Pill, title: '用药方案', subtitle: '查看/编辑用药计划', path: '/pages/medicine/index' },
    { icon: Bell, title: '提醒设置', subtitle: '服药提醒时间', path: '/pages/alarm/index' },
    { icon: User, title: '家庭成员', subtitle: '管理绑定家庭账号', path: '' },
    { icon: Phone, title: '联系方式', subtitle: '紧急联系电话', path: '' },
  ];

  const systemItems = [
    { icon: Shield, title: '隐私政策', subtitle: '', path: '' },
    { icon: CircleQuestionMark, title: '使用帮助', subtitle: '', path: '' },
    { icon: Info, title: '关于我们', subtitle: '版本 1.0.0', path: '' },
  ];

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <View className="bg-gradient-to-br from-primary to-emerald-600 text-white px-4 pt-8 pb-6">
        <View className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20 bg-white bg-opacity-20 border-2 border-white">
            <AvatarFallback className="text-white text-2xl">
              {mockUser.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="block text-2xl font-bold">{mockUser.name}</Text>
            <Text className="block text-gray-400 text-sm mt-1">{mockUser.phone}</Text>
            <View className="flex flex-row items-center gap-2 mt-2">
              <View className="w-2 h-2 bg-green-400 rounded-full"></View>
              <Text className="block text-gray-400 text-xs">药盒在线</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 设备信息 */}
      <View className="px-4 -mt-4">
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <View className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Pill size={24} color="#10b981" />
                </View>
                <View>
                  <Text className="block text-gray-900 font-bold">{mockUser.deviceName}</Text>
                  <Text className="block text-gray-500 text-sm">设备ID: {mockUser.deviceId}</Text>
                </View>
              </View>
              <View 
                className="px-3 py-1 bg-green-100 rounded-full cursor-pointer"
                onClick={() => Taro.navigateTo({ url: '/pages/device/index' })}
              >
                <Text className="block text-green-600 text-sm font-medium">管理</Text>
              </View>
            </View>
            <View className="mt-4 pt-4 border-t border-gray-100">
              <View className="flex flex-row justify-around">
                <View className="text-center">
                  <View className="flex flex-row items-center justify-center gap-1">
                    <Wifi size={16} color="#10b981" />
                    <Text className="block text-green-600 font-bold">强</Text>
                  </View>
                  <Text className="block text-gray-500 text-xs mt-1">信号</Text>
                </View>
                <View className="text-center">
                  <View className="flex flex-row items-center justify-center gap-1">
                    <Battery size={16} color="#10b981" />
                    <Text className="block text-green-600 font-bold">85%</Text>
                  </View>
                  <Text className="block text-gray-500 text-xs mt-1">电量</Text>
                </View>
                <View className="text-center">
                  <Text className="block text-gray-900 font-bold text-sm">{mockUser.bindTime}</Text>
                  <Text className="block text-gray-500 text-xs mt-1">绑定日期</Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 功能菜单 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-500 text-sm font-medium mb-3">功能</Text>
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <View 
                key={index}
                className={`flex flex-row items-center p-4 cursor-pointer ${
                  index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                onClick={() => item.path && Taro.navigateTo({ url: item.path })}
              >
                <View className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                  <item.icon size={20} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text className="block text-gray-900 font-medium">{item.title}</Text>
                  {item.subtitle && (
                    <Text className="block text-gray-500 text-sm">{item.subtitle}</Text>
                  )}
                </View>
                <ChevronRight size={20} color="#d1d5db" />
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 设置选项 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-500 text-sm font-medium mb-3">通知设置</Text>
        <Card>
          <CardContent className="p-0">
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Volume2 size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">语音提醒</Text>
              </View>
              <Switch 
                checked={settings.voiceReminder}
                onCheckedChange={() => toggleSetting('voiceReminder')}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Bell size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">服药提醒通知</Text>
              </View>
              <Switch 
                checked={settings.alarmNotification}
                onCheckedChange={() => toggleSetting('alarmNotification')}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <User size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">家属通知</Text>
              </View>
              <Switch 
                checked={settings.familyNotification}
                onCheckedChange={() => toggleSetting('familyNotification')}
              />
            </View>
            <View className="flex flex-row items-center justify-between p-4">
              <View className="flex flex-row items-center">
                <Battery size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">低电量告警</Text>
              </View>
              <Switch 
                checked={settings.lowBatteryAlert}
                onCheckedChange={() => toggleSetting('lowBatteryAlert')}
              />
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 系统信息 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-500 text-sm font-medium mb-3">其他</Text>
        <Card>
          <CardContent className="p-0">
            {systemItems.map((item, index) => (
              <View 
                key={index}
                className={`flex flex-row items-center p-4 cursor-pointer ${
                  index < systemItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <item.icon size={20} color="#6b7280" />
                </View>
                <View className="flex-1">
                  <Text className="block text-gray-900 font-medium">{item.title}</Text>
                  {item.subtitle && (
                    <Text className="block text-gray-500 text-sm">{item.subtitle}</Text>
                  )}
                </View>
                <ChevronRight size={20} color="#d1d5db" />
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 退出登录 */}
      <View className="px-4 mt-6 mb-6">
        <View className="bg-red-50 rounded-xl p-4 flex flex-row items-center justify-center cursor-pointer">
          <LogOut size={20} color="#ef4444" />
          <Text className="block text-red-500 font-medium ml-2">退出登录</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;
