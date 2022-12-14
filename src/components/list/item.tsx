/* eslint-disable no-loop-func */
import { useState } from "react";
import { AllProperties, CarProperty, OtherProperty } from "../../data";
import { useGlobalSpecification } from "../context/carSpecificationContext";
import { useGlobalDataContext } from "../context/specificationDataContext";

export const Specification = ({ title }: { title: string }) => {
  const [view, setView] = useState(false);
  const { carSpecifications } = useGlobalSpecification();
  const { dataStructure } = useGlobalDataContext();

  const showCars = () => {
    let list = [];
    for (let i of carSpecifications) {
      if (i[0].name === title) {
        let j = 0;
        for (j = 1; j <= CarProperty.length; j++) {
          for (let k of dataStructure) {
            if (i[j].value === k.value) {
              let item = AllProperties.filter((e) => e.value === i[j].label);
              list.push(
                <h1 key={k.value}>
                  {k.label}-{item[0].label}
                </h1>
              );
            }
          }
        }
        for (; j <= CarProperty.length + OtherProperty.length + 1; j++) {
          for (let k of dataStructure) {
            if (i[j].value === k.value) {
              if (typeof i[j].label === "boolean") {
                if (i[j].label) {
                  list.push(<h1 key={k.value}>{k.label}-yes</h1>);
                } else {
                  list.push(<h1 key={k.value}>{k.label}-no</h1>);
                }
              } else {
                list.push(
                  <h1 key={k.value}>
                    {k.label}-{i[j].label}
                  </h1>
                );
              }
            }
          }
        }
      }
    }
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
