import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, Calendar, MessageSquare, Image, FileText,
  Star, Settings, Users, LogOut, Menu, X, Check, Trash2,
  Eye, Plus, ChevronLeft, BarChart3
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";

type Tab = "overview" | "bookings" | "messages" | "portfolio" | "blog" | "testimonials" | "settings" | "users";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "portfolio", label: "Portfolio", icon: Image },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

// Overview Tab
function OverviewTab() {
  const { data: stats } = trpc.admin.stats.useQuery();
  const { data: recentBookings } = trpc.bookings.list.useQuery();
  const { data: recentMessages } = trpc.messages.list.useQuery();

  const cards = [
    { label: "Total Bookings", value: stats?.totalBookings ?? 0, icon: Calendar, color: "text-[#E8C87A]" },
    { label: "Messages", value: stats?.totalMessages ?? 0, icon: MessageSquare, color: "text-blue-400" },
    { label: "Portfolio Items", value: stats?.totalPortfolio ?? 0, icon: Image, color: "text-green-400" },
    { label: "Testimonials", value: stats?.totalTestimonials ?? 0, icon: Star, color: "text-purple-400" },
    { label: "Blog Posts", value: stats?.totalBlogPosts ?? 0, icon: FileText, color: "text-pink-400" },
    { label: "Users", value: stats?.totalUsers ?? 0, icon: Users, color: "text-cyan-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white/5 p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <c.icon className={`w-6 h-6 ${c.color}`} />
              <span className="text-3xl text-white" style={{ fontFamily: "'EB Garamond', serif" }}>
                {c.value}
              </span>
            </div>
            <div className="text-white/50 text-sm">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 border border-white/5">
          <h3 className="text-white font-medium mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings?.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <div className="text-white text-sm">{b.name}</div>
                  <div className="text-white/40 text-xs">{b.serviceType}</div>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  b.status === "approved" ? "bg-green-500/20 text-green-400" :
                  b.status === "rejected" ? "bg-red-500/20 text-red-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {b.status}
                </span>
              </div>
            ))}
            {(!recentBookings || recentBookings.length === 0) && (
              <p className="text-white/30 text-sm">No bookings yet</p>
            )}
          </div>
        </div>

        <div className="bg-white/5 p-6 border border-white/5">
          <h3 className="text-white font-medium mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {recentMessages?.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <div className="text-white text-sm">{m.name}</div>
                  <div className="text-white/40 text-xs truncate max-w-[200px]">{m.content}</div>
                </div>
                <span className={`text-xs px-2 py-1 ${
                  m.isRead === "read" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {m.isRead}
                </span>
              </div>
            ))}
            {(!recentMessages || recentMessages.length === 0) && (
              <p className="text-white/30 text-sm">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Bookings Tab
function BookingsTab() {
  const utils = trpc.useUtils();
  const { data: bookings } = trpc.bookings.list.useQuery();
  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => utils.bookings.list.invalidate(),
  });
  const deleteBooking = trpc.bookings.delete.useMutation({
    onSuccess: () => utils.bookings.list.invalidate(),
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Name</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Service</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Date</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Status</th>
              <th className="text-right text-white/50 text-xs tracking-wide py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-white text-sm">{b.name}</div>
                  <div className="text-white/40 text-xs">{b.email}</div>
                </td>
                <td className="py-3 px-4 text-white/70 text-sm">{b.serviceType}</td>
                <td className="py-3 px-4 text-white/70 text-sm">{b.eventDate || "N/A"}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 ${
                    b.status === "approved" ? "bg-green-500/20 text-green-400" :
                    b.status === "rejected" ? "bg-red-500/20 text-red-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {b.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus.mutate({ id: b.id, status: "approved" })}
                          className="p-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                          title="Approve"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStatus.mutate({ id: b.id, status: "rejected" })}
                          className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Reject"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        if (confirm("Delete this booking?")) deleteBooking.mutate({ id: b.id });
                      }}
                      className="p-1.5 bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!bookings || bookings.length === 0) && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/30 text-sm">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Messages Tab
function MessagesTab() {
  const utils = trpc.useUtils();
  const { data: messages } = trpc.messages.list.useQuery();
  const markRead = trpc.messages.markRead.useMutation({
    onSuccess: () => utils.messages.list.invalidate(),
  });
  const markReplied = trpc.messages.markReplied.useMutation({
    onSuccess: () => utils.messages.list.invalidate(),
  });
  const deleteMsg = trpc.messages.delete.useMutation({
    onSuccess: () => utils.messages.list.invalidate(),
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">From</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Subject</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Message</th>
              <th className="text-left text-white/50 text-xs tracking-wide py-3 px-4">Status</th>
              <th className="text-right text-white/50 text-xs tracking-wide py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((m) => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-white text-sm">{m.name}</div>
                  <div className="text-white/40 text-xs">{m.email}</div>
                </td>
                <td className="py-3 px-4 text-white/70 text-sm">{m.subject || "N/A"}</td>
                <td className="py-3 px-4 text-white/70 text-sm max-w-[200px] truncate">{m.content}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <span className={`text-xs px-2 py-0.5 ${
                      m.isRead === "read" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {m.isRead === "read" ? "Read" : "Unread"}
                    </span>
                    <span className={`text-xs px-2 py-0.5 ${
                      m.replyStatus === "replied" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {m.replyStatus === "replied" ? "Replied" : "No Reply"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {m.isRead === "unread" && (
                      <button
                        onClick={() => markRead.mutate({ id: m.id })}
                        className="p-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        title="Mark as read"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {m.replyStatus === "no_reply" && (
                      <button
                        onClick={() => markReplied.mutate({ id: m.id })}
                        className="p-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        title="Mark as replied"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => { if (confirm("Delete this message?")) deleteMsg.mutate({ id: m.id }); }}
                      className="p-1.5 bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!messages || messages.length === 0) && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/30 text-sm">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Portfolio Tab
function PortfolioTab() {
  const utils = trpc.useUtils();
  const { data: items } = trpc.portfolio.list.useQuery();
  const createItem = trpc.portfolio.create.useMutation({
    onSuccess: () => { utils.portfolio.list.invalidate(); setShowForm(false); },
  });
  const deleteItem = trpc.portfolio.delete.useMutation({
    onSuccess: () => utils.portfolio.list.invalidate(),
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", category: "", description: "", imageUrl: "", featured: "no" as "yes" | "no",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">Portfolio Items ({items?.length ?? 0})</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 border border-white/5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text" placeholder="Title *" required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none"
            />
            <input
              type="text" placeholder="Category *" required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none"
            />
          </div>
          <input
            type="text" placeholder="Image URL *" required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none resize-none"
            rows={3}
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white/70 text-sm">
              <input
                type="checkbox"
                checked={formData.featured === "yes"}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? "yes" : "no" })}
              />
              Featured
            </label>
            <button type="submit" className="px-6 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/5 overflow-hidden group">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white text-sm font-medium">{item.title}</h4>
                  <span className="text-[#E8C87A] text-xs">{item.category}</span>
                  {item.featured === "yes" && (
                    <span className="ml-2 text-xs bg-[#E8C87A]/20 text-[#E8C87A] px-2 py-0.5">Featured</span>
                  )}
                </div>
                <button
                  onClick={() => { if (confirm("Delete this item?")) deleteItem.mutate({ id: item.id }); }}
                  className="p-1 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blog Tab
function BlogTab() {
  const utils = trpc.useUtils();
  const { data: posts } = trpc.blog.listAll.useQuery();
  const createPost = trpc.blog.create.useMutation({
    onSuccess: () => { utils.blog.listAll.invalidate(); setShowForm(false); },
  });
  const deletePost = trpc.blog.delete.useMutation({
    onSuccess: () => utils.blog.listAll.invalidate(),
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "Daniel", published: "draft" as "draft" | "published",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">Blog Posts ({posts?.length ?? 0})</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 border border-white/5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Title *" required value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
            <input type="text" placeholder="Slug *" required value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
          </div>
          <input type="text" placeholder="Cover Image URL" value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
          <textarea placeholder="Excerpt" value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none resize-none" rows={2} />
          <textarea placeholder="Content *" required value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none resize-none" rows={6} />
          <div className="flex items-center gap-4">
            <select value={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.value as "draft" | "published" })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <button type="submit" className="px-6 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors">
              Save Post
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 text-xs py-3 px-4">Title</th>
              <th className="text-left text-white/50 text-xs py-3 px-4">Author</th>
              <th className="text-left text-white/50 text-xs py-3 px-4">Status</th>
              <th className="text-right text-white/50 text-xs py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">
                  <div className="text-white text-sm">{p.title}</div>
                  <div className="text-white/40 text-xs">{p.slug}</div>
                </td>
                <td className="py-3 px-4 text-white/70 text-sm">{p.author}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 ${
                    p.published === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {p.published}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => { if (confirm("Delete this post?")) deletePost.mutate({ id: p.id }); }}
                    className="p-1.5 text-white/30 hover:text-red-400 transition-colors ml-auto block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr><td colSpan={4} className="py-8 text-center text-white/30 text-sm">No posts found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Testimonials Tab
function TestimonialsTab() {
  const utils = trpc.useUtils();
  const { data: items } = trpc.testimonials.list.useQuery();
  const createItem = trpc.testimonials.create.useMutation({
    onSuccess: () => { utils.testimonials.list.invalidate(); setShowForm(false); },
  });
  const deleteItem = trpc.testimonials.delete.useMutation({
    onSuccess: () => utils.testimonials.list.invalidate(),
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "", clientTitle: "", content: "", rating: 5, imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">Testimonials ({items?.length ?? 0})</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 p-6 border border-white/5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Client Name *" required value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
            <input type="text" placeholder="Client Title" value={formData.clientTitle}
              onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
          </div>
          <input type="text" placeholder="Image URL" value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none" />
          <textarea placeholder="Content *" required value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none resize-none" rows={4} />
          <div className="flex items-center gap-4">
            <label className="text-white/70 text-sm">Rating:</label>
            <select value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none">
              {[1,2,3,4,5].map((r) => (<option key={r} value={r}>{r} Stars</option>))}
            </select>
            <button type="submit" className="px-6 py-2 bg-[#E8C87A] text-[#0a0a0a] text-sm font-medium hover:bg-[#d4b56a] transition-colors">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {items?.map((t) => (
          <div key={t.id} className="bg-white/5 p-6 border border-white/5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={t.imageUrl || "/images/testimonial-1.jpg"} alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-white text-sm font-medium">{t.clientName}</div>
                  <div className="text-white/40 text-xs">{t.clientTitle}</div>
                </div>
              </div>
              <button onClick={() => { if (confirm("Delete?")) deleteItem.mutate({ id: t.id }); }}
                className="p-1 text-white/30 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/60 text-sm font-light line-clamp-3">&ldquo;{t.content}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Users Tab
function UsersTab() {
  const { data: users } = trpc.admin.users.useQuery();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 text-xs py-3 px-4">Name</th>
              <th className="text-left text-white/50 text-xs py-3 px-4">Email</th>
              <th className="text-left text-white/50 text-xs py-3 px-4">Role</th>
              <th className="text-left text-white/50 text-xs py-3 px-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white text-sm">{u.name || "N/A"}</td>
                <td className="py-3 px-4 text-white/70 text-sm">{u.email || "N/A"}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 ${
                    u.role === "admin" ? "bg-[#E8C87A]/20 text-[#E8C87A]" : "bg-white/5 text-white/50"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-white/50 text-sm">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {(!users || users.length === 0) && (
              <tr><td colSpan={4} className="py-8 text-center text-white/30 text-sm">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  const utils = trpc.useUtils();
  const { data: settings } = trpc.settings.get.useQuery();
  const updateSettings = trpc.settings.update.useMutation({
    onSuccess: () => utils.settings.get.invalidate(),
  });
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      setFormData({
        studioName: settings.studioName || "",
        tagline: settings.tagline || "",
        email: settings.email || "",
        phone: settings.phone || "",
        address: settings.address || "",
        facebookUrl: settings.facebookUrl || "",
        instagramUrl: settings.instagramUrl || "",
        twitterUrl: settings.twitterUrl || "",
        youtubeUrl: settings.youtubeUrl || "",
        primaryColor: settings.primaryColor || "#E8C87A",
        secondaryColor: settings.secondaryColor || "#0a0a0a",
        accentColor: settings.accentColor || "#ffffff",
      });
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-white font-medium mb-4">Studio Information</h3>
        {[
          { key: "studioName", label: "Studio Name" },
          { key: "tagline", label: "Tagline" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "address", label: "Address" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-white/50 text-sm mb-1">{label}</label>
            <input
              type="text"
              value={formData[key] || ""}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium mb-4">Social Media</h3>
        {[
          { key: "facebookUrl", label: "Facebook" },
          { key: "instagramUrl", label: "Instagram" },
          { key: "twitterUrl", label: "Twitter" },
          { key: "youtubeUrl", label: "YouTube" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-white/50 text-sm mb-1">{label}</label>
            <input
              type="text"
              value={formData[key] || ""}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:border-[#E8C87A] focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium mb-4">Theme Colors</h3>
        {[
          { key: "primaryColor", label: "Primary Color" },
          { key: "secondaryColor", label: "Secondary Color" },
          { key: "accentColor", label: "Accent Color" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="text-white/50 text-sm w-32">{label}</label>
            <input
              type="color"
              value={formData[key] || "#000000"}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-10 h-10 bg-transparent border border-white/10 cursor-pointer"
            />
            <span className="text-white/50 text-sm">{formData[key]}</span>
          </div>
        ))}
      </div>

      <button type="submit"
        className="px-8 py-3 bg-[#E8C87A] text-[#0a0a0a] font-medium hover:bg-[#d4b56a] transition-colors"
        disabled={updateSettings.isPending}>
        {updateSettings.isPending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}

// Main Admin Dashboard
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "bookings": return <BookingsTab />;
      case "messages": return <MessagesTab />;
      case "portfolio": return <PortfolioTab />;
      case "blog": return <BlogTab />;
      case "testimonials": return <TestimonialsTab />;
      case "users": return <UsersTab />;
      case "settings": return <SettingsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/5 transform transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <BarChart3 className="w-5 h-5 text-[#E8C87A]" />
            <span className="text-white font-medium">Admin Panel</span>
          </Link>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#E8C87A]/10 text-[#E8C87A] border-r-2 border-[#E8C87A]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-4 px-4">
              <div className="w-8 h-8 rounded-full bg-[#E8C87A]/20 flex items-center justify-center">
                <span className="text-[#E8C87A] text-xs font-medium">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="text-sm">
                <div className="text-white truncate max-w-[120px]">{user?.name || "Admin"}</div>
                <div className="text-white/40 text-xs">{user?.role || "admin"}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-white font-medium">Admin Panel</span>
          <div className="w-10" />
        </div>

        <div className="p-6 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl text-white" style={{ fontFamily: "'EB Garamond', serif" }}>
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Manage your studio's {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}
              </p>
            </div>
            <Link to="/" className="text-white/40 hover:text-[#E8C87A] transition-colors flex items-center gap-2 text-sm">
              <ChevronLeft className="w-4 h-4" /> Back to Site
            </Link>
          </div>

          {renderTab()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
