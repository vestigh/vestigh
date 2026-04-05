import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PricingSection from "@/components/landing/PricingSection";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import "./Landing.css";

const Landing = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reveals = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((reveal) => io.observe(reveal));

    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const updateNavPadding = () => {
      const isMobile = window.innerWidth < 900;
      nav.style.padding =
        window.scrollY > 60 ? (isMobile ? "1rem 1.5rem" : "1rem 4rem") : (isMobile ? "1.2rem 1.5rem" : "1.5rem 4rem");
    };

    updateNavPadding();
    window.addEventListener("scroll", updateNavPadding, { passive: true });
    window.addEventListener("resize", updateNavPadding);

    return () => {
      window.removeEventListener("scroll", updateNavPadding);
      window.removeEventListener("resize", updateNavPadding);
    };
  }, []);

  return (
    <div className="landing-page" ref={rootRef}>
      <nav ref={navRef}>
        <a href="#hero" className="nav-logo">
          VEST<span>IGH</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#showcase">Showcase</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#apply">Contact</a>
          </li>
        </ul>
        <Link to="/apply" className="nav-cta">
          Sign Up
        </Link>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"></div>
            <span>Virtual Try-On for Ghana</span>
          </div>
          <h1 className="hero-title">
            Your fashion
            <br />
            store, <em>live in</em>
            <br />
            <em>24 hours</em>.
          </h1>
          <p className="hero-sub">
            Vestigh combines the world&apos;s best fashion templates with a high-performance backend. We build, you sell.
            Professional retail tech without the developer price tag.
          </p>
          <div className="hero-actions">
            <Link to="/apply" className="btn-primary">
              Start for free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a href="#how" className="btn-secondary">
              See how it works <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">24h</div>
              <div className="stat-label">Live Store Launch</div>
            </div>
            <div>
              <div className="stat-num">&#8373;0</div>
              <div className="stat-label">To Get Started</div>
            </div>
            <div>
              <div className="stat-num">3&times;</div>
              <div className="stat-label">More Conversions</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            <div className="float-card float-card-1">
              <div className="fc-label">Fit Score</div>
              <div className="fc-value">94%</div>
              <div className="fc-sub">Perfect match for you</div>
              <div className="fc-bar">
                <div className="fc-bar-fill" style={{ width: "94%" }}></div>
              </div>
            </div>
            <div className="float-card float-card-2">
              <div className="fc-label">Store live in</div>
              <div className="fc-value">24 hrs</div>
              <div className="fc-sub">No developer needed</div>
            </div>
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-header">
                    <div className="phone-brand">Vestigh</div>
                    <div className="phone-icons">
                      <div className="phone-icon-dot"></div>
                      <div className="phone-icon-dot"></div>
                      <div className="phone-icon-dot"></div>
                    </div>
                  </div>
                  <div className="phone-content">
                    <div className="phone-model-area">
                      <div className="try-on-dots">
                        <div className="dot dot-r"></div>
                        <div className="dot dot-y"></div>
                        <div className="dot dot-g"></div>
                      </div>
                      <div className="try-on-badge">AI Try-On</div>
                      <svg
                        className="silhouette"
                        viewBox="0 0 110 220"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <ellipse cx="55" cy="22" rx="16" ry="18" fill="#3a3020" />
                        <rect x="49" y="36" width="12" height="12" rx="4" fill="#3a3020" />
                        <path
                          d="M20 55 Q18 48 34 44 L42 48 L55 44 L68 48 L76 44 Q92 48 90 55 L88 100 L22 100 Z"
                          fill="#c8a96e"
                          opacity="0.85"
                        />
                        <line x1="30" y1="60" x2="80" y2="60" stroke="#8a6f3e" strokeWidth="1" opacity="0.5" />
                        <line x1="28" y1="68" x2="82" y2="68" stroke="#8a6f3e" strokeWidth="1" opacity="0.5" />
                        <line x1="26" y1="76" x2="84" y2="76" stroke="#8a6f3e" strokeWidth="1" opacity="0.5" />
                        <line x1="25" y1="84" x2="85" y2="84" stroke="#8a6f3e" strokeWidth="1" opacity="0.5" />
                        <line x1="24" y1="92" x2="86" y2="92" stroke="#8a6f3e" strokeWidth="1" opacity="0.5" />
                        <path d="M20 55 Q8 62 10 80 L22 78 L22 100 Z" fill="#c8a96e" opacity="0.7" />
                        <path d="M90 55 Q102 62 100 80 L88 78 L88 100 Z" fill="#c8a96e" opacity="0.7" />
                        <path d="M22 100 L88 100 L92 185 L72 185 L55 145 L38 185 L18 185 Z" fill="#2a2018" opacity="0.9" />
                        <line x1="22" y1="115" x2="88" y2="115" stroke="#c8a96e" strokeWidth="0.5" opacity="0.3" />
                        <line x1="20" y1="130" x2="90" y2="130" stroke="#c8a96e" strokeWidth="0.5" opacity="0.3" />
                        <ellipse cx="34" cy="188" rx="14" ry="5" fill="#252015" opacity="0.8" />
                        <ellipse cx="76" cy="188" rx="14" ry="5" fill="#252015" opacity="0.8" />
                        <path d="M34 100 L76 100" stroke="#c8a96e" strokeWidth="1.5" opacity="0.6" />
                        <circle cx="92" cy="60" r="4" fill="#4caf72" />
                        <circle cx="92" cy="60" r="7" fill="#4caf72" opacity="0.2" />
                      </svg>
                    </div>
                    <div className="phone-garment-row">
                      <div className="garment-thumb active">
                        <div className="garment-thumb-inner" style={{ background: "linear-gradient(135deg,#2a1e08,#c8a96e22)" }}>
                          &#128088;
                        </div>
                      </div>
                      <div className="garment-thumb">
                        <div className="garment-thumb-inner" style={{ background: "#1a1818" }}>
                          &#128087;
                        </div>
                      </div>
                      <div className="garment-thumb">
                        <div className="garment-thumb-inner" style={{ background: "#1a1818" }}>
                          &#129523;
                        </div>
                      </div>
                      <div className="garment-thumb">
                        <div className="garment-thumb-inner" style={{ background: "#1a1818" }}>
                          &#128084;
                        </div>
                      </div>
                    </div>
                    <div className="phone-action-row">
                      <div className="phone-btn phone-btn-primary">Buy Now</div>
                      <div className="phone-btn phone-btn-secondary">Share</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logo-strip reveal">
        <span className="strip-label">Trusted by</span>
        <div className="strip-divider"></div>
        <div className="strip-brands">
          <span className="strip-brand">AkosuaPrints</span>
          <span className="strip-brand">E&amp;S Closet</span>
          <span className="strip-brand">Kente House</span>
          <span className="strip-brand">Gold Coast Wear</span>
          <span className="strip-brand">Adinkra Studio</span>
          <span className="strip-brand">Tema Style Co.</span>
        </div>
      </div>

      <ShowcaseSection />

      <section className="section" id="how">
        <div className="section-inner">
          <div className="section-eyebrow reveal">
            <div className="section-eyebrow-line"></div>
            <span>How It Works</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            From signup to <em>live store</em>
            <br />
            in one day.
          </h2>

          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-icon">&#128203;</div>
              <div className="step-title">Apply</div>
              <p className="step-desc">
                Submit your brand identity and inventory. Our design system adapts to your unique aesthetic and
                creativity - we take what makes you, <em>you</em>, and build around it.
              </p>
            </div>
            <div className="step reveal reveal-delay-1">
              <div className="step-num">02</div>
              <div className="step-icon">&#128736;</div>
              <div className="step-title">We Build Your Store</div>
              <p className="step-desc">
                Our retail architects configure your custom-branded storefront and set up your payment solution.
                Designed to convert, built to last, crafted for Ghanaian commerce.
              </p>
            </div>
            <div className="step reveal reveal-delay-2">
              <div className="step-num">03</div>
              <div className="step-icon">&#128640;</div>
              <div className="step-title">Go Live</div>
              <p className="step-desc">
                Receive your dashboard credentials and start processing orders within 24 hours of approval. Your store
                is fully live, ready to sell from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="features-inner">
          <div className="section-eyebrow reveal">
            <div className="section-eyebrow-line"></div>
            <span>Features</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Everything your store needs,
            <br />
            <em>nothing it doesn&apos;t.</em>
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            A complete, opinionated commerce stack - purpose-built for African fashion retail with zero bloat.
          </p>

          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">&#128087;</div>
              <div className="feature-title">Virtual Try-On</div>
              <p className="feature-desc">
                AI-powered virtual fitting lets your customers preview garments before purchasing - reducing hesitation,
                building confidence, and driving more sales.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">&#9881;</div>
              <div className="feature-title">Admin Panel</div>
              <p className="feature-desc">
                A powerful dashboard to control all content and inventory. Manage your entire store from one clean,
                intuitive interface - no technical knowledge required.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">&#128179;</div>
              <div className="feature-title">Payments</div>
              <p className="feature-desc">
                Seamless payment processing supporting mobile money, card, and international transactions. Accept Momo,
                Visa, and more - out of the box, from day one.
              </p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">&#128230;</div>
              <div className="feature-title">Order Management</div>
              <p className="feature-desc">
                Integrated order tracking and inventory so you always know exactly where every order stands. Automate
                fulfilment updates and stay on top of every sale.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">&#127912;</div>
              <div className="feature-title">Custom Branding</div>
              <p className="feature-desc">
                Every store is uniquely yours. Upload your logo, choose your colours, and tailor every touchpoint to
                match your brand&apos;s personality and visual identity.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">&#128276;</div>
              <div className="feature-title">Email Notifications</div>
              <p className="feature-desc">
                Professionally designed transactional emails that keep your customers informed at every step -
                confirmation, dispatch, delivery, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <div className="cta-section" id="apply">
        <div className="cta-inner reveal">
          <div className="cta-eyebrow">Your store is waiting</div>
          <h2 className="cta-title">
            Your fashion store,
            <br />
            <em>live in 24 hours.</em>
          </h2>
          <p className="cta-sub">
            Join hundreds of Ghanaian fashion entrepreneurs on Vestigh. Professional retail technology, built and ready -
            all you have to do is sell.
          </p>
          <div className="cta-actions">
            <Link to="/apply" className="btn-primary">
              Start for free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a href="#how" className="btn-secondary">
              See how it works <span className="btn-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top reveal">
          <div>
            <div className="footer-brand">
              VEST<span>IGH</span>
            </div>
            <p className="footer-desc">
              Virtual try-on fashion stores for Ghana. Helping fashion entrepreneurs launch professional online stores in
              24 hours - no developers, no complexity.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li>
                <a href="#showcase">Showcase</a>
              </li>
              <li>
                <a href="#how">How It Works</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#apply">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom reveal reveal-delay-1">
          <div className="footer-copy">{"\u00A9"} 2025 Vestigh Ltd. All rights reserved. Made in Ghana</div>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
