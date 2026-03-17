import { Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo */}
          <div>
            <a href="#" className="inline-flex items-center" aria-label="Vestigh home">
              <img
                src="/vestigh_logo.svg"
                alt="Vestigh logo"
                className="h-12 w-auto md:h-14"
              />
            </a>
            <p className="mt-3 text-sm text-primary-foreground/60">
              Virtual try-on fashion stores for Ghana.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
              Product
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li><a href="#how-it-works" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">How it works</a></li>
              <li><a href="#features" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
              Company
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">About</a></li>
              <li><a href="#apply" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Contact</a></li>
              <li><a href="https://wa.me/233000000000" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">WhatsApp</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
              Legal
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-primary-foreground/50">
            © 2025 Vestigh. Built in Ghana.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-primary-foreground/50 transition-colors hover:text-accent" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-primary-foreground/50 transition-colors hover:text-accent" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-primary-foreground/50 transition-colors hover:text-accent" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
