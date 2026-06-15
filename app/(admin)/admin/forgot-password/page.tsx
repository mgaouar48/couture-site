"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Scissors, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function AdminForgotPasswordPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotFormData) => {
    // Simulate reset request
    console.log("Password reset requested for:", data.email);
    setSuccess(true);
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Brand logo */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center text-white mb-3 shadow-md">
          <Scissors className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Mot de passe oublié</h2>
        <p className="text-slate-400 text-xs mt-1">Récupérez l&apos;accès à votre espace d&apos;administration</p>
      </div>

      {success ? (
        <div className="text-center relative z-10 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Email envoyé</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Si cette adresse email correspond à un administrateur enregistré, vous recevrez un lien de réinitialisation sous peu.
          </p>
          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retourner à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Saisissez l&apos;adresse email de votre compte administrateur. Nous vous enverrons un lien pour choisir un nouveau mot de passe.
          </p>

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
                placeholder="gérant@boutiquefarah.com"
                type="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 hover:bg-pink-700 active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-md transition-all mt-6 cursor-pointer"
          >
            {isSubmitting ? "Envoi du lien..." : "Envoyer le lien de récupération"}
          </button>

          <div className="text-center mt-6">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retourner à la connexion
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
