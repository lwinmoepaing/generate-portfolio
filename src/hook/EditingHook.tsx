import React, { useCallback, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import {
  ButtonDoc,
  CarouselDoc,
  GalleryDoc,
  SectionDoc,
  SideImageDoc,
  TimeLineDoc,
} from "../model/AppContextType";

const EditingHook = (item: SectionDoc) => {
  const {
    onDeleteSection,
    onUpdateSection,
    setClearSection,
    setEditingSection,
  } = useAppContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(item.title_text);
  const [editTypeEffect, setEditTypeEffect] = useState<string>(
    item.type_effect_text?.join(",") || ""
  );
  const [editBodyText, setEditBodyText] = useState<string>(item.body_text);
  const [editName, setEditName] = useState<string>(item.name);
  const [editShowNavbar, setEditShowNavbar] = useState<boolean>(
    item.show_nav_bar
  );
  const [editSwapDir, setEditSwapDir] = useState<boolean>(item.swap_direction);
  const [sideImg, setSideImage] = useState<SideImageDoc>(
    item.side_image || { image_type: "svg", image_name: "", url: "" }
  );
  const [buttons, setButtons] = useState<ButtonDoc[]>(item.buttons);
  const [timeLines, setTimeLines] = useState<TimeLineDoc[]>(
    item?.time_lines || []
  );
  const [carousels, setCarousels] = useState<CarouselDoc[]>(
    item?.carousels || []
  );
  const [galleries, setGalleries] = useState<GalleryDoc[]>(
    item?.galleries || []
  );

  const changeEdit = useCallback(() => {
    setIsEdit(true);
    if (setEditingSection) {
      setEditingSection(item);
    }
  }, [item, setEditingSection]);

  const onCancelEdit = useCallback(() => {
    setIsEdit(false);
    setEditTitle(item.title_text);
    setEditTypeEffect(item.type_effect_text?.join(",") || "");
    setEditBodyText(item.body_text);
    setButtons(item.buttons);
    setEditName(item.name);
    setEditShowNavbar(item.show_nav_bar);
    setEditSwapDir(item.swap_direction);
    setTimeLines(item.time_lines || []);
    setCarousels(item.carousels || []);
    setGalleries(item.galleries || []);
    if (item.side_image) {
      setSideImage(item.side_image);
    }
    if (setClearSection) {
      setClearSection();
    }
  }, [item, setClearSection]);

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
    if (!editName.trim()) {
      alert("Need Navbar Title is Required");
      return;
    }

    if (
      onDeleteSection &&
      item.type === "Carousel" &&
      carousels &&
      carousels?.length <= 0
    ) {
      setIsEdit(false);
      onDeleteSection(item);
      return;
    }

    if (
      onDeleteSection &&
      item.type === "Gallery" &&
      galleries &&
      galleries?.length <= 0
    ) {
      setIsEdit(false);
      onDeleteSection(item);
      return;
    }

    if (
      onDeleteSection &&
      item.type === "TimeLine" &&
      timeLines &&
      timeLines?.length <= 0
    ) {
      console.log("Is Inside Delete");
      setIsEdit(false);
      onDeleteSection(item);
      return;
    }

    if (onUpdateSection && item) {
      const updateItem: SectionDoc = {
        ...item,
        name: editName,
        show_nav_bar: editShowNavbar,
        swap_direction: editSwapDir,
        title_text: editTitle,
        body_text: editBodyText,
        type_effect_text: editTypeEffect.split(","),
        side_image: sideImg,
        buttons: buttons,
        time_lines: timeLines,
        carousels: carousels,
        galleries: galleries,
      };

      onUpdateSection(updateItem);
      setIsEdit(false);
    }

    setIsEdit(false);
  }, [
    editName,
    onDeleteSection,
    item,
    carousels,
    galleries,
    timeLines,
    onUpdateSection,
    editShowNavbar,
    editSwapDir,
    editTitle,
    editBodyText,
    editTypeEffect,
    sideImg,
    buttons,
  ]);

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

  const handlerName = useCallback((e: string) => {
    setEditName(e);
  }, []);

  const handShowNavbar = useCallback((e: boolean) => {
    setEditShowNavbar(e);
  }, []);

  const handleSwapDir = useCallback((e: boolean) => {
    setEditSwapDir(e);
  }, []);

  const onChangeButtons = useCallback((btns: ButtonDoc[]) => {
    setButtons(btns);
  }, []);

  const onChangeTimelines = useCallback((tls: TimeLineDoc[]) => {
    setTimeLines(tls);
  }, []);

  const onChangeCarousels = useCallback((cls: CarouselDoc[]) => {
    setCarousels(cls);
  }, []);

  const onChangeGalleries = useCallback((glr: GalleryDoc[]) => {
    setGalleries(glr);
  }, []);

  return {
    isEdit,
    editTitle,
    editTypeEffect,
    editBodyText,
    editName,
    editShowNavbar,
    editSwapDir,
    sideImg,
    buttons,
    timeLines,
    carousels,
    galleries,
    changeEdit,
    onCancelEdit,
    handlerTitle,
    handlerBodyText,
    handlerTypeEffect,
    onUpate,
    onDelete,
    onChangeSVG,
    onChangeButtons,
    onChangeTimelines,
    onChangeCarousels,
    onChangeGalleries,
    onChangeImage,
    handlerName,
    handShowNavbar,
    handleSwapDir,
  };
};

export default EditingHook;
