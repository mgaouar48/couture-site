"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  FolderOpen, 
  AlertCircle,
  CheckCircle,
  Truck,
  XCircle,
  Search,
  Eye
} from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/shop-data";
import { useTheme } from "../layout";

interface OrderItem {
  productId: string;
  productTitle: string;
  quantite: number;
  price: string;
  image: string;
}

// Order Interface based on form submission
interface Order {
  id: string;
  nom: string;
  telephone: string;
  wilaya: string;
  commune: string;
  typeLivraison: "bureau" | "domicile";
  adresse?: string;
  productTitle: string;
  quantite: number;
  totalPrice: number;
  date: string;
  status: "pending" | "searching" | "assigned" | "on_route" | "completed" | "cancelled";
  items?: OrderItem[];
}

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: "CMD-2026-001",
    nom: "Yasmine Ben",
    telephone: "0555123456",
    wilaya: "31 - Oran",
    commune: "Ain Kerma",
    typeLivraison: "bureau",
    productTitle: "Machine à coudre professionnelle",
    quantite: 3,
    totalPrice: 135400,
    date: "11/06/2026 14:30",
    status: "completed",
  },
  {
    id: "CMD-2026-002",
    nom: "Sofiane Larbi",
    telephone: "0661987654",
    wilaya: "16 - Alger",
    commune: "Bab El Oued",
    typeLivraison: "domicile",
    adresse: "25 Rue Didouche Mourad, Apt 4",
    productTitle: "Ciseaux de couture robustes",
    quantite: 1,
    totalPrice: 4150,
    date: "11/06/2026 15:45",
    status: "pending",
  },
  {
    id: "CMD-2026-003",
    nom: "Fatima Zohra",
    telephone: "0770321456",
    wilaya: "25 - Constantine",
    commune: "Hamma Bouziane",
    typeLivraison: "bureau",
    productTitle: "Kit d'accessoires complet",
    quantite: 2,
    totalPrice: 11400,
    date: "10/06/2026 10:15",
    status: "on_route",
  },
  {
    id: "CMD-2026-004",
    nom: "Amine Bouazza",
    telephone: "0550112233",
    wilaya: "09 - Blida",
    commune: "Boufarik",
    typeLivraison: "domicile",
    adresse: "Cité des Cerisiers, Bloc B N°8",
    productTitle: "Cutter rotatif 45mm",
    quantite: 5,
    totalPrice: 14950,
    date: "09/06/2026 18:20",
    status: "cancelled",
  }
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Load from localStorage or use initial mock data
    const stored = localStorage.getItem("admin_orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(INITIAL_MOCK_ORDERS);
      localStorage.setItem("admin_orders", JSON.stringify(INITIAL_MOCK_ORDERS));
    }
  }, []);

  // Compute metrics
  const totalRevenue = orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const activeProducts = ALL_PRODUCTS.length;
  const totalCategories = CATEGORIES.length;

  const formatPrice = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DA";
  };

  const getStatusBadge = (status: Order["status"]) => {
    const styles = {
      pending: theme === "dark" 
        ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
        : "bg-amber-50 text-amber-700 border-amber-200",
      searching: theme === "dark"
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
        : "bg-blue-50 text-blue-700 border-blue-200",
      assigned: theme === "dark"
        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
        : "bg-indigo-50 text-indigo-700 border-indigo-200",
      on_route: theme === "dark"
        ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
        : "bg-purple-50 text-purple-700 border-purple-200",
      completed: theme === "dark"
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
        : "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: theme === "dark"
        ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
        : "bg-red-50 text-red-700 border-red-200",
    };

    const labels = {
      pending: "En attente",
      searching: "Recherche",
      assigned: "Assigné",
      on_route: "En route",
      completed: "Livré",
      cancelled: "Annulé",
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-8 select-none">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI: Revenue */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-md group flex items-center justify-between ${
          theme === "dark"
            ? "bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-pink-500/30 text-white"
            : "bg-white border-slate-200 hover:border-pink-500/20 text-slate-800"
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-bold uppercase tracking-widest block ${theme === "dark" ? "text-slate-400" : "text-slate-555"}`}>Chiffre d&apos;affaires</span>
            <h3 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{formatPrice(totalRevenue)}</h3>
            <p className="text-xs text-emerald-500 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12% ce mois
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl border group-hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" 
              ? "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.1)]"
              : "bg-pink-50 text-pink-600 border-pink-200"
          }`}>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* KPI: Orders */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-md group flex items-center justify-between ${
          theme === "dark"
            ? "bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-indigo-500/30 text-white"
            : "bg-white border-slate-200 hover:border-indigo-500/20 text-slate-800"
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-bold uppercase tracking-widest block ${theme === "dark" ? "text-slate-400" : "text-slate-555"}`}>Commandes</span>
            <h3 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{orders.length}</h3>
            <p className={`text-xs font-semibold ${theme === "dark" ? "text-slate-405" : "text-slate-500"}`}>
              {pendingOrders} en attente, {completedOrders} livrées
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl border group-hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" 
              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
              : "bg-indigo-50 text-indigo-600 border-indigo-200"
          }`}>
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        {/* KPI: Products */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-md group flex items-center justify-between ${
          theme === "dark"
            ? "bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-amber-500/30 text-white"
            : "bg-white border-slate-200 hover:border-amber-500/20 text-slate-800"
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-bold uppercase tracking-widest block ${theme === "dark" ? "text-slate-400" : "text-slate-555"}`}>Produits Actifs</span>
            <h3 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{activeProducts}</h3>
            <p className={`text-xs font-semibold ${theme === "dark" ? "text-slate-405" : "text-slate-500"}`}>Répertoriés dans la boutique</p>
          </div>
          <div className={`w-12 h-12 rounded-xl border group-hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" 
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}>
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* KPI: Categories */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-md group flex items-center justify-between ${
          theme === "dark"
            ? "bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-sky-500/30 text-white"
            : "bg-white border-slate-200 hover:border-sky-500/20 text-slate-800"
        }`}>
          <div className="space-y-1">
            <span className={`text-xs font-bold uppercase tracking-widest block ${theme === "dark" ? "text-slate-400" : "text-slate-555"}`}>Catégories</span>
            <h3 className={`text-2xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>{totalCategories}</h3>
            <p className={`text-xs font-semibold ${theme === "dark" ? "text-slate-405" : "text-slate-500"}`}>Familles de produits actives</p>
          </div>
          <div className={`w-12 h-12 rounded-xl border group-hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" 
              ? "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
              : "bg-sky-50 text-sky-600 border-sky-200"
          }`}>
            <FolderOpen className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className={`rounded-2xl border shadow-md overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/40 backdrop-blur-md border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className={`p-6 border-b flex items-center justify-between ${
          theme === "dark" ? "border-slate-800/80 bg-slate-900/20" : "border-slate-100 bg-slate-50/50"
        }`}>
          <h3 className={`font-extrabold text-lg tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Dernières commandes</h3>
          <Link 
            href="/admin/orders" 
            className="text-pink-500 hover:text-pink-400 text-sm font-bold transition-colors"
          >
            Voir tout
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={`font-bold text-xs border-b ${
                theme === "dark" ? "bg-slate-900/60 text-slate-400 border-slate-800/80" : "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
                <th className="py-4 px-6 tracking-wider">ID COMMANDE</th>
                <th className="py-4 px-6 tracking-wider">CLIENT</th>
                <th className="py-4 px-6 tracking-wider">WILAYA / COMMUNE</th>
                <th className="py-4 px-6 tracking-wider">PRODUIT</th>
                <th className="py-4 px-6 tracking-wider">LIVRAISON</th>
                <th className="py-4 px-6 tracking-wider">PRIX TOTAL</th>
                <th className="py-4 px-6 tracking-wider">STATUT</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-slate-800/80 text-slate-300" : "divide-slate-100 text-slate-700"
            }`}>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className={`transition-colors ${theme === "dark" ? "hover:bg-slate-800/20" : "hover:bg-slate-50/50"}`}>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-500">{order.id}</td>
                  <td className="py-4 px-6">
                    <div className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{order.nom}</div>
                    <div className={`text-xs font-semibold font-mono mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>{order.telephone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>{order.wilaya}</div>
                    <div className={`text-xs font-semibold ${theme === "dark" ? "text-slate-500" : "text-slate-450"}`}>{order.commune}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-bold line-clamp-1 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{order.productTitle}</div>
                    <div className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Qté: {order.quantite}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${
                      order.typeLivraison === "domicile" 
                        ? theme === "dark"
                          ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                          : "bg-sky-50 text-sky-700 border-sky-100"
                        : theme === "dark"
                          ? "bg-slate-800/50 text-slate-400 border-slate-700/50"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {order.typeLivraison === "domicile" ? "À domicile" : "Bureau (Stop)"}
                    </span>
                  </td>
                  <td className={`py-4 px-6 font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{formatPrice(order.totalPrice)}</td>
                  <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Aucune commande enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
