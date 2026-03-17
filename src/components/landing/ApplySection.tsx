import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ApplySection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <p className="section-label">GET STARTED</p>
          <h2 className="section-headline mt-3">Apply for your store today</h2>
          <p className="mt-4 text-muted-foreground">
            Fill out a short form and we'll be in touch within 24 hours.
          </p>

          <a
            href="/apply"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Apply now
            <ArrowRight size={16} />
          </a>

          <p className="mt-6 text-sm text-muted-foreground">
            Prefer to talk first? WhatsApp us at{" "}
            <a
              href="https://wa.me/233000000000"
              className="text-accent font-medium hover:underline"
            >
              +233 00 000 0000
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplySection;
