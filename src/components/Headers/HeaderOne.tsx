import React, { useCallback, useMemo, useState } from "react";
import { SectionDoc, SideImageDoc } from "../../model/AppContextType";
import ReactTypingEffect from "react-typing-effect";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import DeveloperOneSVG from "../Svgs/DeveloperOneSVG";
import { useAppContext } from "../../Context/AppContext";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SvgSwitcher from "../Switcher/SvgSwticher";
import ImageUpload from "../Common/ImageUpload";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import EditingHook from "../../hook/EditingHook";
interface HeaderOneInterface {
  item: SectionDoc;
}

const HeaderOne: React.FC<HeaderOneInterface> = ({ item }) => {
  const { onDeleteSection, font, onUpdateSection, color } = useAppContext();
  const {
    isEdit,
    editTitle,
    editTypeEffect,
    editBodyText,
    editSwapDir,
    sideImg,
    changeEdit,
    onCancelEdit,
    handlerTitle,
    handlerBodyText,
    handlerTypeEffect,
    onUpate,
    onDelete,
    onChangeSVG,
    onChangeImage,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);
  const normalFormClasses = useMemo<string>(
    () =>
      "text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
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
      />

      <div
        className={`flex w-full ${
          editSwapDir
            ? "sm:flex-row-reverse flex-col-reverse"
            : " flex-col sm:flex-row"
        }`}
      >
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center pt-14 px-3 pb-4 sm:py-0">
          <div className="w-full text-center">
            {!isEdit && (
              <div className="animate__animated animate__fadeIn">
                <TitleText value={item.title_text} />
              </div>
            )}

            {isEdit && (
              <div className="relative w-full animate__animated animate__fadeIn">
                <input
                  value={editTitle}
                  onChange={handlerTitle}
                  type="text"
                  name="title"
                  className={[normalFormClasses].join(" ")}
                  placeholder=" "
                  style={{ fontFamily: font.titleFamily, fontSize: "1.3rem" }}
                />
              </div>
            )}
          </div>
          <div className="w-full text-center">
            {!isEdit && (
              <div className="animate__animated animate__fadeIn">
                <ReactTypingEffect
                  text={item.type_effect_text || [""]}
                  speed={100}
                  eraseSpeed={100}
                  typingDelay={1000}
                  eraseDelay={1800}
                  displayTextRenderer={(text: string, i: number) => {
                    return <TitleText size="md" value={text} />;
                  }}
                />
              </div>
            )}

            {isEdit && (
              <div className="relative w-full animate__animated animate__fadeIn">
                <input
                  value={editTypeEffect}
                  onChange={handlerTypeEffect}
                  type="text"
                  name="title"
                  className={[normalFormClasses].join(" ")}
                  placeholder=" "
                  style={{ fontFamily: font.titleFamily, fontSize: "1rem" }}
                />
              </div>
            )}
          </div>
          <div className="mt-1 text-center w-full">
            {!isEdit && (
              <div className="animate__animated animate__fadeIn">
                <BodyText value={item.body_text} />
              </div>
            )}

            {isEdit && (
              <div className="relative w-full animate__animated animate__fadeIn">
                <textarea
                  value={editBodyText}
                  onChange={handlerBodyText}
                  name="title"
                  className={[normalFormClasses].join(" ")}
                  placeholder=" "
                  style={{ fontFamily: font.bodyFamily, fontSize: "1rem" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 ">
          <div className="header-side-image p-4 relative">
            {isEdit && (
              <div
                className="side-imagee-border-image animate__animated animate__fadeIn z--1"
                style={{ borderColor: color.primary }}
              ></div>
            )}

            {sideImg.url ? (
              <img
                src={sideImg.url}
                className="object-contain"
                alt={editTitle}
              />
            ) : (
              <SvgSwitcher
                selectedComponent={sideImg?.image_name || ""}
                onChangeSVG={onChangeSVG}
                isEdit={isEdit}
              />
            )}

            {isEdit && (
              <ImageUpload onChangeImage={onChangeImage} url={sideImg.url} />
            )}
          </div>
        </div>
      </div>

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

export default HeaderOne;
