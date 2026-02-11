import { useState, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { Balloon, Star, CalendarRange, ListTodo, Menu } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface HomeContainerProps {
  children: ReactNode;
}

interface PageMeta {
  title: string;
  icon: LucideIcon;
}

const pageMeta: Record<string, PageMeta> = {
  "my day": {
    title: "My day",
    icon: Balloon,
  },
  important: {
    title: "Important",
    icon: Star,
  },
  scheduled: {
    title: "Scheduled",
    icon: CalendarRange,
  },
  tasks: {
    title: "Tasks",
    icon: ListTodo,
  },
};

export default function HomeContainer({ children }: HomeContainerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { active } = useContext(HomeContext);

  const activePage = pageMeta[active];
  const Icon = activePage.icon;

  return (
    <div className="w-full h-dvh flex bg-secondary overflow-hidden">
      <Navbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-1 p-6 md:p-10 text-white flex flex-col overflow-hidden">
        <div className="relative flex items-center mb-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-0"
          >
            <Menu size={28} />
          </button>

          <div className="mx-auto flex items-center gap-2">
            <Icon size={28} />
            <h1 className="text-xl font-semibold">{pageMeta[active].title}</h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 mb-3">
          <Icon size={40} />
          <h1 className="text-3xl font-semibold">{pageMeta[active].title}</h1>
        </div>

        <div className="w-full mb-6 h-0.5 bg-linear-to-r from-white/80 to-gray-400/20 rounded-2xl" />

        {children}
      </main>
    </div>
  );
}
