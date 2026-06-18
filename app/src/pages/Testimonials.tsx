import { Star, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";

const fallbackTestimonials = [
  {
    id: 1,
    clientName: "Sarah Mitchell",
    clientTitle: "Bride",
    content: "Daniel captured our wedding day with such artistry and emotion. Every photo tells a story, and looking through our album brings back all the joy of that special day. Truly exceptional work that exceeded every expectation we had. The attention to detail and the ability to capture candid moments was remarkable.",
    rating: 5,
    imageUrl: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    clientName: "James Richardson",
    clientTitle: "CEO, Tech Ventures",
    content: "The corporate headshots Daniel produced for our executive team exceeded all expectations. Professional, polished, and perfectly capturing each person's character. The entire process was seamless from start to finish. We've received countless compliments on the new photos.",
    rating: 5,
    imageUrl: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    clientName: "Emma Collins",
    clientTitle: "Event Coordinator",
    content: "Working with Daniel on our annual gala was an absolute pleasure. He has an incredible ability to be everywhere at once, capturing candid moments while remaining completely unobtrusive. The final photos perfectly captured the elegance and energy of the evening.",
    rating: 5,
    imageUrl: "/images/testimonial-3.jpg",
  },
  {
    id: 4,
    clientName: "Michael Torres",
    clientTitle: "Groom",
    content: "I was amazed by how comfortable Daniel made us feel during our engagement shoot. The photos came out absolutely stunning - natural, romantic, and perfectly us. He has a gift for putting people at ease while capturing genuine emotion.",
    rating: 5,
    imageUrl: "/images/testimonial-2.jpg",
  },
  {
    id: 5,
    clientName: "Lisa Chen",
    clientTitle: "Marketing Director",
    content: "Daniel's product photography transformed our e-commerce presence. The images are crisp, compelling, and have directly contributed to increased sales. His understanding of brand aesthetics and commercial requirements is exceptional.",
    rating: 5,
    imageUrl: "/images/testimonial-1.jpg",
  },
  {
    id: 6,
    clientName: "Robert Hayes",
    clientTitle: "Father of the Bride",
    content: "As someone who values quality and professionalism, I was thoroughly impressed with Daniel Camera Studio. The wedding photos are treasures we'll cherish forever. Every important moment was captured with such care and artistry.",
    rating: 5,
    imageUrl: "/images/testimonial-3.jpg",
  },
];

export default function Testimonials() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const items = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Testimonials</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Client Stories
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about
              their experience with Daniel Camera Studio.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t, i) => (
                <div
                  key={t.id}
                  className={`bg-white/5 p-8 border border-white/5 ${
                    i === 0 || i === 3 ? "md:row-span-1" : ""
                  }`}
                >
                  <Quote className="w-8 h-8 text-[#E8C87A]/30 mb-6" />
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#E8C87A] fill-[#E8C87A]" />
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
