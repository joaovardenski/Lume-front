import { createContext } from "react";

export type PageType = "my day" | "important" | "scheduled" | "tasks";

export interface HomeContextData {
  active: PageType;
  setActive: React.Dispatch<React.SetStateAction<PageType>>;
}

export const HomeContext = createContext<HomeContextData>(
  {} as HomeContextData,
);
