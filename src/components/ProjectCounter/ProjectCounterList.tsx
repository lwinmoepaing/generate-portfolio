import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { SectionDoc } from "../../model/AppContextType";
import svgData from "../../shared/svgData.json";
import { nanoid } from "nanoid";

const sampleSelected: SectionDoc = {
  id: nanoid(), // Unique ID
  type: "ProjectCounter", // Header
  name: "Projects", // HeaderOne
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

interface ProjectCounterListInterface {
  id: string;
  name: string;
  list: string[];
  onSelected: () => void | any;
}

const ProjectCounterList: React.FC<ProjectCounterListInterface> = ({
  list,
  onSelected,
}) => {
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
        type: "ProjectCounter",
        comp_name: compName,
        name: "Projects",
        side_image: {
          image_type: "svg",
          image_name: svgData.DeveloperOne,
          url: "",
        },
        project_counter_list: [
          {
            id: nanoid(),
            image_name: svgData.ProjectOne,
            image_type: "svg",
            title_text: "Clients",
            body_text: "Blah Blah",
            counter: 10,
          },
          {
            id: nanoid(),
            image_name: svgData.MyAppOne,
            image_type: "svg",
            title_text: "Projects",
            body_text: "Blah Blah",
            counter: 20,
          },
          {
            id: nanoid(),
            image_name: svgData.GrowthCurve,
            image_type: "svg",
            title_text: "Services",
            body_text: "Blah Blah",
            counter: 30,
          },
          {
            id: nanoid(),
            image_name: svgData.GoodTeamOne,
            image_type: "svg",
            title_text: "Others",
            body_text: "Blah Blah",
            counter: 40,
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

export default ProjectCounterList;
