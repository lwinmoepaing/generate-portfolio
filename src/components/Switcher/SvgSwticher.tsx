import React, { useCallback, useMemo } from "react";
import { useAppContext } from "../../Context/AppContext";
import DeveloperOneSVG from "../Svgs/DeveloperOneSVG";
import svgData from "../../shared/svgData.json";
import ReadingOneSVG from "../Svgs/ReadingOneSVG";
import ProjectOneSVG from "../Svgs/ProjectOneSVG";
import MyAppOneSVG from "../Svgs/MyAppOneSVG";
import GrowthCurveSVG from "../Svgs/GrowthCurveSVG";
import GoodTeamOneSVG from "../Svgs/GoodTeamOneSVG";
import GrowhAnalysisSVG from "../Svgs/GrowthAnalysisSVG";

const imgArr = Object.keys(svgData);

interface SvgSwitcherInterface {
  selectedComponent: string;
  isEdit: boolean;
  onChangeSVG: (a: string) => void | any;
  isSmall?: boolean;
}

const SvgSwitcher: React.FC<SvgSwitcherInterface> = ({
  selectedComponent,
  onChangeSVG,
  isEdit,
  isSmall,
}) => {
  const { color } = useAppContext();

  const sideClasses = useMemo(() => {
    const defaultClasses =
      "bg-gray-200 absolute rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer";

    if (isSmall) {
      return defaultClasses + " h-6 w-6";
    }

    return defaultClasses + " h-10 w-10 ";
  }, [isSmall]);

  const iconClasses = useMemo(() => {
    const defaultClasses = "  text-white";

    if (isSmall) {
      return defaultClasses + " h-4 w-4";
    }

    return defaultClasses + " h-6 w-6 ";
  }, [isSmall]);

  const leftStyles = useMemo<any>(() => {
    let defaultStyle = {
      left: 6,
      top: "50%",
      backgroundColor: color.primary,
      transform: {},
    };
    if (isSmall) {
      defaultStyle.transform = "translateY(-50%)";
      defaultStyle.left = -10;
    }
    return defaultStyle;
  }, [color, isSmall]);

  const rightStyle = useMemo<any>(() => {
    let defaultStyle = {
      right: 6,
      top: "50%",
      backgroundColor: color.primary,
      transform: {},
    };
    if (isSmall) {
      defaultStyle.transform = "translateY(-50%)";
      defaultStyle.right = -10;
    }
    return defaultStyle;
  }, [color, isSmall]);

  const currentIndex = useMemo<number>(() => {
    return imgArr.findIndex((img) => img === selectedComponent);
  }, [selectedComponent]);

  const increaseImg = useCallback(() => {
    if (onChangeSVG && isEdit) {
      let str =
        currentIndex + 1 < imgArr.length ? imgArr[currentIndex + 1] : imgArr[0];
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

      {selectedComponent === svgData.ProjectOne && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <ProjectOneSVG />
        </div>
      )}

      {selectedComponent === svgData.MyAppOne && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <MyAppOneSVG />
        </div>
      )}

      {selectedComponent === svgData.GrowthCurve && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <GrowthCurveSVG />
        </div>
      )}

      {selectedComponent === svgData.GoodTeamOne && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <GoodTeamOneSVG />
        </div>
      )}

      {selectedComponent === svgData.GrowthAnalysis && (
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col justify-center"
        >
          <GrowhAnalysisSVG />
        </div>
      )}

      {isEdit && (
        <>
          <div
            onClick={decrementImg}
            className={sideClasses}
            style={leftStyles}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={iconClasses}
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
          <div onClick={increaseImg} className={sideClasses} style={rightStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={iconClasses}
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
