import React from "react";
import { useAppContext } from "../../Context/AppContext";
import HeaderList from "../Headers/HeaderList";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}
interface SvgSwitcherInterface {
  selectedComponent: selectedComponentInterface;
  onSelected: () => void | any;
}

const SvgSwitcher: React.FC<SvgSwitcherInterface> = ({
  selectedComponent,
  onSelected,
}) => {
  return (
    <>
      {selectedComponent.id === "Header" && (
        <HeaderList {...selectedComponent} onSelected={onSelected} />
      )}
    </>
  );
};

export default SvgSwitcher;
