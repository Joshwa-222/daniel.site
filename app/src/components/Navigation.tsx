import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Camera } from "lucide-react";
import { navigationConfig } from "@/config";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <Camera className="w-6 h-6 text-[#E8C87A] transition-transform group-hover:scale-110" />
            <span className="text-white font-medium text-lg tracking-wide">
              Daniel<span className="text-[#E8C87A]">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navigationConfig.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link ${
                  location.pathname === link.href ? "text-white after:scale-x-100" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
            >
              {navigationConfig.ctaText}
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-8 space-y-6">
            {navigationConfig.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-white/80 hover:text-[#E8C87A] text-lg font-light tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block px-6 py-3 bg-[#E8C87A] text-[#0a0a0a] text-center font-medium tracking-wide"
            >
              {navigationConfig.ctaText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
