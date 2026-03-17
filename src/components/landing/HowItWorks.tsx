import { motion } from "framer-motion";
import { FileText, Store, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Apply",
    description:
      "Fill out a short form with your store details. We review and approve within hours.",
  },
  {
    icon: Store,
    title: "We build your store",
    description:
      "We set up your branded online store with all your products, categories, and payment integration.",
  },
  {
    icon: Rocket,
    title: "Go live",
    description:
      "Your store is live. Customers can browse, try on outfits virtually, and buy — all in one place.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-secondary py-20 md:py-28">
      <div className="container">
        <div className="text-center">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="section-headline mt-3">From signup to live store in one day</h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Dashed connector line — desktop only */}
          <div className="absolute top-12 left-[20%] right-[20%] hidden border-t-2 border-dashed border-border md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number badge */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {i + 1}
              </div>
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                <step.icon size={28} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
