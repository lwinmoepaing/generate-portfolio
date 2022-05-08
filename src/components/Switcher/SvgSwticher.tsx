import React, { useCallback, useMemo } from "react";
import { useAppContext } from "../../Context/AppContext";
import HeaderList from "../Headers/HeaderList";
import DeveloperOneSVG from "../Svgs/DeveloperOneSVG";
import svgData from "../../shared/svgData.json";
import ReadingOneSVG from "../Svgs/ReadingOneSVG";

const imgArr = Object.keys(svgData);

interface SvgSwitcherInterface {
  selectedComponent: string;
  isEdit: boolean;
  onChangeSVG: (a: string) => void | any;
}

const sideClasses =
  "h-10 w-10 bg-gray-200 absolute rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer";

const SvgSwitcher: React.FC<SvgSwitcherInterface> = ({
  selectedComponent,
  onChangeSVG,
  isEdit,
}) => {
  const { color } = useAppContext();

  const currentIndex = useMemo(() => {
    return imgArr.findIndex((img) => img === selectedComponent);
  }, [selectedComponent]);

  const increaseImg = useCallback(() => {
    if (onChangeSVG && isEdit) {
      console.log(currentIndex + 1 < imgArr.length - 1);
      console.log(
        `currentIndex ${currentIndex} + 1 < imgLen ${imgArr.length - 1}`
      );
      let str =
        currentIndex + 1 < imgArr.length ? imgArr[currentIndex + 1] : imgArr[0];
      console.log("str", str);
      onChangeSVG(str);
    }
  }, [currentIndex, onChangeSVG, isEdit]);

  const decrementImg = useCallback(() => {
    if (onChangeSVG && isEdit) {
      let str =
        currentIndex - 1 < 0
          ? imgArr[imgArr.length - 1]
          : imgArr[currentIndex - 1];
      console.log("str", str);
      onChangeSVG(str);
    }
  }, [currentIndex, onChangeSVG, isEdit]);

  return (
    <>
      {selectedComponent === svgData.DeveloperOne && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <DeveloperOneSVG />
        </div>
      )}
      {selectedComponent === svgData.ReadingOne && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <ReadingOneSVG />
        </div>
      )}

      {isEdit && (
        <>
          <div
            onClick={decrementImg}
            className={sideClasses}
            style={{ left: 0, bottom: "50%", backgroundColor: color.primary }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6  text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div
            onClick={increaseImg}
            className={sideClasses}
            style={{ right: 6, bottom: "50%", backgroundColor: color.primary }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6  text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </>
      )}
    </>
  );
};

export default SvgSwitcher;
