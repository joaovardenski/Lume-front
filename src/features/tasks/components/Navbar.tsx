import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authentication/contexts/AuthContext";
import { HomeContext } from "../contexts/HomeContext";
import { NavItem } from "./NavItem";
import lumeLogo from "../../../assets/lumeTitle.png";
import { Balloon, Star, CalendarRange, ListTodo, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemData {
  title: string;
  value: string;
  icon: LucideIcon;
}

const navItems: NavItemData[] = [
  {
    title: "My day",
    value: "my day",
    icon: Balloon,
  },
  {
    title: "Important",
    value: "important",
    icon: Star,
  },
  {
    title: "Scheduled",
    value: "scheduled",
    icon: CalendarRange,
  },
  {
    title: "Tasks",
    value: "tasks",
    icon: ListTodo,
  },
];

export default function Navbar({ isOpen, onClose }: NavbarProps) {
  const { signOut } = useContext(AuthContext);
  const { active, setActive } = useContext(HomeContext);
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <nav
        className={`
          fixed md:static z-50
          w-64 h-full
          bg-linear-to-b from-primary to-secondary
          flex flex-col items-center gap-5
          border-r border-gray-500
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <img src={lumeLogo} alt="Lume" className="w-7/10 brightness-115 mt-4" />

        <ul className="w-full text-white">
          {navItems.map((item) => (
            <NavItem
              key={item.value}
              title={item.title}
              value={item.value}
              icon={item.icon}
              active={active}
              onClick={(value) => {
                setActive(value);
                onClose(); // fecha no mobile
              }}
            />
          ))}
        </ul>

        <button
          onClick={() => {
            signOut();
            navigate("/");
          }}
          className="mt-auto w-full pt-4 flex justify-center gap-2 items-center text-red-400 border-t-2 border-white/80 hover:text-red-500 transition"
        >
          <LogOut size={20} />
          <p>Logout</p>
        </button>
      </nav>
    </>
  );
}
