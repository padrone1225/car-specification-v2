/* eslint-disable no-loop-func */
import { useState } from "react";
import { useGlobalAllContext } from "../context/allPropertiesContext";
import { useGlobalBasicPropertyContext } from "../context/basicPropertyContext";
import {
  BasicStructure,
  CheckStructure,
  NameStructure,
  useGlobalSpecification,
} from "../context/carSpecificationContext";
import { useGlobalOtherPropertyContext } from "../context/otherPropertyContext";
import { useGlobalDataContext } from "../context/specificationDataContext";

export const Specification = ({ title }: { title: string }) => {
  const [view, setView] = useState(false);
  const { carSpecifications } = useGlobalSpecification();
  const { dataStructure } = useGlobalDataContext();
  const { basicProperties } = useGlobalBasicPropertyContext();
  const { otherProperties } = useGlobalOtherPropertyContext();
  const { allList } = useGlobalAllContext();

  const showCars = () => {
    let list: JSX.Element[] = [];
    const carSpecification = carSpecifications.filter((item) => {
      const temp = item[0] as NameStructure;
      if (temp.name === title) {
        return item;
      }
      return null;
    });

    basicProperties.map((item) => {
      const propertyName = dataStructure.filter(
        (data) => data.value === item.value
      );
      const property = carSpecification[0].filter((data) => {
        const temp = data as BasicStructure;
        if (temp.value === item.value) {
          return temp;
        }
        return null;
      })[0] as BasicStructure;
      if (property) {
        const propertyLabel = allList.filter(
          (data) => data.value === property.label
        );
        list.push(
          <h1 key={item.value}>
            {propertyName[0].label}-{propertyLabel[0].label}
          </h1>
        );
      } else {
        list.push(<h1 key={item.value}>{propertyName[0].label}-Empty</h1>);
      }
      return null;
    });

    otherProperties.map((item) => {
      const propertyName = dataStructure.filter(
        (data) => data.value === item.value
      );
      const property = carSpecification[0].filter((data) => {
        const temp = data as CheckStructure;
        if (temp.value === item.value) {
          return temp;
        }
        return null;
      })[0] as CheckStructure;
      if (property && property.label) {
        list.push(<h1 key={item.value}>{propertyName[0].label}-yes</h1>);
      } else {
        list.push(<h1 key={item.value}>{propertyName[0].label}-no</h1>);
      }
      return null;
    });
    return list;
  };

  return (
    <div>
      <div
        className="bg-secondary-light text-primary-dark w-80 h-10 flex items-center justify-center font-bold text-xl rounded-md cursor-pointer border-primary-dark border-2"
        onClick={() => setView(!view)}
      >
        {title}
      </div>
      {view && (
        <div className="border-2 border-dashed border-primary-dark w-full py-5 flex items-center flex-col">
          {showCars()}
        </div>
      )}
    </div>
  );
};
