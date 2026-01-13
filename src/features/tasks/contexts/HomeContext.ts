import { createContext } from "react";

export interface HomeContextData {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export const HomeContext = createContext<HomeContextData>(
  {} as HomeContextData,
);
