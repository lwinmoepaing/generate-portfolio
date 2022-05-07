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
interface HeaderOneInterface {
  item: SectionDoc;
}

const HeaderOne: React.FC<HeaderOneInterface> = ({ item }) => {
  const { onDeleteSection, font, onUpdateSection, color } = useAppContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(item.title_text);
  const [editTypeEffect, setEditTypeEffect] = useState<string>(
    item.type_effect_text?.join(",") || ""
  );
  const [editBodyText, setEditBodyText] = useState<string>(item.body_text);
  const [sideImg, setSideImage] = useState<SideImageDoc>(
    item.side_image || { image_type: "svg", image_name: "", url: "" }
  );

  const normalFormClasses = useMemo<string>(
    () =>
      "text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
    []
  );

  const changeEdit = useCallback(() => setIsEdit(true), []);

  const onCancelEdit = useCallback(() => {
    setIsEdit(false);
    setEditTitle(item.title_text);
    setEditTypeEffect(item.type_effect_text?.join(",") || "");
    if (item.side_image) {
      setSideImage(item.side_image);
    }
  }, [item]);

  const handlerTitle = useCallback((e: any) => {
    setEditTitle(e.target.value);
  }, []);

  const handlerBodyText = useCallback((e: any) => {
    setEditBodyText(e.target.value);
  }, []);

  const handlerTypeEffect = useCallback((e: any) => {
    setEditTypeEffect(e.target.value);
  }, []);

  const onUpate = useCallback(() => {
    if (onUpdateSection && item) {
      onUpdateSection({
        ...item,
        title_text: editTitle,
        body_text: editBodyText,
        type_effect_text: editTypeEffect.split(","),
        side_image: sideImg,
      });
    }
    setIsEdit(false);
  }, [editBodyText, editTitle, editTypeEffect, item, sideImg, onUpdateSection]);

  const onDelete = useCallback(() => {
    setIsEdit(false);
    if (onDeleteSection && item) {
      onDeleteSection(item);
    }
  }, [item, onDeleteSection]);

  const onChangeSVG = useCallback((str: string) => {
    setSideImage((prev) => ({ ...prev, image_name: str }));
  }, []);

  const onChangeImage = useCallback((str: string) => {
    setSideImage((prev) => ({ ...prev, url: str }));
  }, []);

  return (
    <div className="relative animate__animated animate__fadeIn">
      <SectionEditBoxWrapper
        isEdit={isEdit}
        changeEdit={changeEdit}
        onCancelEdit={onCancelEdit}
        onDelete={onDelete}
        onUpdate={onUpate}
      />

      <div className="flex flex-col sm:flex-row w-full">
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

            {/* {JSON.stringify(sideImg)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOne;
