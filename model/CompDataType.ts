export interface CompDataType {
  header_text: string; // For Generate Html Header
  description_text: string;
  data: ComponetType[];
}

export interface ComponetType {
  id: string;
  type:
    | "Header"
    | "Carousel"
    | "Skills"
    | "Contact"
    | "Map"
    | "Form"
    | "Services";
  title_text: string;
  body_text: string;
  image_lists: ImageListType[];
  carouseL_list: ImageListType[];
  is_animate: boolean;
  animate_type: "FadeIn" | "Bounce";
}

export interface ImageListType {
  id: string;
  image: string; // base64 images
}
