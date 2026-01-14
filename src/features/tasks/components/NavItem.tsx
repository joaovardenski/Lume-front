import type { LucideIcon } from "lucide-react";
import type { PageType } from "../contexts/HomeContext";

export interface NavItemProps {
  title: string;
  value: PageType;
  active: PageType;
  onClick: (value: PageType) => void;
  icon: LucideIcon;
}

export function NavItem({
  title,
  value,
  active,
  onClick,
  icon: Icon,
}: NavItemProps) {
  const isActive = active === value;

  return (
    <li
      onClick={() => onClick(value)}
      className={`
        flex gap-2 items-center py-4 px-2
        hover:bg-secondary hover:cursor-pointer transition
        border-l-4
        ${isActive ? "border-white font-semibold" : "border-transparent"}
      `}
    >
      <Icon size={24} />
      <p>{title}</p>
    </li>
  );
}
