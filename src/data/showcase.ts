export type ShowcaseItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isAvailable: boolean;
  badge?: string;
  tag?: string;
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
    badge: "Fashion Boutique",
    tag: "Live Store",
  },
   {
    title: "E&S Closet",
    description:
      "E&S Closet was created with the idea that great style should feel both beautiful and attainable. We believe fashion should inspire confidence, reflect individuality, and make every woman feel her best without compromise.Based in Ghana, our brand is built around carefully selected styles that bring together modern trends, elegance, and effortless sophistication. Each collection is chosen for women who appreciate fashion that feels refined, confident, and easy to wear.",
    imageSrc: "/eandscloset.jpeg",
    imageAlt: "Placeholder preview for the E&S Closet storefront",
    href: "https://escloset.vestigh.com",
    isAvailable: true,
    badge: "Contemporary Fashion",
    tag: "Featured",
  },
  
];
