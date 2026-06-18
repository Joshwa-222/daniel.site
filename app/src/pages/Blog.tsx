import { Link } from "react-router-dom";
import { Calendar, ArrowRight, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";

const fallbackPosts = [
  {
    id: 1,
    title: "5 Tips for Perfect Wedding Photography",
    slug: "wedding-photography-tips",
    excerpt: "Discover the secrets to capturing stunning wedding photos that will be cherished for a lifetime. From lighting to composition, we share our expert advice.",
    coverImage: "/images/blog-1.jpg",
    author: "Daniel",
    createdAt: new Date("2026-05-15"),
  },
  {
    id: 2,
    title: "The Essential Camera Gear for Portrait Photographers",
    slug: "essential-camera-gear",
    excerpt: "A comprehensive guide to the equipment every portrait photographer should have in their kit. From cameras to lighting, we cover it all.",
    coverImage: "/images/blog-2.jpg",
    author: "Daniel",
    createdAt: new Date("2026-04-28"),
  },
  {
    id: 3,
    title: "How to Prepare for Your Professional Headshot Session",
    slug: "headshot-session-prep",
    excerpt: "Getting ready for a headshot session? Here are our top recommendations to ensure you look your best and get photos that truly represent your professional image.",
    coverImage: "/images/portfolio-portrait.jpg",
    author: "Daniel",
    createdAt: new Date("2026-04-10"),
  },
  {
    id: 4,
    title: "The Art of Drone Photography: A Beginner's Guide",
    slug: "drone-photography-guide",
    excerpt: "Aerial photography opens up a whole new world of creative possibilities. Learn the fundamentals of drone photography and how to capture breathtaking aerial shots.",
    coverImage: "/images/portfolio-drone.jpg",
    author: "Daniel",
    createdAt: new Date("2026-03-22"),
  },
  {
    id: 5,
    title: "Behind the Lens: Our Creative Process",
    slug: "creative-process",
    excerpt: "Take a peek behind the scenes at Daniel Camera Studio. Learn about our approach to photography and what makes our style unique.",
    coverImage: "/images/hero-bg.jpg",
    author: "Daniel",
    createdAt: new Date("2026-03-05"),
  },
  {
    id: 6,
    title: "Choosing the Right Photographer for Your Event",
    slug: "choosing-event-photographer",
    excerpt: "Not all event photographers are created equal. Here's what to look for when selecting a professional to capture your special occasion.",
    coverImage: "/images/portfolio-event.jpg",
    author: "Daniel",
    createdAt: new Date("2026-02-18"),
  },
];

export default function Blog() {
  const { data: posts } = trpc.blog.list.useQuery();
  const items = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Blog</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Studio Journal
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              Insights, tips, and stories from the world of professional photography.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Featured Post */}
            {items[0] && (
              <Link to={`/blog/${items[0].slug}`} className="group block mb-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img
                      src={items[0].coverImage || "/images/blog-1.jpg"}
                      alt={items[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center gap-2 text-white/40 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(items[0].createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-2 text-white/40 text-sm">
                        <User className="w-4 h-4" />
                        {items[0].author}
                      </span>
                    </div>
                    <h2
                      className="text-3xl text-white mb-4 group-hover:text-[#E8C87A] transition-colors"
                      style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
                    >
                      {items[0].title}
                    </h2>
                    <p className="text-white/60 font-light leading-relaxed mb-6">
                      {items[0].excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#E8C87A] group-hover:text-[#d4b56a] transition-colors">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Post Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.slice(1).map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="overflow-hidden aspect-[16/10] mb-4">
                    <img
                      src={post.coverImage || "/images/blog-1.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-white/40 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3
                    className="text-xl text-white mb-2 group-hover:text-[#E8C87A] transition-colors"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
