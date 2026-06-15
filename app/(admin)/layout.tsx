"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FolderOpen, 
  LogOut,
  Scissors,
  Sun,
  Moon
} from "lucide-react";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      setTheme("dark"); // Default to dark mode
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("admin_theme", newTheme);
  };

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.replace("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Commandes", href: "/admin/orders", icon: ShoppingCart },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Catégories", href: "/admin/categories", icon: FolderOpen },
  ];

  // While theme is loading, prevent flash
  if (theme === null) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">Chargement...</div>;
  }

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password";

  if (isAuthPage) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`min-h-screen flex items-center justify-center p-4 antialiased transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,39,119,0.15),rgba(255,255,255,0))]"
            : "bg-slate-50 text-slate-800"
        }`}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen flex antialiased transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]"
          : "bg-slate-50 text-slate-800"
      }`}>
        {/* Sidebar */}
        <aside className={`w-64 border-r flex flex-col flex-shrink-0 relative z-30 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-900/60 backdrop-blur-xl border-slate-800/80 text-slate-200"
            : "bg-white border-slate-200 text-slate-700"
        }`}>
          {/* Header */}
          <div className={`h-16 flex items-center px-6 border-b gap-3 transition-colors duration-300 ${
            theme === "dark" ? "border-slate-800/80" : "border-slate-200"
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
              theme === "dark" 
                ? "bg-pink-500/10 border-pink-500/30" 
                : "bg-pink-50 border-pink-200"
            }`}>
              <Scissors className="w-4 h-4 text-pink-500" />
            </div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              Farah Admin
            </span>
            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border transition-colors ${
              theme === "dark"
                ? "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_12px_rgba(236,72,153,0.15)]"
                : "bg-pink-50 text-pink-600 border-pink-200"
            }`}>
              SaaS
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative group border ${
                    isActive 
                      ? theme === "dark"
                        ? "bg-pink-600 border-pink-500/30 text-white shadow-[0_0_20px_rgba(219,39,119,0.3)]"
                        : "bg-pink-600 border-pink-500 text-white shadow-xs"
                      : theme === "dark"
                        ? "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                        : "border-transparent text-slate-650 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive 
                      ? "text-white" 
                      : theme === "dark"
                        ? "text-slate-450 group-hover:text-pink-400"
                        : "text-slate-500 group-hover:text-pink-600"
                  }`} />
                  {item.name}
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t transition-colors duration-300 ${
            theme === "dark" ? "border-slate-800/80" : "border-slate-200"
          }`}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border border-transparent transition-all duration-200 cursor-pointer text-left ${
                theme === "dark"
                  ? "text-slate-400 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/30"
                  : "text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0 text-slate-500" />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col overflow-y-auto max-h-screen relative z-10">
          {/* Top bar */}
          <header className={`h-16 border-b flex items-center justify-between px-8 flex-shrink-0 relative z-20 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-900/40 backdrop-blur-md border-slate-800/80 text-white"
              : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div>
              <h1 className={`font-bold text-lg ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                {navItems.find((item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)))?.name || "Administration"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-slate-850 border-slate-700 text-pink-400 hover:text-pink-300 hover:bg-slate-800"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                }`}
                title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <div className={`flex items-center gap-2 border px-4 py-1.5 rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-slate-900/80 border-slate-800"
                  : "bg-slate-100 border-slate-200"
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Actif</span>
                <div className={`w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm ${
                  theme === "dark" ? "shadow-emerald-400" : ""
                }`} />
              </div>
              <div className={`text-xs font-bold border px-3 py-1.5 rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-pink-500/10 border-pink-500/20 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.1)]"
                  : "bg-pink-50 border-pink-200 text-pink-600"
              }`}>
                Gérant
              </div>
            </div>
          </header>

          {/* Content Body */}
          <main className="p-8 flex-grow">
            {children}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
