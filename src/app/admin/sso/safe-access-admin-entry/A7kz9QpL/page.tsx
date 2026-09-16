"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { validateLoginForm } from "@/lib/validation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi sebelum submit
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        setIsLoading(false);
        setShowLoading(true);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 4000);
      } else {
        setError("Email atau password salah. Silakan coba lagi.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setShowLoading(true);
    setTimeout(() => {
      signIn("github", { callbackUrl: "/admin/dashboard" });
    }, 1200);
  };

  if (!mounted) {
    return null;
  }

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-zinc-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Orbs */}
            <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-zinc-200/50 rounded-full blur-xl"></div>
            <div className="absolute top-1/4 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-zinc-200/50 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-1/4 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-zinc-200/50 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Login Card */}
            <div className="bg-white rounded-3xl border border-black/10 shadow-lg shadow-black/5 overflow-hidden">
              {/* Header Section */}
              <div className="relative px-6 sm:px-8 pt-8 sm:pt-10 pb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Admin Login
                </h1>
              </div>

              {/* Form Section */}
              <div className="px-6 sm:px-8 pb-8 sm:pb-10">
                {/* Error Message */}
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-rose-50 border border-rose-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-rose-700">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form
                  onSubmit={handleLocalLogin}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 sm:h-14 pl-12 pr-4 text-base bg-white border border-black/10 focus:border-black rounded-xl transition-all duration-200 placeholder:text-zinc-400 text-black"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 block">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 sm:h-14 pl-12 pr-12 text-base bg-white border border-black/10 focus:border-black rounded-xl transition-all duration-200 placeholder:text-zinc-400 text-black"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-105 transition-transform"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5 text-zinc-400 hover:text-zinc-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-3.29-3.29m7.532 7.532l2.567 2.567M19.5 12a9 9 0 01-1.563 3.029"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-zinc-400 hover:text-zinc-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 bg-black hover:bg-zinc-800 text-white font-semibold text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Login</span>
                      </div>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6 sm:my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/10"></div>
                  </div>
                </div>

                {/* GitHub Login */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGithubLogin}
                  disabled={isLoading}
                  className="w-full h-12 sm:h-14 border border-black/10 hover:border-black/30 bg-zinc-50 hover:bg-zinc-100 text-black font-semibold text-base rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Login GitHub</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-zinc-400">
                © 2024 Portfolio Admin. Dilindungi dengan keamanan tingkat
                enterprise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
