import React from "react";
import { useAppContext } from "../../Context/AppContext";
import HeaderList from "../Headers/HeaderList";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}
interface SwitcherInterface {
  selectedComponent: selectedComponentInterface;
}

const Switcher: React.FC<SwitcherInterface> = ({ selectedComponent }) => {
  const { onSelectSection } = useAppContext();

  return (
    <>
      {selectedComponent.id === "Header" && (
        <HeaderList {...selectedComponent} onSelectSection={onSelectSection} />
      )}
    </>
  );
};

export default Switcher;
