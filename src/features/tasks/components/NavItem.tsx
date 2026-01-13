import type { LucideIcon } from "lucide-react";

export interface NavItemProps {
  title: string;
  value: string;
  active: string;
  onClick: (value: string) => void;
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
