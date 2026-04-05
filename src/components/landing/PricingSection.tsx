import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
              <li>
                <span className="check">{"\u2713"}</span> Complete online store
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Up to 50 GHS shipping events
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Flexible payments
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Vestigh subdomain
              </li>
              <li>
                <span className="cross">-</span> Custom domain
              </li>
              <li>
                <span className="cross">-</span> Priority support
              </li>
              <li>
                <span className="cross">-</span> 0% transaction fee
              </li>
              <li>
                <span className="cross">-</span> Faster store setup
              </li>
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
              <li>
                <span className="check">{"\u2713"}</span> Everything in Free
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Unlimited requests
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Flexible domains
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Custom domain
              </li>
              <li>
                <span className="check">{"\u2713"}</span> 0% transaction fee
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Priority WhatsApp support
              </li>
              <li>
                <span className="check">{"\u2713"}</span> Faster store setup
              </li>
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
