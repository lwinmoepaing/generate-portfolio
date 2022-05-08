import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import svgData from "../../shared/svgData.json";
import { nanoid } from "nanoid";

const sampleSelected: SectionDoc = {
  id: nanoid(), // Unique ID
  type: "Header", // Header
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

interface HeaderListInterface {
  id: string;
  name: string;
  list: string[];
  onSelected: () => void | any;
}

const HeaderList: React.FC<HeaderListInterface> = ({ list, onSelected }) => {
  const { onSelectSection } = useAppContext();

  const [classes, setClasses] = useState<string[]>(
    "relativebg-white rounded-lg overflow-hidden w-full animate__animated animate__fadeInUp".split(
      " "
    )
  );

  const onSelectedHandler = useCallback(
    (compName: string) => {
      onSelectSection({
        ...sampleSelected,
        id: nanoid(),
        type: "Header",
        comp_name: compName,
        name: "Home",
        side_image: {
          image_type: "svg",
          image_name: svgData.DeveloperOne,
          url: "",
        },
        buttons: [
          {
            id: nanoid(),
            name: "Show Alert",
            type: "solid",
            action_type: "alert",
            alert_title: "Testing Alert Message",
            phone: "",
            url: "",
          },
          {
            id: nanoid(),
            name: "Go Google",
            type: "outlined",
            action_type: "url",
            alert_title: "Alert Title",
            phone: "",
            url: "https://www.google.com.mm",
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

export default HeaderList;
