import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import {
  Pill,
  Clock,
  Plus,
  Pencil,
  Trash2,
  CircleAlert
} from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import './index.css';

// 模拟用药方案数据
const mockMedicines = [
  { 
    id: 1, 
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
    enabled: true
  },
  { 
    id: 2, 
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
    enabled: true
  },
  { 
    id: 3, 
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
    enabled: true
  },
];

const MedicinePage = () => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [, setActiveTab] = useState('list');

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const getStatusBadge = (enabled: boolean) => {
    return enabled ? (
      <Badge className="bg-green-100 text-green-700">启用中</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-500">已停用</Badge>
    );
  };

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <View className="bg-gradient-to-br from-primary to-emerald-600 text-white px-4 py-6">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="block text-xl font-bold">用药方案</Text>
            <Text className="block text-gray-400 text-sm mt-1">管理您的服药计划</Text>
          </View>
          <View className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Pill size={24} color="white" />
          </View>
        </View>
      </View>

      {/* 用药统计 */}
      <View className="px-4 -mt-4">
        <Card>
          <CardContent className="p-4">
            <View className="flex flex-row justify-around">
              <View className="text-center">
                <Text className="block text-2xl font-bold text-primary">{medicines.length}</Text>
                <Text className="block text-gray-500 text-sm">药品数量</Text>
              </View>
              <View className="text-center">
                <Text className="block text-2xl font-bold text-green-500">
                  {medicines.filter(m => m.enabled).length}
                </Text>
                <Text className="block text-gray-500 text-sm">启用中</Text>
              </View>
              <View className="text-center">
                <Text className="block text-2xl font-bold text-orange-500">
                  {medicines.reduce((acc, m) => acc + m.times.length, 0)}
                </Text>
                <Text className="block text-gray-500 text-sm">每日服药次数</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 标签切换 */}
      <View className="px-4 mt-4">
        <Tabs defaultValue="list" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-full bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="list" className="flex-1 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Text className="block">药品列表</Text>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex-1 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Text className="block">服药时间表</Text>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-4">
            <View className="flex flex-col gap-4">
              {medicines.map((medicine) => (
                <Card key={medicine.id}>
                  <CardContent className="p-4">
                    <View className="flex flex-row items-start justify-between mb-3">
                      <View className="flex flex-row items-center gap-3">
                        <View className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          medicine.enabled ? 'bg-primary bg-opacity-10' : 'bg-gray-100'
                        }`}
                        >
                          <Pill size={24} color={medicine.enabled ? '#10b981' : '#9ca3af'} />
                        </View>
                        <View>
                          <View className="flex flex-row items-center gap-2">
                            <Text className="block text-gray-900 font-bold">{medicine.name}</Text>
                            {getStatusBadge(medicine.enabled)}
                          </View>
                          <Text className="block text-gray-500 text-sm">{medicine.genericName}</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-2">
                        <View className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer">
                          <Pencil size={16} color="#3b82f6" />
                        </View>
                        <View 
                          className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => deleteMedicine(medicine.id)}
                        >
                          <Trash2 size={16} color="#ef4444" />
                        </View>
                      </View>
                    </View>

                    <View className="bg-gray-50 rounded-xl p-3 mb-3">
                      <View className="grid grid-cols-2 gap-3">
                        <View>
                          <Text className="block text-gray-400 text-xs">剂量</Text>
                          <Text className="block text-gray-900 font-medium">{medicine.dosage} ({medicine.unit})</Text>
                        </View>
                        <View>
                          <Text className="block text-gray-400 text-xs">频次</Text>
                          <Text className="block text-gray-900 font-medium">{medicine.frequency}</Text>
                        </View>
                        <View className="col-span-2">
                          <Text className="block text-gray-400 text-xs">服药时间</Text>
                          <View className="flex flex-row gap-2 mt-1">
                            {medicine.times.map((time, index) => (
                              <Badge key={index} className="bg-primary bg-opacity-10 text-primary">
                                <Clock size={12} color="#10b981" className="mr-1" />
                                <Text className="block">{time}</Text>
                              </Badge>
                            ))}
                          </View>
                        </View>
                        <View className="col-span-2">
                          <Text className="block text-gray-400 text-xs">服用方法</Text>
                          <Text className="block text-gray-700 text-sm">{medicine.method}</Text>
                        </View>
                      </View>
                    </View>

                    <View className="border-t border-gray-100 pt-3">
                      <View className="flex flex-row items-start gap-2 mb-2">
                        <CircleAlert size={16} color="#f59e0b" className="mt-1" />
                        <View className="flex-1">
                          <Text className="block text-gray-400 text-xs">禁忌</Text>
                          <Text className="block text-gray-700 text-sm">{medicine.contraindications}</Text>
                        </View>
                      </View>
                      <View className="flex flex-row items-start gap-2">
                        <CircleAlert size={16} color="#6b7280" className="mt-1" />
                        <View className="flex-1">
                          <Text className="block text-gray-400 text-xs">不良反应</Text>
                          <Text className="block text-gray-700 text-sm">{medicine.sideEffects}</Text>
                        </View>
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))}

              <Button className="w-full border-dashed border-2 border-gray-300 bg-white text-gray-500">
                <Plus size={18} color="#6b7280" className="mr-1" />
                <Text className="block">添加新药品</Text>
              </Button>
            </View>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4">
            <View className="flex flex-col gap-3">
              {[
                { time: '08:00', items: ['降压药 - 1片'] },
                { time: '10:00', items: ['阿司匹林 - 1片'] },
                { time: '14:00', items: ['降糖药 - 1片'] },
                { time: '20:00', items: ['降压药 - 1片'] },
              ].map((schedule, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <View className="flex flex-row items-center">
                      <View className="w-14 h-14 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mr-3">
                        <Clock size={24} color="#10b981" />
                        <Text className="block text-primary font-bold text-sm">{schedule.time}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="block text-gray-900 font-medium mb-1">
                          {schedule.items.length} 种药品
                        </Text>
                        {schedule.items.map((item, i) => (
                          <View key={i} className="flex flex-row items-center gap-2">
                            <Pill size={14} color="#10b981" />
                            <Text className="block text-gray-600 text-sm">{item}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </View>
  );
};

export default MedicinePage;
