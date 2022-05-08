import React, { useCallback, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import TitleText from "./Common/TitleText";

interface SpaceAddComponentInterface {
  onClick: () => void | any;
}

const SpaceAddComponent: React.FC<SpaceAddComponentInterface> = ({
  onClick,
}) => {
  const { color, editingSections } = useAppContext();

  const [classes, setClasses] = useState<string[]>([
    "container mx-auto",
    "space-add-component",
    "animate__animated",
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const onClickHandler = useCallback(() => {
    if (loading) return;
    setLoading(true);
    // alert("Lwin");
    setClasses((prev) => [...prev, "animate__bounceIn"]);

    setTimeout(() => {
      if (onClick) {
        onClick();
      }
    }, 300);

    setTimeout(() => {
      setClasses((prev) => prev.filter((p) => p !== "animate__bounceIn"));
      setLoading(false);
    }, 600);
  }, [loading, onClick]);

  return !editingSections ? (
    <div
      className={classes.join(" ")}
      onClick={onClickHandler}
      // style={{ borderColor: color.primary }}
    >
      <TitleText value={"Add New Section"} color={color.primary} />
      <div
        className="space-add-component-border"
        style={{
          borderColor: color.primary,
        }}
      ></div>
    </div>
  ) : null;
};

export default SpaceAddComponent;
