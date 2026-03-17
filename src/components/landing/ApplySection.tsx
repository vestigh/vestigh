import { motion } from "framer-motion";

const ApplySection = () => {
  return (
    <section id="apply" className="py-20 md:py-28">
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
            Fill out the form below and we'll be in touch within 24 hours.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-lg border bg-card shadow-card">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdS5GhGrFrTGSNWg2j7/viewform?embedded=true"
            width="100%"
            height="800"
            className="border-0"
            title="Vestigh Application Form"
          >
            Loading…
          </iframe>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to talk first? WhatsApp us at{" "}
          <a href="https://wa.me/233000000000" className="text-accent font-medium hover:underline">
            +233 00 000 0000
          </a>
        </p>
      </div>
    </section>
  );
};

export default ApplySection;
