import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import CarouselOne from "../Carousel/CarouselOne";
import GalleryOne from "../Gallery/GalleryOne";
import HeaderOne from "../Headers/HeaderOne";
import ProjectCounterOne from "../ProjectCounter/ProjectCounterOne";
import TimeLineOne from "../TimeLine/TimeLineOne";

interface SwitcherDetailInterface {
  selectedComponent: SectionDoc;
}

const SwitcherDetail: React.FC<SwitcherDetailInterface> = ({
  selectedComponent,
}) => {
  const { editingSections } = useAppContext();

  return (
    <div
      className={`${
        editingSections === selectedComponent.id ? "z-20 relative" : ""
      } mb-4`}
      id={`${selectedComponent.id}`}
    >
      {selectedComponent.type === "Header" &&
        selectedComponent.comp_name === "HeaderOne" && (
          <HeaderOne item={selectedComponent} />
        )}

      {selectedComponent.type === "TimeLine" &&
        selectedComponent.comp_name === "TimeLineOne" && (
          <TimeLineOne item={selectedComponent} />
        )}

      {selectedComponent.type === "Carousel" &&
        selectedComponent.comp_name === "CarouselOne" && (
          <CarouselOne item={selectedComponent} />
        )}

      {selectedComponent.type === "Gallery" &&
        selectedComponent.comp_name === "GalleryOne" && (
          <GalleryOne item={selectedComponent} />
        )}

      {selectedComponent.type === "ProjectCounter" &&
        selectedComponent.comp_name === "ProjectCounterOne" && (
          <ProjectCounterOne item={selectedComponent} />
        )}
    </div>
  );
};

export default SwitcherDetail;
