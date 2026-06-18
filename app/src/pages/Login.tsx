import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Camera, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "admin") {
      navigate("/admin");
    } else if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/90 to-[#0a0a0a]" />

      <div className="relative z-10 w-full max-w-md px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#E8C87A] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <Camera className="w-12 h-12 text-[#E8C87A] mx-auto mb-6" />
          <h1
            className="text-3xl text-white mb-2"
            style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400 }}
          >
            Daniel Camera Studio
          </h1>
          <p className="text-white/50 font-light">Admin Portal</p>
        </div>

        <div className="bg-white/5 p-8 border border-white/5">
          <button
            className="w-full py-4 bg-[#E8C87A] text-[#0a0a0a] font-medium tracking-wide hover:bg-[#d4b56a] transition-colors flex items-center justify-center gap-3"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            Sign in with Kimi
          </button>

          <div className="mt-6 text-center">
            <p className="text-white/30 text-xs">
              Secure authentication powered by Kimi OAuth 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
