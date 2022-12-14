import { createContext, useContext } from "react";

export type BasicStructure = {
  value: string;
  label: string;
};

export type NameStructure = {
  name: string;
};

export type CheckStructure = {
  value: string;
  label: boolean;
};

export type SpecificationContext = {
  carSpecifications: Array<
    Array<BasicStructure | NameStructure | CheckStructure>
  >;
  setCarSpecifications: (
    c: Array<Array<BasicStructure | NameStructure | CheckStructure>>
  ) => void;
};

export const GlobalSpecificationContext = createContext<SpecificationContext>({
  carSpecifications: [],
  setCarSpecifications: () => {},
});

export const useGlobalSpecification = () =>
  useContext(GlobalSpecificationContext);
