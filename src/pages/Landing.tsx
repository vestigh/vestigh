import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { showcaseItems } from "@/data/showcase";

type PlanFeature = {
  text: string;
  included: boolean;
};

type CommitmentOption = {
  key: "3" | "6" | "12";
  label: string;
  discount: number;
};

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Showcase", href: "#showcase" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#apply" },
];

const steps = [
  {
    icon: "edit_note",
    title: "Apply",
    description:
      "Submit your brand identity and inventory. Our design system adapts to your unique aesthetic instantly.",
  },
  {
    icon: "architecture",
    title: "We build your store",
    description:
      "Our architects configure your custom-branded storefront using premium editorial-style components.",
  },
  {
    icon: "rocket_launch",
    title: "Go live",
    description:
      "Receive your dashboard credentials and start processing orders within 24 hours of approval.",
  },
];

const features = [
  {
    icon: "view_in_ar",
    title: "Virtual try-on",
    description: "Integrated AR features that let customers visualize garments before purchasing.",
  },
  {
    icon: "dashboard_customize",
    title: "Admin panel",
    description: "A powerful yet minimalist command center to manage your entire operation.",
  },
  {
    icon: "payments",
    title: "Payments",
    description: "Secure global payment processing supporting all major currencies and crypto.",
  },
  {
    icon: "inventory_2",
    title: "Order management",
    description: "Real-time inventory tracking and automated fulfillment status updates.",
  },
  {
    icon: "brand_awareness",
    title: "Custom branding",
    description: "Every pixel reflects your brand's unique personality and high-end aesthetic.",
  },
  {
    icon: "notifications_active",
    title: "Email notifications",
    description: "Beautifully designed transactional emails that build trust with every send.",
  },
];

const freeFeatures: PlanFeature[] = [
  { text: "Complete online store", included: true },
  { text: "Virtual try-on (50 requests/month)", included: true },
  { text: "Paystack payments", included: true },
  { text: "Vestigh subdomain", included: true },
  { text: "Custom domain", included: false },
  { text: "Priority support", included: false },
  { text: "0% transaction fee", included: false },
];

const proFeatures: PlanFeature[] = [
  { text: "Everything in Free", included: true },
  { text: "Unlimited try-on requests", included: true },
  { text: "Custom domain", included: true },
  { text: "0% transaction fee", included: true },
  { text: "Priority WhatsApp support", included: true },
  { text: "Faster store setup", included: true },
];

const commitments: CommitmentOption[] = [
  { key: "3", label: "3 months - save 12%", discount: 0.12 },
  { key: "6", label: "6 months - save 20%", discount: 0.2 },
  { key: "12", label: "12 months - save 32%", discount: 0.32 },
];

const footerColumns = [
  {
    heading: "Company",
    items: ["Privacy Policy", "Terms of Service", "About Us"],
  },
  {
    heading: "Contact",
    items: ["Support", "Sales", "Press"],
  },
  {
    heading: "Follow us",
    items: ["Instagram", "LinkedIn", "Twitter"],
  },
];

const formatCedi = (amount: number) => `\u20B5${amount.toLocaleString()}`;
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const sectionViewport = { once: true, amount: 0.2 };

const Landing = () => {
  const shouldReduceMotion = useReducedMotion();
  const baseMonthlyPrice = 375;
  const [selectedCommitment, setSelectedCommitment] = useState<CommitmentOption["key"] | null>(null);

  const displayedMonthlyPrice = useMemo(() => {
    if (!selectedCommitment) {
      return baseMonthlyPrice;
    }

    const selected = commitments.find((option) => option.key === selectedCommitment);
    if (!selected) {
      return baseMonthlyPrice;
    }

    return Math.round(baseMonthlyPrice * (1 - selected.discount));
  }, [selectedCommitment]);

  const revealUp = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: easeOut },
        },
      };

  const staggerChildren = shouldReduceMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12, delayChildren: 0.08 },
        },
      };

  return (
    <div className="min-h-screen bg-vestigh-surface font-body text-vestigh-navy">
      <motion.nav
        className="vestigh-glass-nav fixed inset-x-0 top-0 z-50"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#discover" className="flex items-center" aria-label="Vestigh home">
              <img
                src="/vestigh_logo.svg"
                alt="Vestigh logo"
                className="h-11 w-auto md:h-12"
              />
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-vestigh-yellow-dim"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-vestigh-yellow transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>

          <Link
            to="/apply"
            className="rounded-md bg-vestigh-yellow px-5 py-2.5 text-sm font-bold text-vestigh-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(22,28,38,0.14)] active:scale-95"
          >
            Sign up
          </Link>
        </div>
      </motion.nav>

      <main>
        <section
          id="discover"
          className="vestigh-dark-panel vestigh-hero-diagonal relative overflow-hidden pb-40 pt-28 scroll-mt-24 md:pb-48 md:pt-32"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 md:px-8">
            <motion.div
              className="relative z-10"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div
                variants={revealUp}
                className="vestigh-display-outline mb-4 text-[4.25rem] font-black leading-none tracking-[-0.06em] opacity-20 sm:text-8xl md:text-[8.5rem]"
              >
                24 HOURS
              </motion.div>
              <motion.h1
                variants={revealUp}
                className="mb-6 max-w-xl text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-7xl"
              >
                Your fashion store, <span className="text-vestigh-yellow">live in 24 hours</span>
              </motion.h1>
              <motion.p
                variants={revealUp}
                className="mb-10 max-w-lg text-lg leading-relaxed text-[#dde2f1] md:text-xl"
              >
                Vestigh combines the world&apos;s best fashion templates with a high-performance backend. We build,
                you sell. Professional retail tech without the developer price tag.
              </motion.p>
              <motion.div variants={revealUp} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <Link
                  to="/apply"
                  className="w-full rounded-md bg-vestigh-yellow px-8 py-4 text-center text-lg font-bold text-vestigh-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-vestigh-yellow-pale hover:shadow-[0_20px_40px_rgba(22,28,38,0.16)] sm:w-auto"
                >
                  Start for free
                </Link>
                <motion.a
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2 text-base font-bold text-white transition-colors hover:text-vestigh-yellow"
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                >
                  See how it works
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>

            <div className="relative flex justify-center md:justify-end">
              <motion.div
                className="relative h-[560px] w-[280px] overflow-hidden rounded-[3rem] border-[8px] border-slate-700 bg-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:h-[600px] sm:w-[300px]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 36, rotate: 4 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, rotate: 0 }
                    : {
                        opacity: 1,
                        y: [0, -12, 0],
                        rotate: [0, -1.2, 0, 1.2, 0],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.2 }
                    : {
                        opacity: { duration: 0.8, ease: easeOut, delay: 0.2 },
                        y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                        rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                      }
                }
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6ImUthbYnzDu17YeDunF2OMk18_EyFwhbn9ZbvUe0npfmzJ8k3rT7Lufz6KBp5pnHzUK3gonxtDAhYiXv6EiK57i52OXJvZe6skTWvepvAH8VU03icC935fofToxw18XFJmQXgkDaqyiXr54KeFWax3sbB7zxVD1RYlNyP5zzVeWCBhBd15YlcGOiQY2-5PZbCLxUBTO5lJpTV7faaNIjkuGS2GNERpPz7m8nzPGnu7emxkSFqII2YPAwLY8eEcz77TfMjkqMum2"
                  alt="Modern mobile app interface showing a high-end streetwear collection"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/30" />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vestigh-yellow/10 blur-[120px]"
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.3, scale: 1 }
                    : {
                        opacity: [0.2, 0.4, 0.2],
                        scale: [0.96, 1.04, 0.96],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.2 }
                    : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
          </div>
        </section>

        <section id="showcase" className="scroll-mt-24 bg-vestigh-surface-low py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <motion.div
              className="mb-16 text-center md:mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={revealUp}
            >
              <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-vestigh-slate">
                Showcase
              </p>
              <h2 className="mx-auto max-w-3xl font-headline text-4xl font-bold tracking-[-0.03em] text-vestigh-navy md:text-5xl">
                See how a Vestigh storefront can look in the wild
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-vestigh-slate md:text-lg">
                Four example storefront directions, each built to feel branded, editorial, and ready for modern fashion commerce.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerChildren}
            >
              {showcaseItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="group overflow-hidden rounded-[1.5rem] bg-vestigh-surface-card shadow-[0_20px_40px_rgba(22,28,38,0.05)]"
                >
                  <div className="relative overflow-hidden bg-[#e8edfb]">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-[#161c26]/60 via-[#161c26]/20 to-transparent px-5 py-5">
                      <span className="rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-vestigh-navy">
                        Concept {index + 1}
                      </span>
                      <span className="rounded-full bg-vestigh-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-vestigh-ink">
                        Preview
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5 p-6 md:p-7">
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.03em] text-vestigh-navy">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-vestigh-slate md:text-base">
                        {item.description}
                      </p>
                    </div>

                    {item.isAvailable && item.href.trim().length > 0 ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(127,119,95,0.2)] bg-[#eef3ff] px-4 py-2.5 text-sm font-semibold text-vestigh-slate transition-colors hover:bg-[#dbe7ff]"
                      >
                        Visit site
                        <span className="material-symbols-outlined text-base">north_east</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        title="Preview coming soon"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[rgba(127,119,95,0.2)] bg-[#eef3ff] px-4 py-2.5 text-sm font-semibold text-vestigh-slate opacity-70"
                      >
                        Visit site
                        <span className="material-symbols-outlined text-base">north_east</span>
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-vestigh-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <motion.div
              className="mb-16 md:mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={revealUp}
            >
              <p className="mb-4 text-center font-label text-xs font-bold uppercase tracking-[0.2em] text-vestigh-slate md:text-left">
                How it works
              </p>
              <h2 className="text-center font-headline text-4xl font-bold tracking-[-0.03em] text-vestigh-navy md:text-left md:text-5xl">
                From signup to live store in one day
              </h2>
            </motion.div>

            <motion.div
              className="grid gap-12 md:grid-cols-3 md:gap-16"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerChildren}
            >
              {steps.map((step) => (
                <motion.article
                  key={step.title}
                  variants={revealUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="group"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-vestigh-yellow shadow-[0_20px_40px_rgba(22,28,38,0.06)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-3deg]">
                    <span className="material-symbols-outlined text-3xl text-vestigh-navy">{step.icon}</span>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-vestigh-navy">{step.title}</h3>
                  <p className="text-base leading-relaxed text-vestigh-slate">{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-vestigh-surface-low py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <motion.div
              className="mb-20 text-center md:mb-24"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={revealUp}
            >
              <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-vestigh-slate">
                Features
              </p>
              <h2 className="font-headline text-4xl font-bold tracking-[-0.03em] text-vestigh-navy md:text-5xl">
                Everything your store needs, nothing it doesn&apos;t
              </h2>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerChildren}
            >
              {features.map((feature) => (
                <motion.article
                  key={feature.title}
                  variants={revealUp}
                  whileHover={shouldReduceMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="rounded-xl border border-transparent bg-vestigh-surface-card p-10 shadow-[0_20px_40px_rgba(22,28,38,0.03)] transition-colors duration-300 hover:border-vestigh-yellow/30 hover:shadow-[0_20px_40px_rgba(22,28,38,0.08)]"
                >
                  <span className="material-symbols-outlined mb-6 block text-4xl text-[#705d00]">{feature.icon}</span>
                  <h3 className="mb-3 text-xl font-bold text-vestigh-navy">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-vestigh-slate">{feature.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-vestigh-surface py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <motion.div
              className="mb-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={revealUp}
            >
              <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-vestigh-slate">Pricing</p>
              <h2 className="font-headline text-4xl font-extrabold tracking-[-0.03em] text-vestigh-navy md:text-5xl">
                Start free. Grow with us.
              </h2>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={staggerChildren}
            >
              <motion.article
                variants={revealUp}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="flex h-full flex-col rounded-[1.25rem] border border-[rgba(127,119,95,0.15)] bg-vestigh-surface-card p-10 shadow-[0_20px_40px_rgba(22,28,38,0.06)]"
              >
                <span className="mb-2 text-xl font-bold text-vestigh-navy">Free</span>
                <div className="mb-2 text-5xl font-black text-vestigh-navy">{formatCedi(0)}</div>
                <p className="mb-8 text-sm text-vestigh-slate">5% per transaction</p>

                <ul className="mb-10 space-y-4">
                  {freeFeatures.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3 text-sm">
                      <span
                        aria-hidden="true"
                        className={
                          feature.included
                            ? "material-symbols-outlined mt-0.5 text-lg text-[#705d00]"
                            : "material-symbols-outlined mt-0.5 text-lg text-slate-400"
                        }
                      >
                        {feature.included ? "check" : "close"}
                      </span>
                      <span className={feature.included ? "text-vestigh-navy" : "text-vestigh-slate"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/apply"
                  className="mt-auto rounded-lg border-2 border-vestigh-yellow px-6 py-4 text-center text-base font-bold text-[#705d00] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff7e3]"
                >
                  Get started free
                </Link>
              </motion.article>

              <motion.article
                variants={revealUp}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-vestigh-yellow p-10 shadow-[0_24px_48px_rgba(22,28,38,0.12)]"
              >
                <motion.div
                  className="absolute inset-x-8 top-0 h-24 rounded-full bg-white/20 blur-3xl"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.45 }
                      : { opacity: [0.3, 0.55, 0.3], y: [0, 6, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.2 }
                      : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <span className="relative mb-2 text-xl font-bold text-vestigh-ink">Pro</span>
                <motion.div
                  key={displayedMonthlyPrice}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                  className="relative text-5xl font-black text-vestigh-ink"
                >
                  {formatCedi(displayedMonthlyPrice)}
                </motion.div>
                <p className="relative mb-4 mt-2 text-sm text-vestigh-ink-soft">/month</p>

                <div className="relative mb-8 flex flex-wrap gap-2">
                  {commitments.map((option) => {
                    const isSelected = option.key === selectedCommitment;

                    return (
                      <motion.button
                        key={option.key}
                        type="button"
                        onClick={() =>
                          setSelectedCommitment((current) => (current === option.key ? null : option.key))
                        }
                        className={
                          isSelected
                            ? "rounded-full border border-vestigh-ink bg-[#fff2cc] px-3 py-1 text-xs font-bold text-vestigh-ink transition-colors"
                            : "rounded-full border border-vestigh-ink/40 bg-transparent px-3 py-1 text-xs font-medium text-vestigh-ink-soft transition-colors hover:bg-[#fff2cc]"
                        }
                        whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        aria-pressed={isSelected}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>

                <ul className="relative mb-10 space-y-4">
                  {proFeatures.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3 text-sm font-medium text-vestigh-ink-soft">
                      <span aria-hidden="true" className="material-symbols-outlined mt-0.5 text-lg text-vestigh-ink">
                        check
                      </span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/apply"
                  className="relative mt-auto rounded-lg border-2 border-vestigh-ink px-6 py-4 text-center text-base font-bold text-vestigh-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-vestigh-ink hover:text-vestigh-yellow"
                >
                  Get started
                </Link>
              </motion.article>
            </motion.div>

            <motion.p
              className="mt-8 text-center text-sm text-vestigh-slate"
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              variants={revealUp}
            >
              Not sure which plan? Start free - you can upgrade anytime.
            </motion.p>
          </div>
        </section>

        <section
          id="apply"
          className="vestigh-dark-panel vestigh-cta-diagonal relative -mt-20 overflow-hidden pb-24 pt-40 scroll-mt-24 md:pb-32 md:pt-48"
        >
          <motion.div
            className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerChildren}
          >
            <motion.h2
              variants={revealUp}
              className="mb-6 font-headline text-4xl font-extrabold tracking-[-0.03em] text-vestigh-yellow md:text-6xl"
            >
              Ready to take your fashion store online?
            </motion.h2>
            <motion.p variants={revealUp} className="mx-auto mb-12 max-w-2xl text-lg text-white/90 md:text-xl">
              Apply today and your store could be live within 24 hours.
            </motion.p>
            <motion.div variants={revealUp}>
              <Link
                to="/apply"
                className="inline-flex rounded-lg bg-vestigh-yellow px-10 py-4 text-lg font-bold text-vestigh-ink shadow-[0_20px_40px_rgba(22,28,38,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_44px_rgba(22,28,38,0.22)] active:scale-95"
              >
                Apply for your store
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vestigh-yellow/5 blur-[150px]"
            animate={
              shouldReduceMotion
                ? { opacity: 0.18, scale: 1 }
                : { opacity: [0.12, 0.22, 0.12], scale: [0.98, 1.04, 0.98] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </section>
      </main>

      <footer className="bg-[#0f141d]">
        <motion.div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 py-16 md:flex-row md:px-12 md:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerChildren}
        >
          <motion.div variants={revealUp}>
            <div className="mb-6">
              <div className="inline-flex rounded-xl bg-white/95 p-2">
                <img
                  src="/vestigh_logo.svg"
                  alt="Vestigh logo"
                  className="h-10 w-auto md:h-11"
                />
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              The Bold Architect approach to fashion commerce. Powering the next generation of digital boutiques.
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-16">
            {footerColumns.map((column) => (
              <motion.div key={column.heading} variants={revealUp}>
                <h3 className="mb-6 font-label text-xs font-bold uppercase tracking-[0.2em] text-vestigh-yellow">
                  {column.heading}
                </h3>
                <ul className="space-y-4">
                  {column.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="border-t border-white/8 px-6 py-8 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {"\u00A9"} 2024 Vestigh. The Bold Architect approach to fashion commerce.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
