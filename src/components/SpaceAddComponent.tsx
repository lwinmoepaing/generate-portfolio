import React, { useCallback, useState } from "react";

interface SpaceAddComponentInterface {
  onClick: () => void | any;
}

const SpaceAddComponent: React.FC<SpaceAddComponentInterface> = ({
  onClick,
}) => {
  const [classes, setClasses] = useState<string[]>([
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

  return (
    <div className={classes.join(" ")} onClick={onClickHandler}>
      Space Add Component
    </div>
  );
};

export default SpaceAddComponent;
