import { Link } from "react-router-dom";
import { Camera, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { footerConfig } from "@/config";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              {footerConfig.heading}
            </h2>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
            >
              Start a Project
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {footerConfig.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-white/50 text-xs tracking-[3px] uppercase mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <span className="text-white/70 hover:text-[#E8C87A] text-sm transition-colors cursor-pointer">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <a href="#" className="text-white/40 hover:text-[#E8C87A] transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/40 hover:text-[#E8C87A] transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/40 hover:text-[#E8C87A] transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-white/40 hover:text-[#E8C87A] transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#E8C87A]" />
            <span className="text-white/40 text-sm">{footerConfig.copyright}</span>
          </div>
          <div className="flex items-center gap-6">
            {footerConfig.bottomLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
