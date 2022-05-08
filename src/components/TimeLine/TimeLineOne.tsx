import React, { useCallback, useMemo, useState } from "react";
import { SectionDoc, SideImageDoc } from "../../model/AppContextType";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import { useAppContext } from "../../Context/AppContext";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import EditingHook from "../../hook/EditingHook";
import TimeLineHook from "../../hook/TimeLineHook";
interface TimeLineOneInterface {
  item: SectionDoc;
}

const TimeLineOne: React.FC<TimeLineOneInterface> = ({ item }) => {
  const { font, color } = useAppContext();
  const {
    isEdit,
    editSwapDir,
    timeLines,
    changeEdit,
    onCancelEdit,
    onChangeTimelines,
    onUpate,
    onDelete,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);

  const { handleTitleText, handleBodyText, createNewTimeLine, deleteTimeLine } =
    TimeLineHook();

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

      <div className="text-center">
        <TitleText value={item.name} color={color.primary} />
      </div>

      <div className={`flex w-full mx-auto `} style={{ maxWidth: 900 }}>
        <div className="mx-auto w-full h-full">
          <div className="relative wrap overflow-hidden p-1 sm:p-10 h-full">
            <div
              className="border-2-2 absolute border-opacity-20 border-gray-400 h-full border"
              style={{ left: "50%" }}
            ></div>
            {/* flex-row-reverse */}
            {timeLines.map((timeLine, index) => (
              <div key={timeLine.id}>
                <div
                  className={`mb-8 flex justify-between items-center w-full right-timeline animate__animated animate__fadeIn ${
                    editSwapDir
                      ? index % 2 === 0
                        ? "flex-row-reverse"
                        : ""
                      : index % 2 !== 0
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <div className="order-1 w-5/12"></div>
                  <div
                    className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
                    style={{ backgroundColor: color.primary }}
                  >
                    <h1 className="mx-auto font-semibold text-lg text-white ">
                      {index + 1}
                    </h1>
                  </div>
                  <div className="order-1 w-5/12 py-4">
                    <div className="flex justify-center">
                      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm relative">
                        <div className="mb-2">
                          {isEdit && (
                            <div className="relative w-full animate__animated animate__fadeIn justify-start flex">
                              <input
                                value={timeLine.title_text}
                                onChange={(e) =>
                                  onChangeTimelines(
                                    handleTitleText(
                                      timeLines,
                                      timeLine.id,
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
                              value={timeLine.title_text}
                              color={color.primary}
                            />
                          )}

                          {isEdit && (
                            <div
                              onClick={() =>
                                onChangeTimelines(
                                  deleteTimeLine(timeLines, timeLine)
                                )
                              }
                              className={
                                "top-0 right-0 absolute h-10 w-10 bg-red-700 rounded-full flex items-center z-10 justify-center animate__animated animate__zoomIn cursor-pointer"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          {isEdit && (
                            <div className="relative w-full animate__animated animate__fadeIn justify-start flex">
                              <input
                                value={timeLine.body_text}
                                onChange={(e) =>
                                  onChangeTimelines(
                                    handleBodyText(
                                      timeLines,
                                      timeLine.id,
                                      e.target.value
                                    )
                                  )
                                }
                                type="text"
                                name="title"
                                className={[normalFormClasses].join(" ")}
                                placeholder=" "
                                style={{
                                  fontFamily: font.bodyFamily,
                                  fontSize: "1rem",
                                }}
                              />
                            </div>
                          )}

                          {!isEdit && <BodyText value={timeLine.body_text} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEdit && (
        <div className="flex flex-row justify-center items-center">
          <div
            onClick={() => onChangeTimelines(createNewTimeLine(timeLines))}
            className={
              "h-8 w-8 rounded-full flex items-center justify-center animate__animated animate__fadeInUp cursor-pointer"
            }
            style={{
              backgroundColor: color.primary,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      )}

      {isEdit && (
        <SectionSettingWrapper
          isEdit={isEdit}
          sectoinItem={item}
          onChangeDir={handleSwapDir}
          onChangeName={handlerName}
          onChangeShowNavbar={handShowNavbar}
        />
      )}
    </div>
  );
};

export default TimeLineOne;
