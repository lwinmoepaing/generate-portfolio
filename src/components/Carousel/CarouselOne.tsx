import React, { useCallback, useMemo, useState } from "react";
import { SectionDoc, SideImageDoc } from "../../model/AppContextType";
import BodyText from "../Common/BodyText";
import TitleText from "../Common/TitleText";
import { useAppContext } from "../../Context/AppContext";
import SectionEditBoxWrapper from "../Common/SectionEditBoxWrapper";
import SectionSettingWrapper from "../Common/SectionSettingWrapper";
import EditingHook from "../../hook/EditingHook";
import CarouselHook from "../../hook/CarouselHook";
import { Carousel } from "react-responsive-carousel";
import CarouselImageUpload from "../Common/CarouselImageUpload";

interface CarouselOneInterface {
  item: SectionDoc;
}

const CarouselOne: React.FC<CarouselOneInterface> = ({ item }) => {
  const { font, color } = useAppContext();
  const {
    isEdit,
    carousels,
    changeEdit,
    onCancelEdit,
    onChangeTimelines,
    onChangeCarousels,
    onUpate,
    onDelete,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  } = EditingHook(item);

  const { handleImageText, createNewImage, deleteCarouselImg } = CarouselHook();

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

      <div className={`w-full mx-auto `}>
        <Carousel className=" mx-4 pt-2">
          {carousels?.map((car) => (
            <div key={car.id} className="relative rounded-xl overflow-hidden">
              <img
                src={car.image_name}
                alt={car.title_text}
                className="ss"
                style={{
                  maxHeight: "60vh",
                  objectFit: "cover",
                  objectPosition: "center bottom",
                }}
              />
              {car.title_text && <p className="legend">{car.title_text}</p>}

              {isEdit && (
                <div
                  className="top-0 absolute flex flex-row"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  <CarouselImageUpload
                    onChangeImage={(str: string) =>
                      onChangeCarousels(handleImageText(carousels, car.id, str))
                    }
                  />
                  <div
                    onClick={() =>
                      onChangeCarousels(deleteCarouselImg(carousels, car))
                    }
                    className={
                      "h-16 w-16 bg-red-700 rounded-full flex items-center z-10 justify-center animate__animated animate__fadeIn cursor-pointer"
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
            </div>
          ))}
        </Carousel>
      </div>

      {isEdit && (
        <div className="flex flex-row justify-center items-center">
          <div
            onClick={() => onChangeCarousels(createNewImage(carousels))}
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
            <TitleText value={"Add New Image"} color={"#fff"} />
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

export default CarouselOne;
