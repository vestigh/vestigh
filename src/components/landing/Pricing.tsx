import { useMemo, useState } from "react";

type PlanFeature = {
  text: string;
  included: boolean;
};

type CommitmentOption = {
  key: "3" | "6" | "12";
  label: string;
  discount: number;
};

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
  { key: "3", label: "3 months — save 12%", discount: 0.12 },
  { key: "6", label: "6 months — save 20%", discount: 0.2 },
  { key: "12", label: "12 months — save 32%", discount: 0.32 },
];

const formatCedi = (amount: number) => `₵${amount.toLocaleString()}`;

const Pricing = () => {
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

  return (
    <section id="pricing" className="bg-secondary py-20 md:py-28">
      <div className="container">
        <div className="text-center">
          <p className="section-label">PRICING</p>
          <h2 className="section-headline mt-3">Start free. Grow with us.</h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-[12px] border border-[#e5e7eb] bg-white p-6">
            <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600">
              FREE
            </span>

            <div className="mt-5">
              <span className="text-5xl font-bold text-[#14213d]">₵0</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">5% per transaction</p>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {freeFeatures.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2 text-sm">
                  <span
                    aria-hidden="true"
                    className={`mt-[1px] shrink-0 font-semibold ${
                      feature.included ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {feature.included ? "✓" : "✗"}
                  </span>
                  <span className={feature.included ? "text-[#14213d]" : "text-gray-500"}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#apply"
              className="mt-8 block w-full rounded-[10px] border border-[#f0a500] px-4 py-3 text-center text-sm font-semibold text-[#f0a500] transition-colors hover:bg-[#fff7e3]"
            >
              Get started free
            </a>
          </div>

          <div className="flex flex-col rounded-[12px] border-2 border-[#f0a500] bg-[#fffbf0] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:-mt-1">
            <span className="w-fit rounded-full bg-[#f0a500] px-3 py-1 text-xs font-semibold tracking-wide text-[#14213d]">
              PRO
            </span>

            <div className="mt-5">
              <span className="text-5xl font-bold text-[#14213d]">
                {formatCedi(displayedMonthlyPrice)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">/month</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {commitments.map((option) => {
                const isSelected = option.key === selectedCommitment;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() =>
                      setSelectedCommitment((current) =>
                        current === option.key ? null : option.key,
                      )
                    }
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      isSelected
                        ? "border-[#f0a500] bg-[#fff2cc] text-[#14213d]"
                        : "border-[#f0a500] bg-transparent text-[#a86f00] hover:bg-[#fff2cc]"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {proFeatures.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2 text-sm">
                  <span aria-hidden="true" className="mt-[1px] shrink-0 font-semibold text-green-600">
                    ✓
                  </span>
                  <span className="text-[#14213d]">{feature.text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#apply"
              className="mt-8 block w-full rounded-[10px] bg-[#f0a500] px-4 py-3 text-center text-sm font-semibold text-[#14213d] transition-colors hover:bg-[#df9800]"
            >
              Get started
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Not sure which plan? Start free — you can upgrade anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
