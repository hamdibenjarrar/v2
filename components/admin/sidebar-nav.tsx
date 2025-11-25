'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { Package, ShoppingCart, Star } from 'lucide-react';

const sidebarNavItems = [
  {
    title: 'Products',
    href: '/admin/products',
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: <Star className="h-4 w-4" />,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {sidebarNavItems.map((item, index) => {
        return (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                pathname === item.href ? 'bg-accent' : 'transparent'
              )}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
