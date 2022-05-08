import React, { useCallback, useMemo, useState } from "react";
import { SectionDoc, SideImageDoc } from "../../model/AppContextType";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import { useAppContext } from "../../Context/AppContext";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import EditingHook from "../../hook/EditingHook";
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
    onUpate,
    onDelete,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);

  const normalFormClasses = useMemo<string>(
    () =>
      "text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark: dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
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
                      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                        <div className="mb-2">
                          <TitleText
                            value={timeLine.title_text}
                            color={color.primary}
                          />
                        </div>
                        <div>
                          <BodyText value={timeLine.body_text} />
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

      {/* <div className="mb-8 flex justify-between  items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div
                className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full"
                style={{ backgroundColor: color.primary }}
              >
                <h1 className="mx-auto  font-semibold text-lg text-white">2</h1>
              </div>
              <div className="order-1 w-5/12 py-4">
                <div className="flex justify-center">
                  <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <div className="mb-2">
                      <TitleText value="Card title" color={color.primary} />
                    </div>
                    <p className="text-gray-700 text-base mb-4">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

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
