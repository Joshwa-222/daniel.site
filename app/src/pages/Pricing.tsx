import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const packages = [
  {
    category: "PORTRAIT SESSIONS",
    tiers: [
      {
        name: "Mini Session",
        price: "$299",
        duration: "30 minutes",
        features: [
          "15 edited digital photos",
          "1 outfit change",
          "Online gallery",
          "Print release",
        ],
      },
      {
        name: "Standard Portrait",
        price: "$599",
        duration: "1.5 hours",
        features: [
          "40 edited digital photos",
          "3 outfit changes",
          "Online gallery + downloads",
          "Print release",
          "Professional retouching",
        ],
        popular: true,
      },
      {
        name: "Premium Portrait",
        price: "$999",
        duration: "3 hours",
        features: [
          "75 edited digital photos",
          "Unlimited outfit changes",
          "Online gallery + downloads",
          "Print release",
          "Advanced retouching",
          "1 canvas print (16x20)",
        ],
      },
    ],
  },
  {
    category: "WEDDING PACKAGES",
    tiers: [
      {
        name: "Intimate",
        price: "$1,999",
        duration: "4 hours",
        features: [
          "150 edited photos",
          "1 photographer",
          "Online gallery",
          "Print release",
          "Engagement session",
        ],
      },
      {
        name: "Classic",
        price: "$3,499",
        duration: "8 hours",
        features: [
          "400 edited photos",
          "2 photographers",
          "Online gallery + USB",
          "Print release",
          "Engagement session",
          "Premium photo album",
        ],
        popular: true,
      },
      {
        name: "Luxury",
        price: "$5,999",
        duration: "Full day",
        features: [
          "700 edited photos",
          "2 photographers + assistant",
          "Online gallery + USB",
          "Print release",
          "Engagement session",
          "Deluxe photo album",
          "Same-day slideshow",
          "Drone coverage",
        ],
      },
    ],
  },
  {
    category: "EVENT COVERAGE",
    tiers: [
      {
        name: "Essential",
        price: "$799",
        duration: "3 hours",
        features: [
          "100 edited photos",
          "Online gallery",
          "48-hour turnaround",
          "Print release",
        ],
      },
      {
        name: "Standard",
        price: "$1,499",
        duration: "6 hours",
        features: [
          "250 edited photos",
          "Online gallery",
          "24-hour turnaround",
          "Print release",
          "Highlight reel (2 min)",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "$2,499",
        duration: "Full event",
        features: [
          "500 edited photos",
          "Online gallery",
          "Same-day previews",
          "Print release",
          "Full event video (5 min)",
          "Drone coverage",
        ],
      },
    ],
  },
];

const addons = [
  { name: "Additional Hour", price: "$250" },
  { name: "Second Photographer", price: "$500" },
  { name: "Drone Coverage", price: "$400" },
  { name: "Photo Album (20 pages)", price: "$350" },
  { name: "Same-Day Edits", price: "$300" },
  { name: "Video Highlight Reel", price: "$600" },
];

export default function Pricing() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Pricing</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Investment
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              Transparent pricing for every occasion. All packages can be customized to fit your
              specific needs.
            </p>
          </div>
        </section>

        {packages.map((pkg) => (
          <section key={pkg.category} className="pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-[#E8C87A] text-xs tracking-[4px] uppercase mb-10">{pkg.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {pkg.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative p-8 ${
                      tier.popular
                        ? "bg-[#E8C87A]/10 border-2 border-[#E8C87A]"
                        : "bg-white/5 border border-white/5"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E8C87A] text-[#0a0a0a] text-xs font-medium tracking-wide">
                        POPULAR
                      </div>
                    )}
                    <h3 className="text-white text-xl" style={{ fontFamily: "'EB Garamond', serif" }}>
                      {tier.name}
                    </h3>
                    <div className="text-[#E8C87A] text-4xl my-3" style={{ fontFamily: "'EB Garamond', serif" }}>
                      {tier.price}
                    </div>
                    <p className="text-white/50 text-sm mb-6">{tier.duration}</p>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                          <Check className="w-4 h-4 text-[#E8C87A] mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className={`block text-center py-3 font-medium tracking-wide transition-colors text-sm ${
                        tier.popular
                          ? "bg-[#E8C87A] text-[#0a0a0a] hover:bg-[#d4b56a]"
                          : "border border-white/30 text-white hover:bg-white/5"
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Add-ons */}
        <section className="py-24 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-3xl text-white mb-10"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Add-On Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addons.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/5"
                >
                  <span className="text-white/70">{addon.name}</span>
                  <span className="text-[#E8C87A]" style={{ fontFamily: "'EB Garamond', serif" }}>
                    {addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl text-white mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Need a Custom Package?
            </h2>
            <p className="text-white/60 font-light mb-8">
              We understand every project is unique. Contact us to discuss your specific
              requirements and we'll create a tailored proposal just for you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
            >
              Get a Custom Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
