import { useState } from "react";
import { HomeContext } from "./HomeContext";
import type { PageType } from "./HomeContext";

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<PageType>("tasks");

  return (
    <HomeContext.Provider value={{ active, setActive }}>
      {children}
    </HomeContext.Provider>
  );
}
