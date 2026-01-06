"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateUsername = (username: string): string | null => {
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be at most 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        email,
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-73px)] p-4 sm:p-6 bg-gradient-to-b from-gray-900 via-green-950 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-sm border-2 border-yellow-400"
      >
        {error && (
          <div className="bg-red-700 text-white p-2.5 sm:p-3 rounded mb-4 text-center font-semibold shadow-md text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-semibold mb-2 text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoFocus
            className="w-full bg-gray-700/80 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-xs sm:text-sm font-semibold mb-2 text-white"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full bg-gray-700/80 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-xs sm:text-sm font-semibold mb-2 text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-gray-700/80 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-xs sm:text-sm font-semibold mb-2 text-white"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full bg-gray-700/80 text-white p-2.5 sm:p-3 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 sm:py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-base sm:text-lg hover:scale-105 hover:brightness-110 transition-transform duration-200 active:scale-95 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
