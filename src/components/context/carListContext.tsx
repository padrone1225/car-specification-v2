import { createContext, useContext } from "react";

export type CarContext = {
  cars: Array<string>;
  setCars: (c: Array<string>) => void;
};

export const GlobalCarContext = createContext<CarContext>({
  cars: [],
  setCars: () => {},
});

export const useGlobalCarContext = () => useContext(GlobalCarContext);
