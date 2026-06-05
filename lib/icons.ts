import {
  Workflow,
  Bot,
  PhoneCall,
  Wrench,
  Sparkles,
  PenTool,
  Globe,
  FileSearch,
  Boxes,
  Magnet,
  Receipt,
  Headphones,
  CalendarCheck,
  BarChart3,
  MessagesSquare,
  Rocket,
  Clock,
  TrendingUp,
  Layers,
  type LucideIcon,
} from "lucide-react";

// String-key → component map so data files stay serializable.
export const iconMap: Record<string, LucideIcon> = {
  Workflow,
  Bot,
  PhoneCall,
  Wrench,
  Sparkles,
  PenTool,
  Globe,
  FileSearch,
  Boxes,
  Magnet,
  Receipt,
  Headphones,
  CalendarCheck,
  BarChart3,
  MessagesSquare,
  Rocket,
  Clock,
  TrendingUp,
  Layers,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
