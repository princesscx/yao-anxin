import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { Bell, Clock, CircleCheck, CircleAlert, Pill, Settings, TrendingUp, Calendar } from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import './index.css';

// 模拟数据
const mockUserInfo = {
  name: '张爷爷',
  avatar: '',
  deviceStatus: 'online',
  todayCompliance: 75,
  nextReminder: '10:00',
  nextMedicine: '降压药'
};

const todayReminders = [
  { id: 1, time: '08:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '08:05' },
  { id: 2, time: '10:00', medicine: '阿司匹林', dosage: '1片', status: 'pending' },
  { id: 3, time: '14:00', medicine: '降糖药', dosage: '1片', status: 'pending' },
  { id: 4, time: '20:00', medicine: '降压药', dosage: '1片', status: 'pending' }
];

const IndexPage = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [complianceRate] = useState(mockUserInfo.todayCompliance);

  useEffect(() => {
    // 更新问候语
    const hour = currentTime.getHours();
    if (hour < 6) setGreeting('凌晨好');
    else if (hour < 9) setGreeting('早上好');
    else if (hour < 12) setGreeting('上午好');
    else if (hour < 14) setGreeting('中午好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');

    // 更新时间
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-500 text-white">已服用</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500 text-white">待服用</Badge>;
      case 'missed':
        return <Badge className="bg-red-500 text-white">漏服</Badge>;
      default:
        return <Badge>未知</Badge>;
    }
  };

  const pendingCount = todayReminders.filter(r => r.status === 'pending').length;
  const takenCount = todayReminders.filter(r => r.status === 'taken').length;

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部区域 */}
      <View className="bg-gradient-to-br from-primary to-emerald-600 text-white px-4 py-6 rounded-b-3xl">
        <View className="flex flex-row justify-between items-center mb-4">
          <View>
            <Text className="block text-lg opacity-90">{greeting}</Text>
            <Text className="block text-2xl font-bold">{mockUserInfo.name}</Text>
          </View>
          <View className="flex flex-row gap-3">
            <View className="relative">
              <Bell size={24} color="white" />
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <Text className="block text-xs text-white">{pendingCount}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 设备状态卡片 */}
        <View className="bg-white bg-opacity-20 backdrop-blur rounded-2xl p-4 mb-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Pill size={20} color="white" />
              </View>
              <View>
                <Text className="block text-white font-medium">智能药盒</Text>
                <View className="flex flex-row items-center gap-1">
                  <View className="w-2 h-2 bg-green-400 rounded-full"></View>
                  <Text className="block text-gray-400 text-sm">在线</Text>
                </View>
              </View>
            </View>
            <Text className="block text-gray-400 text-sm">
              {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>

        {/* 今日服药进度 */}
        <View className="bg-white rounded-2xl p-4">
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="block text-gray-700 font-medium">今日服药进度</Text>
            <Text className="block text-primary font-bold">{takenCount}/{todayReminders.length}</Text>
          </View>
          <Progress value={complianceRate} className="h-3 bg-gray-200 [&>div]:bg-primary" />
          <View className="flex flex-row justify-between mt-2">
            <Text className="block text-gray-500 text-sm">已完成 {takenCount} 次</Text>
            <Text className="block text-orange-500 text-sm">待服用 {pendingCount} 次</Text>
          </View>
        </View>
      </View>

      {/* 下次服药提醒 */}
      <View className="px-4 -mt-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <View className="flex flex-row items-center gap-3">
              <View className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="block text-gray-500 text-sm">下次服药</Text>
                <Text className="block text-gray-900 font-bold text-lg">
                  {mockUserInfo.nextMedicine} - {mockUserInfo.nextReminder}
                </Text>
                <Text className="block text-gray-500 text-sm">剂量：1片</Text>
              </View>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
                <Text className="block text-white font-bold">确认服药</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 今日服药记录 */}
      <View className="px-4 mt-6">
        <View className="flex flex-row justify-between items-center mb-3">
          <Text className="block text-lg font-bold text-gray-900">今日服药记录</Text>
          <Text className="block text-primary text-sm">查看全部</Text>
        </View>

        <View className="flex flex-col gap-3">
          {todayReminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent className="p-4">
                <View className="flex flex-row items-center">
                  <View className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    reminder.status === 'taken' ? 'bg-green-100' : 
                    reminder.status === 'pending' ? 'bg-orange-100' : 'bg-red-100'
                  }`}
                  >
                    {reminder.status === 'taken' ? (
                      <CircleCheck size={20} color="#22c55e" />
                    ) : reminder.status === 'pending' ? (
                      <Clock size={20} color="#f59e0b" />
                    ) : (
                      <CircleAlert size={20} color="#ef4444" />
                    )}
                  </View>
                  <View className="flex-1">
                    <View className="flex flex-row items-center gap-2">
                      <Text className="block text-gray-900 font-medium">{reminder.medicine}</Text>
                      {getStatusBadge(reminder.status)}
                    </View>
                    <View className="flex flex-row items-center gap-3 mt-1">
                      <View className="flex flex-row items-center gap-1">
                        <Clock size={14} color="#9ca3af" />
                        <Text className="block text-gray-500 text-sm">{reminder.time}</Text>
                      </View>
                      <Text className="block text-gray-400 text-sm">剂量：{reminder.dosage}</Text>
                      {reminder.takenTime && (
                        <Text className="block text-green-500 text-sm">服用时间：{reminder.takenTime}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>

      {/* 快捷操作 */}
      <View className="px-4 mt-6 mb-6">
        <Text className="block text-lg font-bold text-gray-900 mb-3">快捷操作</Text>
        <View className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer" onClick={() => Taro.navigateTo({ url: '/pages/device/index' })}>
            <CardContent className="p-4 flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Pill size={20} color="#3b82f6" />
              </View>
              <Text className="block text-gray-900 font-medium">设备管理</Text>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => Taro.navigateTo({ url: '/pages/records/index' })}>
            <CardContent className="p-4 flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar size={20} color="#a855f7" />
              </View>
              <Text className="block text-gray-900 font-medium">用药记录</Text>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => Taro.navigateTo({ url: '/pages/alarm/index' })}>
            <CardContent className="p-4 flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <CircleAlert size={20} color="#ef4444" />
              </View>
              <Text className="block text-gray-900 font-medium">告警设置</Text>
            </CardContent>
          </Card>
          <Card className="cursor-pointer" onClick={() => Taro.navigateTo({ url: '/pages/profile/index' })}>
            <CardContent className="p-4 flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings size={20} color="#6b7280" />
              </View>
              <Text className="block text-gray-900 font-medium">系统设置</Text>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* 用药统计 */}
      <View className="px-4 mb-6">
        <Text className="block text-lg font-bold text-gray-900 mb-3">本周用药统计</Text>
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row justify-around">
              <View className="text-center">
                <Text className="block text-2xl font-bold text-green-500">5</Text>
                <Text className="block text-gray-500 text-sm">服药天数</Text>
              </View>
              <View className="text-center">
                <Text className="block text-2xl font-bold text-orange-500">2</Text>
                <Text className="block text-gray-500 text-sm">漏服次数</Text>
              </View>
              <View className="text-center">
                <Text className="block text-2xl font-bold text-blue-500">87%</Text>
                <Text className="block text-gray-500 text-sm">依从率</Text>
              </View>
            </View>
            <View className="mt-4 pt-4 border-t border-gray-100">
              <View className="flex flex-row items-center justify-center gap-2">
                <TrendingUp size={16} color="#10b981" />
                <Text className="block text-green-500 text-sm">本周依从率较上周提升 5%</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
};

export default IndexPage;
