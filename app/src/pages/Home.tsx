import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Camera, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { heroConfig, servicesConfig } from "@/config";
import { trpc } from "@/providers/trpc";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          {heroConfig.title}
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light leading-relaxed">
          {heroConfig.subtitleLine1}
        </p>
        <p className="text-[#E8C87A] text-sm md:text-base tracking-[4px] uppercase mb-10">
          {heroConfig.subtitleLine2}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
          >
            Book a Session
          </Link>
          <Link
            to="/portfolio"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            View Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: Camera, value: "500+", label: "Photo Sessions" },
    { icon: Users, value: "350+", label: "Happy Clients" },
    { icon: Award, value: "12", label: "Years Experience" },
    { icon: Star, value: "50+", label: "Awards Won" },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-8 h-8 text-[#E8C87A] mx-auto mb-4" />
              <div className="text-4xl md:text-5xl text-white mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
                {stat.value}
              </div>
              <div className="text-white/50 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const featured = servicesConfig.items.slice(0, 4);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">
            {servicesConfig.sectionLabel}
          </span>
          <h2
            className="text-4xl md:text-5xl text-white mt-4"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            {servicesConfig.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl text-white mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2 font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#E8C87A] hover:text-[#d4b56a] transition-colors tracking-wide"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedPortfolio() {
  const { data: items } = trpc.portfolio.featured.useQuery();

  const fallbackImages = [
    { id: 1, title: "Wedding Bliss", category: "Wedding", imageUrl: "/images/portfolio-wedding.jpg" },
    { id: 2, title: "Elegant Portrait", category: "Portrait", imageUrl: "/images/portfolio-portrait.jpg" },
    { id: 3, title: "Gala Evening", category: "Event", imageUrl: "/images/portfolio-event.jpg" },
    { id: 4, title: "Luxury Product", category: "Commercial", imageUrl: "/images/portfolio-commercial.jpg" },
    { id: 5, title: "Aerial View", category: "Drone", imageUrl: "/images/portfolio-drone.jpg" },
    { id: 6, title: "Fashion Editorial", category: "Fashion", imageUrl: "/images/portfolio-fashion.jpg" },
  ];

  const portfolioItems = items && items.length > 0 ? items : fallbackImages;

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Portfolio</span>
            <h2
              className="text-4xl md:text-5xl text-white mt-4"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Featured Work
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="text-[#E8C87A] hover:text-[#d4b56a] transition-colors flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <Link
              to="/portfolio"
              key={item.id}
              className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#E8C87A] text-xs tracking-[2px] uppercase">
                  {item.category}
                </span>
                <h3 className="text-xl text-white mt-1" style={{ fontFamily: "'EB Garamond', serif" }}>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();

  const fallback = [
    {
      id: 1,
      clientName: "Sarah Mitchell",
      clientTitle: "Bride",
      content: "Daniel captured our wedding day with such artistry and emotion. Every photo tells a story, and looking through our album brings back all the joy of that special day. Truly exceptional work.",
      rating: 5,
      imageUrl: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      clientName: "James Richardson",
      clientTitle: "CEO, Tech Ventures",
      content: "The corporate headshots Daniel produced for our executive team exceeded all expectations. Professional, polished, and perfectly capturing each person's character. Highly recommend.",
      rating: 5,
      imageUrl: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      clientName: "Emma Collins",
      clientTitle: "Event Coordinator",
      content: "Working with Daniel on our annual gala was seamless. He has an incredible ability to be everywhere at once, capturing candid moments while remaining completely unobtrusive.",
      rating: 5,
      imageUrl: "/images/testimonial-3.jpg",
    },
  ];

  const items = testimonials && testimonials.length > 0 ? testimonials : fallback;

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Testimonials</span>
          <h2
            className="text-4xl md:text-5xl text-white mt-4"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Client Stories
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t) => (
            <div key={t.id} className="bg-white/5 p-8 border border-white/5">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#E8C87A] fill-[#E8C87A]" />
                ))}
              </div>
              <p className="text-white/70 font-light leading-relaxed mb-8 text-sm">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.imageUrl || "/images/testimonial-1.jpg"}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-sm">{t.clientName}</div>
                  <div className="text-white/50 text-xs">{t.clientTitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 text-[#E8C87A] hover:text-[#d4b56a] transition-colors"
          >
            Read All Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          Ready to Create Something Beautiful?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto font-light">
          Let us capture your most precious moments with the artistry and professionalism they deserve.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-10 py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
          >
            Book Your Session
          </Link>
          <Link
            to="/pricing"
            className="px-10 py-4 border border-white/30 text-white hover:bg-white/5 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesPreview />
        <FeaturedPortfolio />
        <TestimonialsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
