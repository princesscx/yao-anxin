import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { Calendar, Clock, CircleCheck, CircleAlert, Pill, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react-taro';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import './index.css';

// 模拟数据
const mockRecords = [
  { id: 1, date: '2024-01-15', time: '08:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '08:05' },
  { id: 2, date: '2024-01-15', time: '10:00', medicine: '阿司匹林', dosage: '1片', status: 'taken', takenTime: '10:08' },
  { id: 3, date: '2024-01-15', time: '14:00', medicine: '降糖药', dosage: '1片', status: 'missed' },
  { id: 4, date: '2024-01-15', time: '20:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '20:03' },
  { id: 5, date: '2024-01-14', time: '08:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '08:02' },
  { id: 6, date: '2024-01-14', time: '10:00', medicine: '阿司匹林', dosage: '1片', status: 'taken', takenTime: '10:15' },
  { id: 7, date: '2024-01-14', time: '14:00', medicine: '降糖药', dosage: '1片', status: 'taken', takenTime: '14:10' },
  { id: 8, date: '2024-01-14', time: '20:00', medicine: '降压药', dosage: '1片', status: 'missed' },
  { id: 9, date: '2024-01-13', time: '08:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '08:01' },
  { id: 10, date: '2024-01-13', time: '10:00', medicine: '阿司匹林', dosage: '1片', status: 'taken', takenTime: '10:05' },
  { id: 11, date: '2024-01-13', time: '14:00', medicine: '降糖药', dosage: '1片', status: 'taken', takenTime: '14:02' },
  { id: 12, date: '2024-01-13', time: '20:00', medicine: '降压药', dosage: '1片', status: 'taken', takenTime: '20:00' },
];

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const RecordsPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, setActiveTab] = useState('calendar');
  const [complianceData] = useState([
    { month: '8月', rate: 78 },
    { month: '9月', rate: 82 },
    { month: '10月', rate: 85 },
    { month: '11月', rate: 88 },
    { month: '12月', rate: 92 },
    { month: '1月', rate: 87 },
  ]);

  // 获取日历数据
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getRecordsByDate = (date: Date) => {
    const dateStr = formatDate(date);
    return mockRecords.filter(r => r.date === dateStr);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-500 text-white text-xs">已服用</Badge>;
      case 'missed':
        return <Badge className="bg-red-500 text-white text-xs">漏服</Badge>;
      default:
        return <Badge className="bg-gray-200 text-gray-700 text-xs">待服用</Badge>;
    }
  };

  const selectedDateRecords = getRecordsByDate(selectedDate);
  const takenCount = selectedDateRecords.filter(r => r.status === 'taken').length;
  const totalCount = selectedDateRecords.length;

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 头部 */}
      <View className="bg-primary text-white px-4 py-4">
        <Text className="block text-xl font-bold">用药记录</Text>
        <Text className="block text-gray-400 text-sm mt-1">追踪您的服药历史</Text>
      </View>

      <Tabs defaultValue="calendar" className="w-full px-4 mt-4" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="w-full bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="calendar" className="flex-1 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Text className="block">日历视图</Text>
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex-1 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Text className="block">统计图表</Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          {/* 月份选择 */}
          <View className="flex flex-row items-center justify-between mb-4">
            <View 
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronLeft size={20} color="#6b7280" />
            </View>
            <Text className="block text-lg font-bold text-gray-900">
              {currentMonth.getFullYear()}年{months[currentMonth.getMonth()]}
            </Text>
            <View 
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentMonth(newDate);
              }}
            >
              <ChevronRight size={20} color="#6b7280" />
            </View>
          </View>

          {/* 星期标题 */}
          <View className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <View key={index} className="text-center py-2">
                <Text className="block text-gray-500 text-sm font-medium">{day}</Text>
              </View>
            ))}
          </View>

          {/* 日历日期 */}
          <View className="grid grid-cols-7 gap-1 mb-4">
            {getCalendarDays().map((day, index) => {
              const isSelected = day === selectedDate.getDate() && 
                currentMonth.getMonth() === selectedDate.getMonth() &&
                currentMonth.getFullYear() === selectedDate.getFullYear();
              const hasRecords = day && mockRecords.some(r => {
                const recordDate = new Date(r.date);
                return recordDate.getDate() === day && 
                  recordDate.getMonth() === currentMonth.getMonth() &&
                  recordDate.getFullYear() === currentMonth.getFullYear();
              });
              const missedRecords = day && mockRecords.some(r => {
                const recordDate = new Date(r.date);
                return recordDate.getDate() === day && 
                  recordDate.getMonth() === currentMonth.getMonth() &&
                  recordDate.getFullYear() === currentMonth.getFullYear() &&
                  r.status === 'missed';
              });

              return (
                <View 
                  key={index} 
                  className={`text-center py-3 rounded-lg cursor-pointer ${
                    isSelected ? 'bg-primary' : hasRecords ? 'bg-green-50' : ''
                  }`}
                  onClick={() => {
                    if (day) {
                      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      setSelectedDate(newDate);
                    }
                  }}
                >
                  {day && (
                    <View className="relative">
                      <Text className={`block text-sm ${isSelected ? 'text-white font-bold' : 'text-gray-700'}`}>
                        {day}
                      </Text>
                      {hasRecords && !isSelected && (
                        <View className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                          missedRecords ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        />
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* 选中日期记录 */}
          <Card>
            <CardContent className="p-4">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="block text-gray-900 font-bold">
                  {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                </Text>
                <View className="flex flex-row items-center gap-2">
                  <Badge className="bg-green-100 text-green-700">
                    <Text className="block text-xs">{takenCount}/{totalCount} 已服</Text>
                  </Badge>
                </View>
              </View>

              {selectedDateRecords.length > 0 ? (
                <View className="flex flex-col gap-2">
                  {selectedDateRecords.map((record) => (
                    <View key={record.id} className="flex flex-row items-center p-3 bg-gray-50 rounded-lg">
                      <View className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        record.status === 'taken' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                      >
                        {record.status === 'taken' ? (
                          <CircleCheck size={16} color="#22c55e" />
                        ) : (
                          <CircleAlert size={16} color="#ef4444" />
                        )}
                      </View>
                      <View className="flex-1">
                        <View className="flex flex-row items-center gap-2">
                          <Text className="block text-gray-900 font-medium text-sm">{record.medicine}</Text>
                          {getStatusBadge(record.status)}
                        </View>
                        <View className="flex flex-row items-center gap-3 mt-1">
                          <View className="flex flex-row items-center gap-1">
                            <Clock size={12} color="#9ca3af" />
                            <Text className="block text-gray-500 text-xs">{record.time}</Text>
                          </View>
                          <Text className="block text-gray-400 text-xs">剂量：{record.dosage}</Text>
                          {record.takenTime && (
                            <Text className="block text-green-500 text-xs">实服：{record.takenTime}</Text>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="text-center py-8">
                  <Calendar size={48} color="#d1d5db" />
                  <Text className="block text-gray-400 mt-2">暂无服药记录</Text>
                </View>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart" className="mt-4">
          {/* 月度依从率 */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <Text className="block text-gray-900 font-bold mb-4">月度依从率趋势</Text>
              <View className="flex flex-row items-end justify-between h-40">
                {complianceData.map((item, index) => (
                  <View key={index} className="flex flex-col items-center flex-1">
                    <Text className="block text-primary font-bold text-sm mb-1">{item.rate}%</Text>
                    <View 
                      className="w-8 bg-primary rounded-t-lg transition-all"
                      style={{ height: `${item.rate * 0.4}%` }}
                    />
                    <Text className="block text-gray-500 text-xs mt-2">{item.month}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* 统计概览 */}
          <Card>
            <CardContent className="p-4">
              <Text className="block text-gray-900 font-bold mb-4">本月统计</Text>
              <View className="grid grid-cols-2 gap-4">
                <View className="bg-green-50 rounded-xl p-4 text-center">
                  <CircleCheck size={32} color="#22c55e" />
                  <Text className="block text-2xl font-bold text-green-600 mt-2">28</Text>
                  <Text className="block text-gray-500 text-sm">服药天数</Text>
                </View>
                <View className="bg-red-50 rounded-xl p-4 text-center">
                  <CircleAlert size={32} color="#ef4444" />
                  <Text className="block text-2xl font-bold text-red-600 mt-2">3</Text>
                  <Text className="block text-gray-500 text-sm">漏服次数</Text>
                </View>
                <View className="bg-blue-50 rounded-xl p-4 text-center">
                  <TrendingUp size={32} color="#3b82f6" />
                  <Text className="block text-2xl font-bold text-blue-600 mt-2">87%</Text>
                  <Text className="block text-gray-500 text-sm">平均依从率</Text>
                </View>
                <View className="bg-purple-50 rounded-xl p-4 text-center">
                  <Pill size={32} color="#a855f7" />
                  <Text className="block text-2xl font-bold text-purple-600 mt-2">112</Text>
                  <Text className="block text-gray-500 text-sm">服药总次数</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
};

export default RecordsPage;
