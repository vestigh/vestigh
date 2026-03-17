const steps = [
  {
    number: "1",
    title: "Apply",
    description:
      "Fill out a short form with your store details. We review and approve within hours.",
  },
  {
    number: "2",
    title: "We build your store",
    description:
      "We set up your branded online store with all your products, categories, and payment integration.",
  },
  {
    number: "3",
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

        <div className="relative mt-16">
          <div className="absolute left-[16.666%] right-[16.666%] top-5 hidden border-t-2 border-dashed border-[#f0a500] lg:block" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0a500] text-sm font-bold text-[#1a2340]">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#14213d]">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
