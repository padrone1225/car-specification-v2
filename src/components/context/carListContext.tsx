import { createContext, useContext } from "react";

export type CarContext = {
  cars: string[];
  setCars: (c: string[]) => void;
};

export const GlobalCarContext = createContext<CarContext>({
  cars: [],
  setCars: () => {},
});

export const useGlobalCarContext = () => useContext(GlobalCarContext);
