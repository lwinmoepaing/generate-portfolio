export interface FontDoc {
  titleFamily: string;
  titleFamilyUrl: string;
  bodyFamily: string;
  bodyFamilyUrl: string;
}

export interface ColorDoc {
  primary: string;
  secondary: string;
  warning: string;
  danger: string;
  background: string;
}

export interface TextDoc {
  value: string;
  color: string;
  type: "normal" | "typeeffect";
  text_lists: { id: string; value: string }[];
}
export interface BgImageDoc {
  url: string;
}

export interface SideImageDoc {
  image_type: "normal" | "svg";
  image_name: string;
  url: string;
  text?: TextDoc;
}

export interface ButtonDoc {
  id: string;
  name: string;
  icon_name?: string;
  action_type: "url" | "alert";
  alert_title?: string;
  alert_body?: string;
  url: string;
}
export interface SectionDoc {
  id: string; // Unique ID
  type: string; // Header
  name: string; // Nav Name -> Home, About
  comp_name: string; // HeaderOne, HeaderTwo

  // Common Fields
  swap_direction: boolean;
  title_text: string;
  body_text: string;
  type_effect_text?: string[];
  bg_image?: BgImageDoc;
  side_image?: SideImageDoc;
  buttons: ButtonDoc[];
}

export interface AppContextInterface {
  title: string;
  font: FontDoc;
  color: ColorDoc;
  sections: SectionDoc[];

  setFont?: (font: FontDoc) => void | any;
  setColor?: (color: ColorDoc) => void | any;
  setTitle?: (title: string) => void | any;
  onUpdateSection?: (section: SectionDoc) => void | any;
  onDeleteSection?: (section: SectionDoc) => void | any;
  onSelectSection: (section: SectionDoc) => void | any;
}
