import { nanoid } from "nanoid";
import { useCallback } from "react";
import { CarouselDoc } from "../model/AppContextType";

const CarouselHook = () => {
  const createNewImage = (carouselList: CarouselDoc[]): CarouselDoc[] => {
    const newTimeLine: CarouselDoc = {
      id: nanoid(),
      image_name: "https://mdbootstrap.com/img/Photos/Slides/img%20(123).jpg",
      image_type: "normal",
      title_text: "",
      body_text: "",
    };
    return [...carouselList, newTimeLine];
  };

  const deleteCarouselImg = (
    carouselList: CarouselDoc[],
    delTimeline: CarouselDoc
  ): CarouselDoc[] => {
    return carouselList.filter((tl) => tl.id !== delTimeline.id);
  };

  const handleTitleText = (
    carouselList: CarouselDoc[],
    id: string,
    title: string
  ): CarouselDoc[] => {
    const updateCarousel = [...carouselList];
    const index = updateCarousel.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateCarousel[index].title_text = title;
    }
    return [...updateCarousel];
  };

  const handleBodyText = (
    carouselList: CarouselDoc[],
    id: string,
    title: string
  ): CarouselDoc[] => {
    const updateCarousel = [...carouselList];
    const index = updateCarousel.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateCarousel[index].body_text = title;
    }
    return [...updateCarousel];
  };

  const handleImageText = useCallback(
    (carouselList: CarouselDoc[], id: string, imageBase64: string) => {
      const updateCarousel = [...carouselList];
      const index = updateCarousel.findIndex((tl) => tl.id === id);
      if (index !== -1) {
        updateCarousel[index].image_name = imageBase64;
      }
      return [...updateCarousel];
    },
    []
  );

  const onUpTimeLineItem = (
    carouselList: CarouselDoc[],
    id: string
  ): CarouselDoc[] => {
    const updateCarousel = [...carouselList];
    const index = updateCarousel.findIndex((tl) => tl.id === id);
    if (index !== -1 && index !== 0) {
      const upData = { ...updateCarousel[index - 1] };
      updateCarousel[index - 1] = { ...updateCarousel[index] };
      updateCarousel[index] = upData;
    }

    return [...updateCarousel];
  };

  return {
    createNewImage,
    deleteCarouselImg,
    handleImageText,
    handleTitleText,
    handleBodyText,
    onUpTimeLineItem,
  };
};

export default CarouselHook;
