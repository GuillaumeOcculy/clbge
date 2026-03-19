import {
  Landmark,
  Mountain,
  Building2,
  PenTool,
  Scan,
  Ruler,
  MapPin,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Mountain,
  Building2,
  PenTool,
  Scan,
  Ruler,
  MapPin,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}
