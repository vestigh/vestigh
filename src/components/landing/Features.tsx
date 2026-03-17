import { motion } from "framer-motion";
import {
  Camera,
  LayoutDashboard,
  CreditCard,
  Package,
  Paintbrush,
  Mail,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Virtual try-on",
    description:
      "Customers upload a photo and see how outfits look on them before buying.",
  },
  {
    icon: LayoutDashboard,
    title: "Complete admin panel",
    description:
      "Manage products, orders, customers, and discounts from one dashboard.",
  },
  {
    icon: CreditCard,
    title: "Paystack payments",
    description:
      "Accept payments from cards and mobile money — settlements go directly to you.",
  },
  {
    icon: Package,
    title: "Order management",
    description:
      "Track every order, update statuses, and notify customers automatically.",
  },
  {
    icon: Paintbrush,
    title: "Custom branding",
    description:
      "Your logo, your colors, your domain — looks completely like your own store.",
  },
  {
    icon: Mail,
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
            Everything your store needs, nothing it doesn't
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              className="group rounded-lg border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                <feature.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-primary">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
