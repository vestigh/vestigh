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
    title: "Eli's Kolektion",
    description:
      "Eli's Kolektion was built on a simple belief: that great style should be accessible, intentional, and worth keeping. What began as a personal obsession with curating the right pieces grew into a destination for those who dress with purpose. Every item in the kolektion is handpicked — not for trend, but for lasting relevance. We look for silhouettes that command attention, fabrics that hold their shape, and pieces that feel like a statement every time you put them on. Eli's Kolektion is more than a store. It is a curation. A living archive of pieces that matter — footwear that tells a story, streetwear that earns its place, and apparel that outlasts the season it arrived in.",
    imageSrc: "/eliskolektion.jpeg",
    imageAlt: "Placeholder preview for the Eli's Kolektion storefront",
    href: "https://eliskolektion.vestigh.com",
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
