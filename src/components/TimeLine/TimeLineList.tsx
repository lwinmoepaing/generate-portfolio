import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import svgData from "../../shared/svgData.json";
import { nanoid } from "nanoid";

const sampleSelected: SectionDoc = {
  id: nanoid(), // Unique ID
  type: "TimeLine", // Header
  name: "", // HeaderOne
  comp_name: "",

  // Common Fields
  swap_direction: false,
  show_nav_bar: true,
  title_text: "Testing Title Text",
  body_text:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto, ex reprehenderit praesentium ducimus ",
  type_effect_text: ["Testing", "Hello"],
  buttons: [],
};

interface TimeLineInterface {
  id: string;
  name: string;
  list: string[];
  onSelected: () => void | any;
}

const TimeLineList: React.FC<TimeLineInterface> = ({ list, onSelected }) => {
  const { onSelectSection } = useAppContext();

  const [classes, setClasses] = useState<string[]>(
    "relativebg-white rounded-lg overflow-hidden w-full animate__animated animate__fadeInUp".split(
      " "
    )
  );

  const onSelectedHandler = useCallback(
    (compName: string) => {
      console.log(compName);
      onSelectSection({
        ...sampleSelected,
        id: nanoid(),
        type: "TimeLine",
        comp_name: compName,
        name: "New TimeLine",
        side_image: {
          image_type: "svg",
          image_name: svgData.DeveloperOne,
          url: "",
        },
        buttons: [],
        time_lines: [
          {
            id: nanoid(),
            icon_name: "",
            title_text: "TimeLine 1",
            body_text: "Hello 2022 bar nyar",
          },
          {
            id: nanoid(),
            icon_name: "",
            title_text: "TimeLine 2",
            body_text: "Hello 2022 bar nyar",
          },
        ],
      });
      if (onSelected) {
        onSelected();
      }
    },
    [onSelectSection, onSelected]
  );

  return (
    <div>
      <div className={classes.join(" ")}>
        <dl>
          {list.map((item, index) => (
            <div
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }  px-4 py-5 cursor-pointer`}
              key={item}
              onClick={() => onSelectedHandler(item)}
            >
              <dt className="text-sm font-medium text-primary">{item} </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default TimeLineList;
