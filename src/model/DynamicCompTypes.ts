interface DynamicCompTypes {
  id: string;
  type:
    | "Header"
    | "Carousel"
    | "Skills"
    | "About Us"
    | "Services"
    | "Contact Us";
  image_url: string;
}

export default DynamicCompTypes;
