"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, User, BarChart3, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800/90 backdrop-blur-lg border-b-2 border-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            <span className="text-lg sm:text-2xl font-extrabold text-yellow-400 group-hover:brightness-110 transition-all">
              Hold&apos;Em Analytics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-lg font-semibold transition-colors ${
                pathname === "/"
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              Analyzer
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  href="/sessions"
                  className={`text-lg font-semibold transition-colors ${
                    pathname === "/sessions"
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Sessions
                </Link>
                <Link
                  href="/analytics"
                  className={`text-lg font-semibold transition-colors ${
                    pathname === "/analytics"
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-gray-700/50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:brightness-110 transition-all"
                >
                  <User className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-gray-700 pt-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Analyzer
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  href="/sessions"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                    pathname === "/sessions"
                      ? "bg-yellow-400 text-gray-900"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Sessions
                </Link>
                <Link
                  href="/analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                    pathname === "/analytics"
                      ? "bg-yellow-400 text-gray-900"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center text-white font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:brightness-110 transition-all"
                >
                  <User className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
