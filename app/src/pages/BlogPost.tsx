import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";

const fallbackPosts: Record<string, {
  title: string;
  content: string;
  coverImage: string;
  author: string;
  createdAt: Date;
}> = {
  "wedding-photography-tips": {
    title: "5 Tips for Perfect Wedding Photography",
    coverImage: "/images/blog-1.jpg",
    author: "Daniel",
    createdAt: new Date("2026-05-15"),
    content: `Wedding photography is one of the most rewarding yet challenging genres in our field. You're tasked with capturing one of the most important days in a couple's life, and there's no room for error. Over my twelve years of shooting weddings, I've learned invaluable lessons that have shaped my approach.

## 1. Build a Connection with the Couple

The best wedding photos come from genuine emotion, and genuine emotion comes from comfort. I always schedule at least two meetings with the couple before the big day\u2014an initial consultation and an engagement session. This time together builds trust and familiarity, which translates to more natural, authentic photos.

## 2. Master the Art of Anticipation

Wedding days are filled with fleeting moments\u2014a father's tear, a shared glance between the couple, a spontaneous laugh. The key is anticipating these moments before they happen. Study the schedule, understand the dynamics, and position yourself strategically. After shooting dozens of weddings, you develop an intuition for when these magical moments will occur.

## 3. Lighting is Everything

Whether you're working with golden hour sunlight or dimly lit reception halls, understanding light is crucial. I always scout the venue beforehand and bring a comprehensive lighting kit. For outdoor ceremonies, timing is everything. The hour before sunset provides the most flattering natural light you'll find all day.

## 4. Tell the Complete Story

A wedding album should read like a visual narrative. From the quiet moments of preparation to the joyous celebration on the dance floor, every part of the day deserves attention. I approach each wedding as a documentary filmmaker would\u2014capturing the big moments alongside the small details that make each wedding unique.

## 5. Be Prepared for Anything

Wedding days rarely go exactly as planned. Weather changes, timelines shift, and unexpected moments arise. The mark of a professional wedding photographer is the ability to adapt gracefully to any situation. Bring backup equipment, have contingency plans, and maintain a calm, reassuring presence throughout the day.

Wedding photography is a privilege. We're entrusted with preserving memories that families will treasure for generations. Approach each wedding with reverence, creativity, and unwavering professionalism.`,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post } = trpc.blog.bySlug.useQuery({ slug: slug || "" }, { enabled: !!slug });

  const fallback: typeof fallbackPosts[string] | null = slug ? (fallbackPosts[slug] ?? null) : null;

  const title = post?.title || fallback?.title || "Post Not Found";
  const content: string = post?.content || fallback?.content || "This blog post could not be found.";
  const coverImage = post?.coverImage || fallback?.coverImage || "/images/blog-1.jpg";
  const author = post?.author || fallback?.author || "Daniel";
  const createdAt = post?.createdAt || fallback?.createdAt || new Date();

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <article className="pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#E8C87A] transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-2 text-white/40 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2 text-white/40 text-sm">
                  <User className="w-4 h-4" />
                  {author}
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl text-white mb-8"
                style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
              >
                {title}
              </h1>
            </div>

            <div className="overflow-hidden aspect-[16/9] mb-12">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none font-light leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: content
                  .split("\n\n")
                  .map((p) => {
                    if (p.startsWith("## ")) {
                      return `<h2 class="text-2xl text-white mt-12 mb-6" style="font-family: 'EB Garamond', serif">${p.replace("## ", "")}</h2>`;
                    }
                    return `<p class="text-white/70 mb-6">${p}</p>`;
                  })
                  .join(""),
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
