import LumeTitle from "../../../assets/lumeTitle.png";
import LumeLogo from "../../../assets/lumeLogo.png";
import type { ReactNode } from "react";

interface AuthContainerProps {
  title: string;
  children: ReactNode;
  navigation: ReactNode;
}

export default function AuthContainer({
  title,
  children,
  navigation,
}: AuthContainerProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <main className="w-full max-h-9/10 max-w-8/10 flex shadow-lg rounded-xl overflow-hidden border border-border/20">
        <div className="hidden bg-primary w-full md:flex flex-col items-center justify-center p-10">
          <img src={LumeTitle} alt="Lume Title" className="w-100" />
        </div>

        <div className="w-full py-5 md:py-20 flex flex-col gap-4 items-center bg-blue-100/20">
          <img src={LumeLogo} alt="Lume Logo" className="w-20 md:hidden" />

          <h1 className="text-4xl font-bold text-center text-primary/90">
            {title}
          </h1>

          <div className="w-full max-w-8/10 mt-2">{children}</div>

          <nav className="flex flex-col items-center mt-4 gap-2 font-semibold">
            {navigation}
          </nav>
        </div>
      </main>
    </div>
  );
}
