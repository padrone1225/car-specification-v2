import { useEffect, useState } from "react";
import { useGlobalAllContext } from "../context/allPropertiesContext";
import { SpecDataType } from "../form";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

export const Dropdown = ({
  style,
  placeHolder,
  specifications,
  setSpecifications,
}: {
  style: string;
  placeHolder: string;
  specifications: SpecDataType[];
  setSpecifications: (c: Array<SpecDataType>) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [lists, setLists] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const { allList } = useGlobalAllContext();

  useEffect(() => {
    if (showMenu) {
      setLists(allList.filter((item) => item.type === style));
    }
  }, [showMenu]);

  // useEffect(() => {
  //   const handler = () => setShowMenu(false);
  //   console.log("h", handler);
  //   window.addEventListener("click", handler);
  //   return () => {
  //     window.removeEventListener("click", handler);
  //   };
  // });

  const handleInputclick = (e: any) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return placeHolder;
    }
    return selectedValue.label;
  };

  const onItemClick = (option: any) => {
    setSelectedValue(option);
    if (specifications) {
      let index = specifications.findIndex((item) => item.type === option.type);
      if (index === -1) {
        setSpecifications([...specifications, option]);
      } else {
        specifications[index] = option;
        setSpecifications(specifications);
      }
    }
  };

  const isSelected = (option: any) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  return (
    <div
      id="dropDown"
      className={`text-left relative border-2 border-primary-dark rounded-md`}
    >
      <div
        id="dropDownInput"
        className="p-[5px] flex items-center justify-between select-none"
        onClick={handleInputclick}
      >
        <div>{getDisplay()}</div>
        <div id="dropIcon" className="cursor-pointer">
          <Icon />
        </div>
      </div>
      {showMenu && (
        <div className="absolute bg-white max-h-20 w-full border-[1px] border-primary-dark rounded-md overflow-auto translate-y-1">
          {lists.map((list: any) => (
            <div
              className={`p-[5px] cursor-pointer bg-[#9fc3f870] ${
                isSelected(list) && "bg-[#0d6efd] text-white"
              }`}
              key={list.value}
              onClick={() => onItemClick(list)}
            >
              {list.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
