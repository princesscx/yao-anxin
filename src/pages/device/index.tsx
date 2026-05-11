import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import {
  Pill,
  Battery,
  Signal,
  RefreshCw,
  Power,
  Volume2,
  Bell,
  CircleCheck,
  CircleAlert
} from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import './index.css';

// 模拟设备数据
const mockDevice = {
  id: 'YA-2024-001',
  name: '智能药盒 A1',
  status: 'online',
  signal: 'strong',
  battery: 85,
  lastSync: '2024-01-15 14:30:00',
  firmware: 'V1.2.5',
  totalSlots: 4,
  usedSlots: 3,
};

const deviceLogs = [
  { id: 1, time: '14:30:00', event: '定时检查完成', status: 'success' },
  { id: 2, time: '14:00:00', event: '服药提醒已发送', status: 'success' },
  { id: 3, time: '10:08:00', event: '用户确认服药', status: 'success' },
  { id: 4, time: '08:05:00', event: '用户确认服药', status: 'success' },
  { id: 5, time: '08:00:00', event: '服药提醒已发送', status: 'success' },
];

const DevicePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleRestart = () => {
    console.log('重启设备');
  };

  const handleUnbind = () => {
    console.log('解除绑定');
  };

  const getSignalIcon = (signal: string) => {
    return <Signal size={16} color={signal === 'weak' ? '#ef4444' : '#10b981'} />;
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return '#10b981';
    if (level > 20) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View className="min-h-screen bg-gray-50 pb-6">
      {/* 头部 */}
      <View className="bg-gradient-to-br from-primary to-emerald-600 text-white px-4 py-6">
        <View className="flex flex-row items-center justify-between">
          <Text className="block text-xl font-bold">设备管理</Text>
          <Badge className={`${mockDevice.status === 'online' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {mockDevice.status === 'online' ? '在线' : '离线'}
          </Badge>
        </View>
      </View>

      {/* 设备状态卡片 */}
      <View className="px-4 -mt-4">
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row items-center gap-4">
              <View className="w-16 h-16 bg-primary bg-opacity-10 rounded-2xl flex items-center justify-center">
                <Pill size={32} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="block text-gray-900 font-bold text-lg">{mockDevice.name}</Text>
                <Text className="block text-gray-500 text-sm">设备ID: {mockDevice.id}</Text>
              </View>
            </View>

            {/* 设备状态指标 */}
            <View className="grid grid-cols-3 gap-4 mt-6">
              <View className="text-center">
                <View className="flex flex-row items-center justify-center gap-1 mb-1">
                  {getSignalIcon(mockDevice.signal)}
                  <Text className="block text-gray-900 font-bold">强</Text>
                </View>
                <Text className="block text-gray-500 text-xs">信号强度</Text>
              </View>
              <View className="text-center">
                <View className="flex flex-row items-center justify-center gap-1 mb-1">
                  <Battery size={16} color={getBatteryColor(mockDevice.battery)} />
                  <Text className="block text-gray-900 font-bold">{mockDevice.battery}%</Text>
                </View>
                <Text className="block text-gray-500 text-xs">电池电量</Text>
              </View>
              <View className="text-center">
                <Text className="block text-gray-900 font-bold">V1.2.5</Text>
                <Text className="block text-gray-500 text-xs">固件版本</Text>
              </View>
            </View>

            {/* 药盒格子使用情况 */}
            <View className="mt-6 pt-4 border-t border-gray-100">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="block text-gray-700 font-medium">药盒格子</Text>
                <Text className="block text-gray-500 text-sm">{mockDevice.usedSlots}/{mockDevice.totalSlots} 已使用</Text>
              </View>
              <View className="flex flex-row gap-2">
                {[1, 2, 3, 4].map((slot) => (
                  <View 
                    key={slot}
                    className={`flex-1 h-12 rounded-lg flex items-center justify-center ${
                      slot <= mockDevice.usedSlots 
                        ? 'bg-primary bg-opacity-20 border-2 border-primary' 
                        : 'bg-gray-100 border-2 border-dashed border-gray-300'
                    }`}
                  >
                    <Text className={`block text-xs font-medium ${
                      slot <= mockDevice.usedSlots ? 'text-primary' : 'text-gray-400'
                    }`}
                    >
                      {slot <= mockDevice.usedSlots ? `药${slot}` : '空'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 最后同步时间 */}
            <View className="mt-4 pt-4 border-t border-gray-100">
              <View className="flex flex-row items-center justify-center gap-2">
                <RefreshCw size={14} color="#9ca3af" />
                <Text className="block text-gray-400 text-xs">
                  最后同步: {mockDevice.lastSync}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 操作按钮 */}
      <View className="px-4 mt-6">
        <View className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="border-primary text-primary"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={18} color="#10b981" className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <Text className="block">刷新状态</Text>
          </Button>
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-500"
            onClick={handleRestart}
          >
            <Power size={18} color="#f59e0b" className="mr-2" />
            <Text className="block">重启设备</Text>
          </Button>
        </View>
      </View>

      {/* 设备日志 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-700 font-bold mb-3">设备日志</Text>
        <Card>
          <CardContent className="p-0">
            {deviceLogs.map((log, index) => (
              <View 
                key={log.id}
                className={`flex flex-row items-center p-4 ${
                  index < deviceLogs.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}
                >
                  {log.status === 'success' ? (
                    <CircleCheck size={16} color="#22c55e" />
                  ) : (
                    <CircleAlert size={16} color="#ef4444" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="block text-gray-900 text-sm">{log.event}</Text>
                  <Text className="block text-gray-400 text-xs">{log.time}</Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      </View>

      {/* 设备设置 */}
      <View className="px-4 mt-6">
        <Text className="block text-gray-700 font-bold mb-3">设备设置</Text>
        <Card>
          <CardContent className="p-0">
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Volume2 size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">音量调节</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="block text-gray-500 text-sm mr-2">80%</Text>
                <Text className="block text-primary text-sm">调整</Text>
              </View>
            </View>
            <View className="flex flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex flex-row items-center">
                <Bell size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">提醒间隔</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="block text-gray-500 text-sm mr-2">30分钟</Text>
                <Text className="block text-primary text-sm">调整</Text>
              </View>
            </View>
            <View className="flex flex-row items-center justify-between p-4">
              <View className="flex flex-row items-center">
                <Power size={20} color="#10b981" className="mr-3" />
                <Text className="block text-gray-900">自动关机</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="block text-gray-500 text-sm mr-2">关闭</Text>
                <Text className="block text-primary text-sm">调整</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 解除绑定 */}
      <View className="px-4 mt-6">
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500"
          onClick={handleUnbind}
        >
          <Text className="block">解除设备绑定</Text>
        </Button>
      </View>
    </View>
  );
};

export default DevicePage;
