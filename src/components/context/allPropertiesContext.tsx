import { createContext, useContext } from "react";

export type PropertyStructure = {
  value: string;
  label: string;
  type: string;
};

export type AllContext = {
  allList: Array<PropertyStructure>;
  setAllList: (c: Array<PropertyStructure>) => void;
};

export const GlobalAllContext = createContext<AllContext>({
  allList: [],
  setAllList: () => {},
});

export const useGlobalAllContext = () => useContext(GlobalAllContext);
