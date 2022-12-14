import { useGlobalCarContext } from "../context/carListContext";
import { Specification } from "./item";

export const SpecificationList = () => {
  const { cars } = useGlobalCarContext();
  return (
    <div className="border-2 border-primary-dark flex items-center justify-center flex-col py-14 gap-5 min-h-[calc(100vh-80px)]">
      {cars.map((car) => (
        <Specification title={car} key={car} />
      ))}
      <div className="bg-secondary-light text-primary-dark w-80 h-10 flex items-center justify-center font-bold text-xl rounded-md cursor-pointer border-primary-dark border-2">
        + Make new specification
      </div>
    </div>
  );
};
