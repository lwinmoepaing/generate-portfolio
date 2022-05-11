import React, { useMemo } from "react";
import { useAppContext } from "../../Context/AppContext";
import EditingHook from "../../hook/EditingHook";
import ProjectCounterHook from "../../hook/ProjectCounterHook";
import { SectionDoc } from "../../model/AppContextType";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import TitleText from "../Common/TitleText";
import SvgSwitcher from "../Switcher/SvgSwticher";
import CountUp from "react-countup";

interface ProjectCounterOneInterface {
  item: SectionDoc;
}

const ProjectCounterOne: React.FC<ProjectCounterOneInterface> = ({ item }) => {
  const { color, font } = useAppContext();
  const {
    isEdit,
    projectCounters,
    editName,
    changeEdit,
    onCancelEdit,
    onChangeProjectCounters,
    onUpate,
    onDelete,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);

  const {
    handleImageText,
    isShowTimer,
    onChangeSVG,
    handleTitleText,
    handleCounterText,
  } = ProjectCounterHook();

  const normalFormClasses = useMemo<string>(
    () =>
      "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
    []
  );

  return (
    <div className="relative animate__animated animate__fadeIn">
      <SectionEditBoxWrapper
        isEdit={isEdit}
        changeEdit={changeEdit}
        onCancelEdit={onCancelEdit}
        onDelete={onDelete}
        onUpdate={onUpate}
        sectionItem={item}
      />

      <div className="text-center mt-2">
        <TitleText value={editName} color={color.primary} />
      </div>

      <section className="overflow-hidden text-gray-700 container pt-2 px-10 pb-5 mx-auto lg:pt-6">
        <div className="flex flex-wrap m-1 md:-m-2 justify-center items-center">
          {projectCounters?.map((pj, index) => (
            <div
              key={pj.id}
              className={"flex flex-wrap w-full sm:w-2/4 lg:w-1/4 relative "}
            >
              <div className="w-full p-1 md:p-2 flex flex-row justify-center">
                <div className="block flex flex-row flex-1 items-center p-4 rounded-lg shadow-lg bg-white max-w-sm relative">
                  <div className="w-20 h-20 mr-3 relative">
                    <SvgSwitcher
                      selectedComponent={pj?.image_name || ""}
                      onChangeSVG={(img: string) => {
                        onChangeProjectCounters(
                          onChangeSVG(projectCounters, pj.id, img)
                        );
                      }}
                      isEdit={isEdit}
                      isSmall={true}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      {isEdit && (
                        <div className="relative w-full animate__animated animate__fadeIn justify-start flex">
                          <input
                            value={pj.title_text}
                            onChange={(e) =>
                              onChangeProjectCounters(
                                handleTitleText(
                                  projectCounters,
                                  pj.id,
                                  e.target.value
                                )
                              )
                            }
                            type="text"
                            name="title"
                            className={[normalFormClasses].join(" ")}
                            placeholder=" "
                            style={{
                              fontFamily: font.titleFamily,
                              fontSize: "1.2rem",
                              color: color.primary,
                            }}
                          />
                        </div>
                      )}

                      {!isEdit && (
                        <TitleText
                          value={pj.title_text}
                          color={color.primary}
                        />
                      )}
                    </div>
                    <div>
                      {isEdit && (
                        <div className="relative w-full animate__animated animate__fadeIn justify-start flex">
                          <input
                            value={pj.counter}
                            onChange={(e) =>
                              onChangeProjectCounters(
                                handleCounterText(
                                  projectCounters,
                                  pj.id,
                                  +e.target.value
                                )
                              )
                            }
                            type="number"
                            name="title"
                            className={[normalFormClasses].join(" ")}
                            placeholder=" "
                            style={{
                              fontFamily: font.titleFamily,
                              fontSize: "1.2rem",
                            }}
                          />
                        </div>
                      )}

                      {!isEdit && (
                        <CountUp
                          end={pj.counter}
                          style={{ fontFamily: font.titleFamily, fontSize: "1.2rem", }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isEdit && (
        <SectionSettingWrapper
          isEdit={isEdit}
          sectoinItem={item}
          onChangeDir={handleSwapDir}
          onChangeName={handlerName}
          onChangeShowNavbar={handShowNavbar}
          isHideSwap={true}
        />
      )}
    </div>
  );
};

export default ProjectCounterOne;
