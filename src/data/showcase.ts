export type ShowcaseItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isAvailable: boolean;
};

export const showcaseItems: ShowcaseItem[] = [
  {
    title: "Akosua Prints",
    description:
      "Akosua Print is an online fashion store offering beautiful kaftans, Ankara styles, and other elegant African wear for women who love comfort, culture, and style. We bring you carefully selected pieces that blend tradition with modern fashion, making it easy to shop standout looks for everyday wear and special occasions.",
    imageSrc: "/akosuaprint.jpeg",
    imageAlt: "Placeholder preview for the Akosua Prints storefront",
    href: "https://akosuaprints.vestigh.com",
    isAvailable: true,
  },
  
];
