'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Settings, 
  LogOut,
  BarChart2,
  FileText,
  MessageSquare,
  Shield,
  CreditCard,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    name: 'Обзор', 
    href: '/admin', 
    icon: Home 
  },
  { 
    name: 'Пользователи', 
    href: '/admin/users', 
    icon: Users 
  },
  { 
    name: 'Статистика', 
    href: '/admin/stats', 
    icon: BarChart2 
  },
  { 
    name: 'Контент', 
    href: '/admin/content', 
    icon: FileText 
  },
  { 
    name: 'Сообщения', 
    href: '/admin/messages', 
    icon: MessageSquare 
  },
  { 
    name: 'Подписки', 
    href: '/admin/subscriptions', 
    icon: CreditCard 
  },
  { 
    name: 'Уведомления', 
    href: '/admin/notifications', 
    icon: Bell 
  },
  { 
    name: 'Роли и доступы', 
    href: '/admin/roles', 
    icon: Shield 
  },
  { 
    name: 'Настройки', 
    href: '/admin/settings', 
    icon: Settings 
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200">
        {/* Логотип */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Админ-панель</h1>
        </div>
        
        {/* Навигация */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon 
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-blue-500' : 'text-gray-400'
                    )} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Профиль и выход */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <span className="font-medium">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Администратор</p>
              <p className="text-xs font-medium text-gray-500">admin@example.com</p>
            </div>
          </div>
          <button className="mt-3 w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 font-medium rounded-lg border border-transparent hover:bg-red-50 hover:border-red-100">
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}