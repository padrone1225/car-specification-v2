import { createContext, useContext } from "react";

export type DataContext = {
  dataStructure: any[];
  setDataStructure: (c: any[]) => void;
};

export const GlobalDataContext = createContext<DataContext>({
  dataStructure: [],
  setDataStructure: () => {},
});

export const useGlobalDataContext = () => useContext(GlobalDataContext);
