import { showcaseItems } from "@/data/showcase";

const ShowcaseSection = () => {
  return (
    <section className="showcase-section" id="showcase">
      <div className="showcase-inner">
        <div className="showcase-header">
          <div className="section-eyebrow reveal">
            <div className="section-eyebrow-line"></div>
            <span>Showcase</span>
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            See how a Vestigh storefront
            <br />
            can look <em>in the wild</em>.
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            Four example storefronts showing our design approach - culturally rooted, editorial, and ready for modern
            Ghanaian commerce.
          </p>
        </div>

        <div className="showcase-grid">
          {showcaseItems.map((item, index) => {
            const badge = item.badge ?? "Fashion Boutique";
            const tag = item.tag ?? (item.isAvailable ? "Live Store" : "Coming Soon");

            return (
              <article
                key={item.title}
                className={`showcase-card reveal${index % 2 === 1 ? " reveal-delay-1" : ""}`}
              >
                <div className="showcase-card-img">
                  <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
                  <span className="showcase-card-tag">{tag}</span>
                </div>
                <div className="showcase-card-info">
                  <span className="showcase-badge">{badge}</span>
                  <div className="showcase-store-name">{item.title}</div>
                  <p className="showcase-desc">{item.description}</p>
                  {item.isAvailable ? (
                    <a href={item.href} className="showcase-link" target="_blank" rel="noreferrer">
                      Visit store {"\u2192"}
                    </a>
                  ) : (
                    <span className="showcase-link showcase-link-disabled">Coming soon</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
