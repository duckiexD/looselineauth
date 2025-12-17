import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/app/components/Sidebar';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Админ-панель',
  description: 'Панель управления',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            <main className="container mx-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}