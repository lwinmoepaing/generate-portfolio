import React, { useCallback, useState } from "react";
import { SectionDoc } from "../../model/AppContextType";
import ReactTypingEffect from "react-typing-effect";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import DeveloperOneSVG from "../Svgs/DeveloperOneSVG";
import { useAppContext } from "../../Context/AppContext";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
interface HeaderOneInterface {
  item: SectionDoc;
}

const HeaderOne: React.FC<HeaderOneInterface> = ({ item }) => {
  const { onDeleteSection } = useAppContext();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const changeEdit = useCallback(() => setIsEdit(true), []);

  const onCancelEdit = useCallback(() => setIsEdit(false), []);

  const onDelete = useCallback(() => {
    if (onDeleteSection && item) {
      onDeleteSection(item);
    }
  }, [item, onDeleteSection]);

  return (
    <div className="relative animate__animated animate__fadeIn">
      <SectionEditBoxWrapper
        isEdit={isEdit}
        changeEdit={changeEdit}
        onCancelEdit={onCancelEdit}
        onDelete={onDelete}
      />

      <div className="flex flex-col sm:flex-row w-full">
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center pt-14 px-3 pb-4 sm:py-0">
          <div>{!isEdit && <TitleText value={item.title_text} />}</div>
          <div>
            {!isEdit && (
              <ReactTypingEffect
                text={item.type_effect_text || [""]}
                displayTextRenderer={(text: string, i: number) => {
                  return <TitleText size="md" value={text} />;
                }}
              />
            )}
          </div>
          <div className="mt-1 text-center">
            {!isEdit && <BodyText value={item.body_text} />}
          </div>
        </div>
        <div className="w-full sm:w-1/2 ">
          <div className="header-side-image p-4">
            <DeveloperOneSVG />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOne;
