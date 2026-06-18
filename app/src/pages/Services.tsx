import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { servicesConfig } from "@/config";

const pricingTiers = [
  {
    name: "Essential",
    price: "$499",
    description: "Perfect for intimate sessions",
    features: [
      "2-hour photo session",
      "50 edited digital photos",
      "Online gallery",
      "Print release",
      "2 outfit changes",
    ],
  },
  {
    name: "Premium",
    price: "$1,299",
    description: "Our most popular choice",
    features: [
      "5-hour coverage",
      "200 edited digital photos",
      "Online gallery + downloads",
      "Print release",
      "Unlimited outfit changes",
      "1 canvas print (16x24)",
    ],
    popular: true,
  },
  {
    name: "Luxury",
    price: "$2,499",
    description: "The complete experience",
    features: [
      "Full-day coverage (8 hours)",
      "500 edited digital photos",
      "Online gallery + downloads",
      "Print release",
      "Unlimited outfit changes",
      "2 canvas prints (20x30)",
      "Premium photo album",
      "Engagement session included",
    ],
  },
];

export default function Services() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Services</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              What We Offer
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              From intimate portraits to grand celebrations, we provide comprehensive photography
              services tailored to your unique vision and needs.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesConfig.items.map((service, index) => (
                <div
                  key={service.title}
                  className={`group relative overflow-hidden ${index === 0 || index === 1 ? "md:col-span-1" : ""}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 border-t-0">
                    <h3
                      className="text-xl text-white mb-3"
                      style={{ fontFamily: "'EB Garamond', serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#E8C87A] text-sm hover:text-[#d4b56a] transition-colors"
                    >
                      Inquire Now <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-24 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Investment</span>
              <h2
                className="text-4xl md:text-5xl text-white mt-4"
                style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
              >
                Session Packages
              </h2>
              <p className="text-white/50 mt-4 font-light max-w-xl mx-auto">
                Transparent pricing for exceptional quality. Custom packages available upon request.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
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
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-white text-xl mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
                    {tier.name}
                  </h3>
                  <div className="text-[#E8C87A] text-4xl mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
                    {tier.price}
                  </div>
                  <p className="text-white/50 text-sm mb-6">{tier.description}</p>
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
                    className={`block text-center py-3 font-medium tracking-wide transition-colors ${
                      tier.popular
                        ? "bg-[#E8C87A] text-[#0a0a0a] hover:bg-[#d4b56a]"
                        : "border border-white/30 text-white hover:bg-white/5"
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-[#E8C87A] hover:text-[#d4b56a] transition-colors"
              >
                View Detailed Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
