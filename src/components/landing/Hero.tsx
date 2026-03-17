import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import vestighDemoGif from "@/asserts/vestigh_demo.gif";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Your fashion store, live in 24 hours
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Vestigh gives Ghanaian fashion retailers a complete online store
              with virtual try-on technology built in. Shoppers see how outfits
              look on them before buying.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/apply"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Start for free
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              >
                <Play size={16} />
                See how it works
              </a>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Already powering fashion stores in Ghana
            </p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-lg border bg-secondary p-4 shadow-card">
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-vestigh-bg-alt">
                <img
                  src={vestighDemoGif}
                  alt="Vestigh demo preview showing virtual try-on in a fashion store"
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
