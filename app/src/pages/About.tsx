import { Camera, Heart, Eye, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
  const values = [
    {
      icon: Camera,
      title: "Precision",
      description: "Every shot is meticulously composed, ensuring technical excellence and artistic vision in equal measure.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Photography is not just our profession\u2014it's our calling. We pour our hearts into every project we undertake.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "We see beyond the obvious, finding unique angles and perspectives that transform ordinary moments into art.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We hold ourselves to the highest standards, delivering work that consistently exceeds expectations.",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">About Us</span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-8 max-w-4xl"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              The Art of Capturing Light
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img
                  src="/images/about-photographer.jpg"
                  alt="Daniel - Lead Photographer"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#E8C87A] p-6 text-[#0a0a0a]">
                  <div className="text-4xl font-bold" style={{ fontFamily: "'EB Garamond', serif" }}>12+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
              <div>
                <h2
                  className="text-4xl text-white mb-6"
                  style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
                >
                  Our Story
                </h2>
                <div className="space-y-4 text-white/60 font-light leading-relaxed">
                  <p>
                    Founded in 2014, Daniel Camera Studio began as a small passion project that quickly
                    grew into one of the region's most sought-after photography studios. What started
                    with a single camera and an unwavering dedication to the craft has evolved into a
                    full-service photography and video production house.
                  </p>
                  <p>
                    Our founder, Daniel, believed that every moment holds a story worth telling. With
                    over a decade of experience capturing weddings, portraits, and commercial projects,
                    he has assembled a team of talented photographers and videographers who share his
                    vision for excellence.
                  </p>
                  <p>
                    Today, we serve clients across the country, bringing our signature blend of
                    artistic vision and technical mastery to every project. From intimate family
                    portraits to large-scale corporate events, we approach each assignment with the
                    same level of care and creativity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Mission</span>
                <h2
                  className="text-3xl text-white mt-4 mb-6"
                  style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
                >
                  Why We Exist
                </h2>
                <p className="text-white/60 font-light leading-relaxed">
                  To create timeless visual stories that celebrate life's most significant moments.
                  We believe that great photography is not just about capturing images\u2014it's about
                  preserving emotions, connections, and the beauty of the human experience for
                  generations to come.
                </p>
              </div>
              <div>
                <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Vision</span>
                <h2
                  className="text-3xl text-white mt-4 mb-6"
                  style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
                >
                  Where We're Headed
                </h2>
                <p className="text-white/60 font-light leading-relaxed">
                  To be the premier destination for discerning clients who seek photography that
                  transcends the ordinary. We aim to push creative boundaries while maintaining the
                  timeless elegance that defines our work, setting new standards for the industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Our Values</span>
              <h2
                className="text-4xl text-white mt-4"
                style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
              >
                What Drives Us
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-white/5 p-8 border border-white/5 text-center">
                  <v.icon className="w-10 h-10 text-[#E8C87A] mx-auto mb-6" />
                  <h3 className="text-xl text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-24 bg-white/5 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8">
                <div className="text-6xl text-[#E8C87A] mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>500+</div>
                <div className="text-white/60 font-light">Projects Completed</div>
              </div>
              <div className="p-8">
                <div className="text-6xl text-[#E8C87A] mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>50+</div>
                <div className="text-white/60 font-light">Industry Awards</div>
              </div>
              <div className="p-8">
                <div className="text-6xl text-[#E8C87A] mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>98%</div>
                <div className="text-white/60 font-light">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
