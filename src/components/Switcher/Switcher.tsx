import React from "react";
import { useAppContext } from "../../Context/AppContext";
import CarouselList from "../Carousel/CarouselList";
import HeaderList from "../Headers/HeaderList";
import TimeLineList from "../TimeLine/TimeLineList";

interface selectedComponentInterface {
  id: string;
  name: string;
  list: string[];
}
interface SwitcherInterface {
  selectedComponent: selectedComponentInterface;
  onSelected: () => void | any;
}

const Switcher: React.FC<SwitcherInterface> = ({
  selectedComponent,
  onSelected,
}) => {
  return (
    <>
      {selectedComponent.id === "Header" && (
        <HeaderList {...selectedComponent} onSelected={onSelected} />
      )}

      {selectedComponent.id === "TimeLine" && (
        <TimeLineList {...selectedComponent} onSelected={onSelected} />
      )}

      {selectedComponent.id === "Carousel" && (
        <CarouselList {...selectedComponent} onSelected={onSelected} />
      )}
    </>
  );
};

export default Switcher;
