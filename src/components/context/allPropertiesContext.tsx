import { createContext, useContext } from "react";

export type AllContext = {
  allList: any[];
  setAllList: (c: any[]) => void;
};

export const GlobalAllContext = createContext<AllContext>({
  allList: [],
  setAllList: () => {},
});

export const useGlobalAllContext = () => useContext(GlobalAllContext);
