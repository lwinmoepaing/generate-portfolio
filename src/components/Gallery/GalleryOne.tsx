import React, { useCallback, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import EditingHook from "../../hook/EditingHook";
import GalleryHook from "../../hook/GalleryHook";
import { GalleryDoc, SectionDoc } from "../../model/AppContextType";
import CarouselImageUpload from "../Common/CarouselImageUpload";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import TitleText from "../Common/TitleText";
import GalleryEditModal from "../Modal/GalleryEditModal";

interface GalleryOneInterface {
  item: SectionDoc;
}

const GalleryOne: React.FC<GalleryOneInterface> = ({ item }) => {
  const { color } = useAppContext();
  const {
    isEdit,
    galleries,
    editName,
    changeEdit,
    onCancelEdit,
    onChangeGalleries,
    onUpate,
    onDelete,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);

  const {
    handleImageText,
    createNewImage,
    deleteGalleryImage,
    onUpdateGallery,
    onClickGallery,
  } = GalleryHook();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<GalleryDoc | null>(null);

  const onChangeGalleryAction = useCallback(
    (item: GalleryDoc) => {
      if (onChangeGalleries && item) {
        onChangeGalleries(onUpdateGallery(galleries, item));
      }
    },
    [galleries, onChangeGalleries, onUpdateGallery]
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

      <section className="overflow-hidden text-gray-700 container px-5 py-2 mx-auto lg:pt-6 lg:px-32">
        <div className="flex flex-wrap m-1 md:-m-2 justify-center">
          {galleries?.map((gar) => (
            <div
              key={gar.id}
              className={
                "flex flex-wrap w-1/2 sm:w-1/3 relative " +
                (gar.action_type !== "disabled" ? "cursor-pointer" : "")
              }
              onClick={() => {
                if (!isEdit) {
                  console.log("Hello", isEdit);
                  onClickGallery(gar);
                }
              }}
            >
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block object-cover object-center w-full h-full rounded-lg"
                  src={gar.image_name}
                />
              </div>
              {isEdit && (
                <div
                  className="top-0 absolute flex flex-row"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  <CarouselImageUpload
                    onChangeImage={(str: string) =>
                      onChangeGalleries(handleImageText(galleries, gar.id, str))
                    }
                    additionalClass="h-10 w-10 mr-2"
                  />

                  <div
                    onClick={() => {
                      setSelectedItem(gar);
                      setOpenModal(true);
                    }}
                    className={
                      "h-10 w-10 bg-blue-700 rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer mr-2"
                    }
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </div>
                  <div
                    onClick={() =>
                      onChangeGalleries(deleteGalleryImage(galleries, gar))
                    }
                    className={
                      "h-10 w-10 bg-red-700 rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer"
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
                </div>
              )}

              {isEdit && openModal && selectedItem && (
                <GalleryEditModal
                  gallery={selectedItem}
                  onUpdateGallery={onChangeGalleryAction}
                  onCloseModal={() => setOpenModal(false)}
                />
              )}

              {gar.action_type === "tel" && (
                <a
                  href={`tel:${gar.phone}`}
                  className="hidden"
                  id={`phone_${gar.id}`}
                >
                  -
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {isEdit && (
        <div className="flex flex-row justify-center items-center">
          <div
            onClick={() => onChangeGalleries(createNewImage(galleries))}
            className={
              "px-4 mb-2 py-1 rounded-full flex items-center justify-center animate__animated animate__fadeInUp cursor-pointer"
            }
            style={{
              backgroundColor: color.primary,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white mr-3"
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
            <TitleText value={"Add New Gallery"} color={"#fff"} />
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
          isHideSwap={true}
        />
      )}
    </div>
  );
};

export default GalleryOne;
