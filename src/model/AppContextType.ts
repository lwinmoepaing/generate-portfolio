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

export interface AppContextInterface {
  title: string;
  font: FontDoc;
  color: ColorDoc;

  setFont?: (font: FontDoc) => void | any;
  setColor?: (color: ColorDoc) => void | any;
  setTitle?: (title: string) => void | any;
}
