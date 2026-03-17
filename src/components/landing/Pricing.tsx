import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const free = {
  badge: "FREE",
  price: "₵0",
  period: "/month",
  sub: "5% of transactions",
  features: [
    { text: "Complete online store", included: true },
    { text: "Virtual try-on included", included: true },
    { text: "Paystack payments", included: true },
    { text: "Up to 50 try-on requests/month", included: true },
    { text: "Vestigh subdomain", included: true },
    { text: "Custom domain", included: false },
    { text: "Priority support", included: false },
  ],
  cta: "Get started free",
  featured: false,
};

const pro = {
  badge: "PRO",
  price: "₵375",
  period: "/month",
  sub: "or save up to 32% with longer plans",
  commitments: ["3 months", "6 months", "12 months"],
  features: [
    { text: "Everything in Free", included: true },
    { text: "Unlimited try-on requests", included: true },
    { text: "Custom domain", included: true },
    { text: "0% transaction fee", included: true },
    { text: "Priority WhatsApp support", included: true },
    { text: "Faster store setup", included: true },
  ],
  cta: "Get started",
  featured: true,
};

const PricingCard = ({
  plan,
}: {
  plan: typeof free | typeof pro;
}) => {
  const isFeatured = plan.featured;
  return (
    <div
      className={`relative flex flex-col rounded-lg border p-8 ${
        isFeatured
          ? "border-accent bg-vestigh-amber-light scale-[1.02]"
          : "border-border bg-card"
      }`}
    >
      <span
        className={`inline-block self-start rounded-full px-3 py-1 text-xs font-semibold ${
          isFeatured
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {plan.badge}
      </span>

      <div className="mt-5">
        <span className="text-4xl font-bold text-primary">{plan.price}</span>
        <span className="text-muted-foreground">{plan.period}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{plan.sub}</p>

      {"commitments" in plan && (
        <div className="mt-3 flex flex-wrap gap-2">
          {(plan as typeof pro).commitments.map((c) => (
            <span
              key={c}
              className="rounded-full border border-accent/30 px-3 py-1 text-xs font-medium text-accent"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2 text-sm">
            {f.included ? (
              <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            ) : (
              <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/40" />
            )}
            <span className={f.included ? "text-primary" : "text-muted-foreground/60"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#apply"
        className={`mt-8 block rounded-md py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
          isFeatured
            ? "bg-accent text-accent-foreground"
            : "border border-accent text-accent"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="bg-secondary py-20 md:py-28">
      <div className="container">
        <div className="text-center">
          <p className="section-label">PRICING</p>
          <h2 className="section-headline mt-3">Start free. Grow with us.</h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <PricingCard plan={free} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <PricingCard plan={pro} />
          </motion.div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Not sure which plan? Start free — you can upgrade anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
