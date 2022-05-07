import React, { useMemo } from "react";
import { useAppContext } from "../../Context/AppContext";

interface TitleTextInterface {
  value: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const TitleText: React.FC<TitleTextInterface> = ({
  value,
  size = "xl",
  color = "#000",
}) => {
  const { font } = useAppContext();

  const styles = useMemo(() => {
    return { fontFamily: font.titleFamily, color};
  }, [font, color]);

  return (
    <span className={`text-${size}`} style={styles}>
      {value}
    </span>
  );
};

export default TitleText;
