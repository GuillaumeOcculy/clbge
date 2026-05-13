import {
  Scale,
  Mountain,
  Building2,
  Home,
  Scan,
  FileCheck,
  FileText,
  Coins,
  MapPin,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Mountain,
  Building2,
  Home,
  Scan,
  FileCheck,
  FileText,
  Coins,
  MapPin,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}
