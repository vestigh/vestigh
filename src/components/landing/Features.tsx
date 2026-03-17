import { Shirt, LayoutDashboard, CreditCard, Package, Palette, Mail } from "lucide-react";

const features = [
  {
    icon: <Shirt size={32} color="#f0a500" />,
    title: "Virtual try-on",
    description:
      "Customers upload a photo and see how outfits look on them before buying.",
  },
  {
    icon: <LayoutDashboard size={32} color="#f0a500" />,
    title: "Complete admin panel",
    description:
      "Manage products, orders, customers, and discounts from one dashboard.",
  },
  {
    icon: <CreditCard size={32} color="#f0a500" />,
    title: "Paystack payments",
    description:
      "Accept cards and mobile money — settlements go directly to your account.",
  },
  {
    icon: <Package size={32} color="#f0a500" />,
    title: "Order management",
    description:
      "Track every order, update statuses, and notify customers automatically.",
  },
  {
    icon: <Palette size={32} color="#f0a500" />,
    title: "Custom branding",
    description:
      "Your logo, your colors, your domain — looks completely like your own store.",
  },
  {
    icon: <Mail size={32} color="#f0a500" />,
    title: "Email notifications",
    description:
      "Automatic order confirmations, shipping updates, and welcome emails.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center">
          <p className="section-label">FEATURES</p>
          <h2 className="section-headline mt-3">
            Everything your store needs, nothing it doesn&apos;t
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] border border-[#e5e7eb] bg-white p-6 transition-shadow duration-300 hover:[box-shadow:0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="leading-none">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-[#14213d]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
