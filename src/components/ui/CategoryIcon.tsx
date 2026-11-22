import { Flower2, Cake, Gift, Package, Sparkles, Briefcase, LucideIcon } from 'lucide-react';

interface CategoryIconProps {
  categoryId: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const iconMap: Record<string, LucideIcon> = {
  flowers: Flower2,
  cakes: Cake,
  chocolates: Gift,
  hampers: Package,
  personalized: Sparkles,
  corporate: Briefcase,
};

export function CategoryIcon({ categoryId, size = 18, className, style }: CategoryIconProps) {
  const IconComponent = iconMap[categoryId] || Gift;
  return <IconComponent size={size} className={className} style={style} />;
}
