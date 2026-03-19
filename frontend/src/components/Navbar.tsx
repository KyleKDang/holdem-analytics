"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Spade, Menu, X, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Analyzer" },
    ...(isLoggedIn
      ? [
          { href: "/sessions", label: "Sessions" },
          { href: "/analytics", label: "Dashboard" },
        ]
      : []),
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0f14]/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(212,175,55,0.15)]"
          : "bg-[#0c0f14]/80 backdrop-blur-md"
      }`}
      style={{ borderBottom: "1px solid rgba(212,175,55,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-[#d4af37]/10 group-hover:bg-[#d4af37]/20 transition-colors" />
              <TrendingUp className="w-4 h-4 text-[#d4af37] relative z-10" />
            </div>
            <span
              className="text-[15px] font-bold tracking-[0.08em] text-white uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.06em",
              }}
            >
              Hold&apos;Em <span className="text-[#d4af37]">Analytics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-200 ${
                  pathname === href
                    ? "text-[#d4af37]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {pathname === href && (
                  <span className="absolute inset-0 rounded-md bg-[#d4af37]/8" />
                )}
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md transition-all duration-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0c0f14] bg-[#d4af37] hover:bg-[#e8c547] rounded-md transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  <User className="w-3.5 h-3.5" />
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 pt-4 space-y-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  pathname === href
                    ? "bg-[#d4af37]/10 text-[#d4af37]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}

            <div
              className="pt-3 space-y-2"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                marginTop: "12px",
              }}
            >
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400 border border-slate-700 rounded-md"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-2.5 text-center text-sm font-medium text-slate-400 hover:text-white border border-slate-700 rounded-md transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-[#0c0f14] bg-[#d4af37] rounded-md"
                  >
                    <User className="w-3.5 h-3.5" />
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
