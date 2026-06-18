import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";

const categories = ["All", "Wedding", "Portrait", "Event", "Commercial", "Video", "Drone", "Fashion", "Family"];

const fallbackPortfolio = [
  { id: 1, title: "Wedding Bliss", category: "Wedding", imageUrl: "/images/portfolio-wedding.jpg", description: "Garden wedding ceremony" },
  { id: 2, title: "Elegant Portrait", category: "Portrait", imageUrl: "/images/portfolio-portrait.jpg", description: "Studio portrait session" },
  { id: 3, title: "Gala Evening", category: "Event", imageUrl: "/images/portfolio-event.jpg", description: "Corporate gala event" },
  { id: 4, title: "Luxury Product", category: "Commercial", imageUrl: "/images/portfolio-commercial.jpg", description: "Watch product photography" },
  { id: 5, title: "Cinematic Shoot", category: "Video", imageUrl: "/images/portfolio-video.jpg", description: "Behind the scenes" },
  { id: 6, title: "Aerial Coastal", category: "Drone", imageUrl: "/images/portfolio-drone.jpg", description: "Sunset drone photography" },
  { id: 7, title: "Haute Couture", category: "Fashion", imageUrl: "/images/portfolio-fashion.jpg", description: "Fashion editorial" },
  { id: 8, title: "Newborn Session", category: "Family", imageUrl: "/images/portfolio-family.jpg", description: "Newborn portrait" },
  { id: 9, title: "Golden Hour Wedding", category: "Wedding", imageUrl: "/images/portfolio-wedding.jpg", description: "Sunset wedding portraits" },
  { id: 10, title: "Executive Portrait", category: "Portrait", imageUrl: "/images/testimonial-2.jpg", description: "Corporate headshot" },
  { id: 11, title: "Charity Ball", category: "Event", imageUrl: "/images/portfolio-event.jpg", description: "Fundraising gala" },
  { id: 12, title: "Brand Campaign", category: "Commercial", imageUrl: "/images/portfolio-commercial.jpg", description: "Luxury brand shoot" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const { data: dbPortfolio } = trpc.portfolio.list.useQuery();

  const items = dbPortfolio && dbPortfolio.length > 0 ? dbPortfolio : fallbackPortfolio;

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Portfolio</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Our Work
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              A curated selection of our finest photography across weddings, portraits, events,
              and commercial projects.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm tracking-wide transition-colors ${
                    activeCategory === cat
                      ? "bg-[#E8C87A] text-[#0a0a0a]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden break-inside-avoid cursor-pointer"
                  onClick={() => {
                    setLightboxImage(item.imageUrl);
                    setLightboxTitle(item.title);
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/50 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#0a0a0a] to-transparent">
                    <span className="text-[#E8C87A] text-xs tracking-[2px] uppercase">{item.category}</span>
                    <h3 className="text-white text-lg" style={{ fontFamily: "'EB Garamond', serif" }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a0a]/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="text-white text-center mt-4" style={{ fontFamily: "'EB Garamond', serif" }}>
              {lightboxTitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
