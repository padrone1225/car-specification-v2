import { useEffect, useState } from "react";
import { SpecificationForm } from "./components/form";
import { SpecificationList } from "./components/list";
import {
  AllProperties,
  BasicSpecification,
  Carlist,
  CarProperty,
  OtherProperty,
  SpecificationData,
} from "./data";
import { GlobalCarContext } from "./components/context/carListContext";
import {
  BasicStructure,
  CheckStructure,
  GlobalSpecificationContext,
  NameStructure,
} from "./components/context/carSpecificationContext";
import { GlobalBasicPropertyContext } from "./components/context/basicPropertyContext";
import { GlobalOtherPropertyContext } from "./components/context/otherPropertyContext";
import { GlobalAllContext } from "./components/context/allPropertiesContext";
import { GlobalDataContext } from "./components/context/specificationDataContext";

function App() {
  const [cars, setCars] = useState<string[]>(Carlist);
  const [carSpecifications, setCarSpecifications] = useState<
    Array<Array<BasicStructure | NameStructure | CheckStructure>>
  >([]);
  const [basicProperties, setBasicProperties] =
    useState<Array<BasicStructure>>(CarProperty);
  const [otherProperties, setOtherProperties] =
    useState<Array<CheckStructure>>(OtherProperty);
  const [allList, setAllList] = useState<Array<any>>(AllProperties);
  const [dataStructure, setDataStructure] =
    useState<Array<any>>(SpecificationData);

  useEffect(() => {
    let list: Array<Array<BasicStructure | NameStructure | CheckStructure>> =
      [];
    for (let i in cars) {
      let item: Array<BasicStructure | NameStructure | CheckStructure> = [];
      item.push({ name: cars[i] });
      for (let j of BasicSpecification) {
        item.push(j);
      }
      list.push(item);
    }
    setCarSpecifications(list);
  }, []);

  return (
    <>
      <div className="bg-primary-dark h-20 w-full text-primary-light text-3xl flex items-center justify-center">
        Car Specification
      </div>
      <div className="bg-primary-light grid grid-cols-2">
        <GlobalCarContext.Provider value={{ cars, setCars }}>
          <GlobalSpecificationContext.Provider
            value={{ carSpecifications, setCarSpecifications }}
          >
            <GlobalDataContext.Provider
              value={{ dataStructure, setDataStructure }}
            >
              <GlobalOtherPropertyContext.Provider
                value={{ otherProperties, setOtherProperties }}
              >
                <GlobalBasicPropertyContext.Provider
                  value={{ basicProperties, setBasicProperties }}
                >
                  <GlobalAllContext.Provider value={{ allList, setAllList }}>
                    <SpecificationList />
                    <SpecificationForm />
                  </GlobalAllContext.Provider>
                </GlobalBasicPropertyContext.Provider>
              </GlobalOtherPropertyContext.Provider>
            </GlobalDataContext.Provider>
          </GlobalSpecificationContext.Provider>
        </GlobalCarContext.Provider>
      </div>
    </>
  );
}

export default App;
