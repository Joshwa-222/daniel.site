export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "Daniel Camera Studio",
};

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Book Now",
};

export const heroConfig = {
  title: "Daniel Camera Studio",
  subtitleLine1: "Premium photography services capturing life's most precious moments with artistry and precision.",
  subtitleLine2: "Wedding \u00B7 Portrait \u00B7 Event \u00B7 Commercial",
  ctaText: "Explore Our Work",
};

export const servicesConfig = {
  sectionLabel: "OUR SERVICES",
  title: "What We Offer",
  items: [
    {
      title: "Wedding Photography",
      description: "Capturing the magic of your special day with timeless elegance. From intimate ceremonies to grand celebrations, we document every heartfelt moment.",
      image: "/images/portfolio-wedding.jpg",
    },
    {
      title: "Portrait Photography",
      description: "Professional portraits that reveal your true essence. Studio and on-location sessions for individuals, families, and corporate headshots.",
      image: "/images/portfolio-portrait.jpg",
    },
    {
      title: "Event Photography",
      description: "Comprehensive coverage of corporate events, galas, and private functions. Discreet yet thorough documentation of every important moment.",
      image: "/images/portfolio-event.jpg",
    },
    {
      title: "Commercial Photography",
      description: "High-end product and brand photography that elevates your visual identity. Perfect for advertising, catalogs, and e-commerce.",
      image: "/images/portfolio-commercial.jpg",
    },
    {
      title: "Video Production",
      description: "Cinematic video services from concept to final cut. Promotional films, event highlights, and brand storytelling that captivates.",
      image: "/images/portfolio-video.jpg",
    },
    {
      title: "Drone Photography",
      description: "Breathtaking aerial perspectives for real estate, weddings, and landscape projects. FAA-certified drone pilot for stunning vantage points.",
      image: "/images/portfolio-drone.jpg",
    },
  ],
};

export const footerConfig = {
  heading: "Let's Create Together",
  columns: [
    {
      title: "SERVICES",
      links: ["Wedding Photography", "Portrait Sessions", "Event Coverage", "Commercial Work", "Video Production"],
    },
    {
      title: "COMPANY",
      links: ["About Us", "Portfolio", "Pricing", "Blog", "Contact"],
    },
  ],
  copyright: "\u00A9 2026 Daniel Camera Studio. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Admin Login", href: "/admin" },
  ],
};
