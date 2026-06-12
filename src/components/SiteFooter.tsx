import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold">Bank Holiday Finder</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Quickly find official bank holidays around the world.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li><Link to="/holidays" className="hover:text-foreground">Find Holidays</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Get in touch</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bank Holiday Finder. Data from Nager.Date.
      </div>
    </footer>
  );
}