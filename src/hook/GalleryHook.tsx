import { nanoid } from "nanoid";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { GalleryDoc } from "../model/AppContextType";

const GalleryHook = () => {
  const createNewImage = (galleryList: GalleryDoc[]): GalleryDoc[] => {
    const newTimeLine: GalleryDoc = {
      id: nanoid(),
      image_name: "https://mdbootstrap.com/img/Photos/Slides/img%20(123).jpg",
      image_type: "normal",
      action_type: "disabled",
      title_text: "",
      body_text: "",
      alert_title: "",
      phone: "",
      url: "",
    };
    return [...galleryList, newTimeLine];
  };

  const deleteGalleryImage = (
    galleryList: GalleryDoc[],
    delTimeline: GalleryDoc
  ): GalleryDoc[] => {
    return galleryList.filter((tl) => tl.id !== delTimeline.id);
  };

  const handleTitleText = (
    galleryList: GalleryDoc[],
    id: string,
    title: string
  ): GalleryDoc[] => {
    const updateGallery = [...galleryList];
    const index = updateGallery.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateGallery[index].title_text = title;
    }
    return [...updateGallery];
  };

  const handleBodyText = (
    galleryList: GalleryDoc[],
    id: string,
    title: string
  ): GalleryDoc[] => {
    const updateGallery = [...galleryList];
    const index = updateGallery.findIndex((tl) => tl.id === id);
    if (index !== -1) {
      updateGallery[index].body_text = title;
    }
    return [...updateGallery];
  };

  const handleImageText = useCallback(
    (galleryList: GalleryDoc[], id: string, imageBase64: string) => {
      const updateGallery = [...galleryList];
      const index = updateGallery.findIndex((tl) => tl.id === id);
      if (index !== -1) {
        updateGallery[index].image_name = imageBase64;
      }
      return [...updateGallery];
    },
    []
  );

  const onUpGalleryComp = (
    galleryList: GalleryDoc[],
    id: string
  ): GalleryDoc[] => {
    const updateGallery = [...galleryList];
    const index = updateGallery.findIndex((tl) => tl.id === id);
    if (index !== -1 && index !== 0) {
      const upData = { ...updateGallery[index - 1] };
      updateGallery[index - 1] = { ...updateGallery[index] };
      updateGallery[index] = upData;
    }

    return [...updateGallery];
  };

  const onUpdateGallery = useCallback(
    (galleriesList: GalleryDoc[], item: GalleryDoc) => {
      const updateGallery = [...galleriesList];
      const findIndex = updateGallery.findIndex((b) => b.id === item.id);
      if (findIndex !== -1) {
        updateGallery[findIndex] = item;
      }

      return [...updateGallery];
    },
    []
  );

  const onClickGallery = useCallback((item: GalleryDoc) => {
    console.log("Inside");
    console.log(item);
    if (item.action_type === "alert") {
      toast(item.alert_title, { position: "top-center", autoClose: 3000 });
      return;
    }

    if (item.action_type === "url" && item.url && window) {
      window.open(item.url, "_blank")?.focus();
      return;
    }

    if (item.action_type === "tel") {
      const phBtn = document.getElementById(`phone_${item.id}`);
      phBtn?.click();
    }
  }, []);

  return {
    createNewImage,
    deleteGalleryImage,
    handleImageText,
    handleTitleText,
    handleBodyText,
    onUpGalleryComp,
    onUpdateGallery,
    onClickGallery,
  };
};

export default GalleryHook;
