import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/providers/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    eventDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"booking" | "message">("booking");

  const bookingMutation = trpc.bookings.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const messageMutation = trpc.messages.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "booking") {
      bookingMutation.mutate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        serviceType: formData.serviceType,
        eventDate: formData.eventDate || undefined,
        message: formData.message || undefined,
      });
    } else {
      messageMutation.mutate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.serviceType,
        content: formData.message,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <main>
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <span className="text-[#E8C87A] text-xs tracking-[4px] uppercase">Contact</span>
            <h1
              className="text-5xl md:text-6xl text-white mt-4 mb-6"
              style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
            >
              Get in Touch
            </h1>
            <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
              Ready to create something beautiful? We'd love to hear about your project.
              Reach out and let's start planning.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h3
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#E8C87A] mt-1" />
                      <div>
                        <div className="text-white font-medium text-sm">Studio Address</div>
                        <div className="text-white/50 text-sm font-light">
                          123 Creative Avenue, Art District<br />
                          New York, NY 10001
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[#E8C87A] mt-1" />
                      <div>
                        <div className="text-white font-medium text-sm">Phone</div>
                        <div className="text-white/50 text-sm font-light">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[#E8C87A] mt-1" />
                      <div>
                        <div className="text-white font-medium text-sm">Email</div>
                        <div className="text-white/50 text-sm font-light">hello@danielcamera.studio</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-[#E8C87A] mt-1" />
                      <div>
                        <div className="text-white font-medium text-sm">Studio Hours</div>
                        <div className="text-white/50 text-sm font-light">
                          Mon - Fri: 9:00 AM - 7:00 PM<br />
                          Sat: 10:00 AM - 5:00 PM<br />
                          Sun: By appointment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-4">
                    <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#E8C87A] hover:text-[#0a0a0a] transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#E8C87A] hover:text-[#0a0a0a] transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#E8C87A] hover:text-[#0a0a0a] transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#E8C87A] hover:text-[#0a0a0a] transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 p-6 border border-white/5">
                  <h4 className="text-white font-medium mb-3">Quick Response Guarantee</h4>
                  <p className="text-white/50 text-sm font-light">
                    We respond to all inquiries within 24 hours. For urgent requests,
                    please call us directly.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="bg-white/5 p-12 border border-white/5 text-center">
                    <CheckCircle className="w-16 h-16 text-[#E8C87A] mx-auto mb-6" />
                    <h3
                      className="text-3xl text-white mb-4"
                      style={{ fontFamily: "'EB Garamond', serif" }}
                    >
                      Thank You!
                    </h3>
                    <p className="text-white/60 font-light mb-8">
                      We've received your {activeTab === "booking" ? "booking request" : "message"} and will get back to you within 24 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", serviceType: "", eventDate: "", message: "" });
                        }}
                        className="px-6 py-3 border border-white/30 text-white hover:bg-white/5 transition-colors"
                      >
                        Send Another
                      </button>
                      <Link
                        to="/"
                        className="px-6 py-3 bg-[#E8C87A] text-[#0a0a0a] hover:bg-[#d4b56a] transition-colors"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 p-8 md:p-12 border border-white/5">
                    {/* Tabs */}
                    <div className="flex gap-0 mb-8">
                      <button
                        onClick={() => setActiveTab("booking")}
                        className={`flex-1 py-3 text-sm tracking-wide transition-colors ${
                          activeTab === "booking"
                            ? "bg-[#E8C87A] text-[#0a0a0a]"
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        Book a Session
                      </button>
                      <button
                        onClick={() => setActiveTab("message")}
                        className={`flex-1 py-3 text-sm tracking-wide transition-colors ${
                          activeTab === "message"
                            ? "bg-[#E8C87A] text-[#0a0a0a]"
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        Send a Message
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/50 text-sm mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white/50 text-sm mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/50 text-sm mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white/50 text-sm mb-2">
                            {activeTab === "booking" ? "Service Type *" : "Subject"}
                          </label>
                          {activeTab === "booking" ? (
                            <select
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleChange}
                              required
                              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                            >
                              <option value="">Select a service</option>
                              <option value="Wedding Photography">Wedding Photography</option>
                              <option value="Portrait Photography">Portrait Photography</option>
                              <option value="Event Photography">Event Photography</option>
                              <option value="Commercial Photography">Commercial Photography</option>
                              <option value="Video Production">Video Production</option>
                              <option value="Drone Photography">Drone Photography</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleChange}
                              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                            />
                          )}
                        </div>
                      </div>

                      {activeTab === "booking" && (
                        <div>
                          <label className="block text-white/50 text-sm mb-2">Event Date</label>
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-white/50 text-sm mb-2">
                          {activeTab === "booking" ? "Additional Details" : "Your Message *"}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required={activeTab === "message"}
                          className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 focus:border-[#E8C87A] focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingMutation.isPending || messageMutation.isPending}
                        className="w-full py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        {bookingMutation.isPending || messageMutation.isPending
                          ? "Sending..."
                          : activeTab === "booking"
                            ? "Submit Booking Request"
                            : "Send Message"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
