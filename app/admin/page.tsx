// app/admin/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/card';
import { Users, CreditCard, Activity, DollarSign } from 'lucide-react';

type StatCardProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

const StatCard = ({ title, icon: Icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">—</div>
      <p className="text-xs text-muted-foreground">Данные загружаются...</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const stats = [
    { title: 'Всего пользователей', icon: Users },
    { title: 'Доход', icon: DollarSign },
    { title: 'Подписки', icon: CreditCard },
    { title: 'Активных сессий', icon: Activity },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Дашборд</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <StatCard 
            key={stat.title}
            title={stat.title}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Обзор</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              График будет отображаться здесь
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center py-8 text-muted-foreground">
              <p>Список последних действий будет отображаться здесь</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}