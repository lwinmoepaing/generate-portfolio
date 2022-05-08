import React, { useCallback, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { SectionDoc, SideImageDoc } from "../model/AppContextType";

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
  const [editName, seteditName] = useState<string>(item.name);
  const [editShowNavbar, setEditShowNavbar] = useState<boolean>(
    item.show_nav_bar
  );
  const [editSwapDir, setEditSwapDir] = useState<boolean>(item.swap_direction);
  const [sideImg, setSideImage] = useState<SideImageDoc>(
    item.side_image || { image_type: "svg", image_name: "", url: "" }
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
    if (onUpdateSection && item) {
      onUpdateSection({
        ...item,
        name: editName,
        show_nav_bar: editShowNavbar,
        swap_direction: editSwapDir,
        title_text: editTitle,
        body_text: editBodyText,
        type_effect_text: editTypeEffect.split(","),
        side_image: sideImg,
      });
    }
    setIsEdit(false);
  }, [
    editName,
    editShowNavbar,
    editSwapDir,
    editBodyText,
    editTitle,
    editTypeEffect,
    item,
    sideImg,
    onUpdateSection,
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
    seteditName(e);
  }, []);

  const handShowNavbar = useCallback((e: boolean) => {
    setEditShowNavbar(e);
  }, []);

  const handleSwapDir = useCallback((e: boolean) => {
    setEditSwapDir(e);
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
  };
};

export default EditingHook;
