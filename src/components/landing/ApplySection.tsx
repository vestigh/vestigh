const ApplySection = () => {
  return (
    <section id="apply" className="bg-[#1a2340] px-6 py-20 text-center">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs uppercase tracking-[2px] text-[#f0a500]">GET STARTED</p>
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-[36px]">
          Ready to take your fashion store online?
        </h2>
        <p className="mx-auto mb-8 max-w-[480px] text-base text-[#9ca3af]">
          Apply today and your store could be live within 24 hours.
        </p>
        <a
          href="/apply"
          className="inline-block rounded-lg bg-[#f0a500] px-8 py-3.5 text-base font-semibold text-[#1a2340] no-underline"
        >
          Apply for your store
        </a>
        <p className="mt-4 text-[13px] text-[#6b7280]">Free to start. No credit card required.</p>
      </div>
    </section>
  );
};

export default ApplySection;
