import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type PlanFeature = {
  text: string;
  included: boolean;
};

type CommitmentOption = {
  key: "3" | "6" | "12";
  label: string;
  discount: number;
};

const commitments: CommitmentOption[] = [
  { key: "3", label: "3 months - save 12%", discount: 0.12 },
  { key: "6", label: "6 months - save 20%", discount: 0.2 },
  { key: "12", label: "12 months - save 32%", discount: 0.32 },
];

const freeFeatures: PlanFeature[] = [
  { text: "Complete online store", included: true },
  { text: "Virtual try-on (50 requests/month)", included: true },
  { text: "Paystack payments", included: true },
  { text: "Vestigh subdomain", included: true },
  { text: "Custom domain", included: false },
  { text: "Priority support", included: false },
  { text: "5% transaction fee", included: true },
];

const proFeatures: PlanFeature[] = [
  { text: "Everything in Free", included: true },
  { text: "Unlimited try-on requests", included: true },
  { text: "Custom domain", included: true },
  { text: "0% transaction fee", included: true },
  { text: "Priority WhatsApp support", included: true },
  { text: "Faster store setup", included: true },
];

const baseMonthlyPrice = 375;

const PricingSection = () => {
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

  const selectedCommitmentLabel = useMemo(() => {
    if (!selectedCommitment) {
      return null;
    }

    return commitments.find((option) => option.key === selectedCommitment)?.label ?? null;
  }, [selectedCommitment]);

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-inner">
        <div className="section-eyebrow reveal">
          <div className="section-eyebrow-line"></div>
          <span>Pricing</span>
        </div>
        <h2 className="section-title reveal reveal-delay-1">
          Start free.
          <br />
          <em>Grow with us.</em>
        </h2>
        <p className="section-sub reveal reveal-delay-2">No hidden fees. No developer tax. Just your store, live and selling.</p>

        <div className="pricing-grid">
          <div className="pricing-card reveal">
            <div className="plan-name">Free</div>
            <div className="plan-price">
              <sup>{"\u20B5"}</sup>0
            </div>
            <div className="plan-period">No credit card required</div>
            <div className="plan-divider"></div>
            <ul className="plan-features">
              {freeFeatures.map((feature) => (
                <li key={feature.text}>
                  <span className={feature.included ? "check" : "cross"}>{feature.included ? "\u2713" : "\u2715"}</span>{" "}
                  {feature.text}
                </li>
              ))}
            </ul>
            <Link to="/apply" className="plan-btn plan-btn-outline">
              Get started free
            </Link>
          </div>

          <div className="pricing-card featured reveal reveal-delay-1">
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <sup>{"\u20B5"}</sup>
              {displayedMonthlyPrice}
            </div>
            <div className="plan-period">{selectedCommitmentLabel ?? "per month"}</div>
            <div className="plan-commitments">
              {commitments.map((option) => {
                const isSelected = selectedCommitment === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    className={`commitment-btn${isSelected ? " active" : ""}`}
                    onClick={() => setSelectedCommitment((current) => (current === option.key ? null : option.key))}
                    aria-pressed={isSelected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="plan-divider"></div>
            <ul className="plan-features">
              {proFeatures.map((feature) => (
                <li key={feature.text}>
                  <span className="check">{"\u2713"}</span> {feature.text}
                </li>
              ))}
            </ul>
            <Link to="/apply" className="plan-btn plan-btn-solid">
              Get started
            </Link>
          </div>
        </div>

        <p className="pricing-footnote reveal">
          * We never take a cut from your revenue - your earnings are always 100% yours.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
