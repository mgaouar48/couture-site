"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scissors, Lock, Mail, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    
    // Simulate auth check
    if (data.email === "admin@boutiquefarah.com" && data.password === "admin1234") {
      // Set session cookie
      document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Lax";
      
      // Redirect
      router.replace("/admin");
      router.refresh();
    } else {
      setError("Email ou mot de passe incorrect. Veuillez utiliser les identifiants de test fournis.");
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col relative overflow-hidden select-none">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Brand logo */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center text-white mb-3 shadow-md">
          <Scissors className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Espace Administration</h2>
        <p className="text-slate-400 text-xs mt-1">Connectez-vous pour gérer votre boutique</p>
      </div>

      {/* Test Credentials Alert Box */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 mb-6 text-xs text-slate-300 relative z-10">
        <p className="font-bold text-pink-400 mb-1 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Identifiants de test (MVP) :
        </p>
        <p className="font-mono mt-1">Email: <span className="text-white font-semibold">admin@boutiquefarah.com</span></p>
        <p className="font-mono mt-0.5">Password: <span className="text-white font-semibold">admin1234</span></p>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800/40 text-red-400 p-3 rounded-lg text-xs font-semibold mb-6 flex items-start gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="email">
            Adresse email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Mail className="w-4 h-4" />
            </span>
            <input
              {...register("email")}
              className={`w-full bg-slate-800/50 border rounded-xl text-sm py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-600 transition-colors ${
                errors.email ? "border-red-500/50 focus:ring-red-500" : "border-slate-800 hover:border-slate-700"
              }`}
              id="email"
              placeholder="admin@boutiquefarah.com"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-slate-300" htmlFor="password">
              Mot de passe
            </label>
            <Link
              href="/admin/forgot-password"
              className="text-xs text-pink-400 hover:text-pink-300 font-medium transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Lock className="w-4 h-4" />
            </span>
            <input
              {...register("password")}
              className={`w-full bg-slate-800/50 border rounded-xl text-sm py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-600 transition-colors ${
                errors.password ? "border-red-500/50 focus:ring-red-500" : "border-slate-800 hover:border-slate-700"
              }`}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-600 hover:bg-pink-700 active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-md transition-all mt-6 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
