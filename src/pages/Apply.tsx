import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Apply = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vestigh
          </Link>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <p className="section-label">GET STARTED</p>
          <h1 className="section-headline mt-3">Apply for your store today</h1>
          <p className="mt-4 text-muted-foreground">
            Fill out the form below and we'll be in touch within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-lg border bg-card shadow-card"
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdBCxnus8S44f2FemF_TLhGyX_iS2srO2D9jTyFBuXzwP3OUw/viewform?embedded=true"
            width="100%"
            height="800"
            className="border-0"
            title="Vestigh Application Form"
          >
            Loading…
          </iframe>
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to talk first? WhatsApp us at{" "}
          <a
            href="https://wa.me/233000000000"
            className="text-accent font-medium hover:underline"
          >
            +233 00 000 0000
          </a>
        </p>
      </main>
    </div>
  );
};

export default Apply;
