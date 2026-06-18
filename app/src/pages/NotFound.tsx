import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center px-6">
        <h1
          className="text-8xl md:text-9xl text-[#E8C87A] mb-4"
          style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
        >
          404
        </h1>
        <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
          Page Not Found
        </h2>
        <p className="text-white/50 font-light mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let us help you find your way back.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
