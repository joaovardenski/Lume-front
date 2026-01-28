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
    <div className="relative min-h-screen w-screen flex items-center justify-center px-6 bg-slate-50 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl md:hidden" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl md:hidden" />

      <main className="relative z-10 w-full max-w-md md:max-w-5xl flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] md:rounded-2xl overflow-hidden border border-white/40 bg-white/80 backdrop-blur-sm">
        <div className="hidden bg-primary w-1/2 md:flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
          <img
            src={LumeTitle}
            alt="Lume Title"
            className="w-80 max-w-full relative z-10 drop-shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 py-10 md:py-20 px-8 md:px-16 flex flex-col gap-8 items-center">
          <div className="md:hidden flex flex-col items-center animate-bounce-subtle">
            <img
              src={LumeLogo}
              alt="Lume Logo"
              className="w-24 drop-shadow-xl"
            />
          </div>

          <div className="w-full text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              {title}
            </h1>
            <div className="h-1 w-12 bg-primary mx-auto rounded-full opacity-60 md:hidden" />
          </div>

          <div className="w-full mt-2">{children}</div>

          <nav className="flex flex-col items-center md:mt-4 gap-3">
            <div className="text-sm font-medium text-slate-500 flex flex-col items-center gap-2">
              {navigation}
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
}
