"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Search, 
  Eye, 
  X, 
  User, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  FileText, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Truck,
  HelpCircle,
  XCircle,
  ChevronRight,
  Clock
} from "lucide-react";
import { useTheme } from "../../layout";

interface OrderItem {
  productId: string;
  productTitle: string;
  quantite: number;
  price: string;
  image: string;
}

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
  note?: string;
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
    note: "Faire attention au colis fragile"
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
    note: "Client injoignable après 3 appels"
  }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const stored = localStorage.getItem("admin_orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(INITIAL_MOCK_ORDERS);
      localStorage.setItem("admin_orders", JSON.stringify(INITIAL_MOCK_ORDERS));
    }
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("admin_orders", JSON.stringify(updated));
  };

  const handleUpdateStatus = (orderId: string, nextStatus: Order["status"]) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });
    saveOrders(updated);
    
    // Update active details modal if open
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: nextStatus });
    }
  };

  const formatPrice = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DA";
  };

  // Helper to determine allowed next states based on current state
  const getAllowedTransitions = (currentStatus: Order["status"]): { status: Order["status"]; label: string; color: string }[] => {
    switch (currentStatus) {
      case "pending":
        return [
          { status: "searching", label: "Lancer la recherche", color: theme === "dark" ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)] border border-blue-500/30" : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs" },
          { status: "cancelled", label: "Annuler la commande", color: theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.2)] border border-red-500/30" : "bg-red-600 hover:bg-red-700 text-white shadow-xs" }
        ];
      case "searching":
        return [
          { status: "assigned", label: "Assigner le livreur", color: theme === "dark" ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)] border border-indigo-500/30" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs" }
        ];
      case "assigned":
        return [
          { status: "on_route", label: "Mettre en route", color: theme === "dark" ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.2)] border border-purple-500/30" : "bg-purple-600 hover:bg-purple-700 text-white shadow-xs" },
          { status: "cancelled", label: "Annuler la commande", color: theme === "dark" ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.2)] border border-red-500/30" : "bg-red-600 hover:bg-red-700 text-white shadow-xs" }
        ];
      case "on_route":
        return [
          { status: "completed", label: "Marquer comme Livrée (Complétée)", color: theme === "dark" ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)] border border-emerald-500/30" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs" }
        ];
      case "completed":
      case "cancelled":
      default:
        return []; // Terminal states
    }
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: { 
        label: "En attente", 
        style: theme === "dark" 
          ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]" 
          : "bg-amber-50 text-amber-700 border-amber-200", 
        icon: Clock 
      },
      searching: { 
        label: "Recherche livreur", 
        style: theme === "dark" 
          ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]" 
          : "bg-blue-50 text-blue-700 border-blue-200", 
        icon: Search 
      },
      assigned: { 
        label: "Livreur assigné", 
        style: theme === "dark" 
          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]" 
          : "bg-indigo-50 text-indigo-700 border-indigo-200", 
        icon: User 
      },
      on_route: { 
        label: "En cours de livraison", 
        style: theme === "dark" 
          ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]" 
          : "bg-purple-50 text-purple-700 border-purple-200", 
        icon: Truck 
      },
      completed: { 
        label: "Livré", 
        style: theme === "dark" 
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
          : "bg-emerald-50 text-emerald-700 border-emerald-200", 
        icon: CheckCircle 
      },
      cancelled: { 
        label: "Annulé", 
        style: theme === "dark" 
          ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
          : "bg-red-50 text-red-700 border-red-200", 
        icon: XCircle 
      }
    };
    return configs[status] || { label: status, style: "bg-slate-50 text-slate-700 border-slate-200", icon: HelpCircle };
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.telephone.includes(searchQuery) ||
      order.productTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = selectedStatusFilter === "all" || order.status === selectedStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`space-y-6 select-none font-sans ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
      {/* Header and Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Visualisez, filtrez et gérez le cycle de vie des commandes clients.</p>
        </div>
        
        {/* Quick count pills */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className={`px-3 py-1.5 rounded-full border transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-800/80 text-slate-350 border-slate-800" : "bg-slate-100 text-slate-600 border-slate-200"
          }`}>
            Total: {orders.length}
          </span>
          <span className={`px-3 py-1.5 rounded-full border transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)]" 
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            En attente: {orders.filter(o => o.status === "pending").length}
          </span>
          <span className={`px-3 py-1.5 rounded-full border transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.05)]" 
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}>
            Assigné/En route: {orders.filter(o => o.status === "assigned" || o.status === "on_route").length}
          </span>
          <span className={`px-3 py-1.5 rounded-full border transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]" 
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            Livré: {orders.filter(o => o.status === "completed").length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`rounded-2xl border shadow-md p-4 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/40 backdrop-blur-md border-slate-800" : "bg-white border-slate-200"
      }`}>
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher (Nom, Tel, ID, Produit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
              theme === "dark"
                ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
            }`}
          />
        </div>

        {/* Status Filter Tab Pills */}
        <div className={`flex gap-1 overflow-x-auto w-full md:w-auto p-1 border rounded-xl transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-950 border-slate-850" : "bg-slate-100 border-slate-200"
        }`}>
          {[
            { id: "all", label: "Toutes" },
            { id: "pending", label: "En attente" },
            { id: "searching", label: "Recherche" },
            { id: "assigned", label: "Assignées" },
            { id: "on_route", label: "En route" },
            { id: "completed", label: "Livrées" },
            { id: "cancelled", label: "Annulées" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatusFilter === tab.id
                  ? theme === "dark"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-white text-slate-800 shadow-xs"
                  : theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-850/50"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className={`rounded-2xl border shadow-md overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/40 backdrop-blur-md border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={`font-bold text-xs border-b ${
                theme === "dark" ? "bg-slate-900/60 text-slate-400 border-slate-800/80" : "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
                <th className="py-4 px-6 tracking-wider">ID COMMANDE</th>
                <th className="py-4 px-6 tracking-wider">DATE</th>
                <th className="py-4 px-6 tracking-wider">CLIENT</th>
                <th className="py-4 px-6 tracking-wider">WILAYA / COMMUNE</th>
                <th className="py-4 px-6 tracking-wider">PRODUIT</th>
                <th className="py-4 px-6 tracking-wider">LIVRAISON</th>
                <th className="py-4 px-6 tracking-wider">TOTAL</th>
                <th className="py-4 px-6 tracking-wider">STATUT</th>
                <th className="py-4 px-6 text-right tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-slate-800/85 text-slate-300" : "divide-slate-100 text-slate-700"
            }`}>
              {filteredOrders.map((order) => {
                const config = getStatusConfig(order.status);
                const StatusIcon = config.icon;
                return (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className={`transition-colors cursor-pointer ${theme === "dark" ? "hover:bg-slate-800/20" : "hover:bg-slate-50/50"}`}
                  >
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-500">{order.id}</td>
                    <td className="py-4 px-6 text-slate-400 font-medium whitespace-nowrap">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{order.nom}</div>
                      <div className={`text-xs font-semibold font-mono mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>{order.telephone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-750"}`}>{order.wilaya}</div>
                      <div className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-450"}`}>{order.commune}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`font-bold line-clamp-1 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{order.productTitle}</div>
                      <div className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Quantité: {order.quantite}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${
                        order.typeLivraison === "domicile" 
                          ? theme === "dark"
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                            : "bg-sky-50 text-sky-700 border-sky-100"
                          : theme === "dark"
                            ? "bg-slate-800/50 text-slate-400 border-slate-700/50"
                            : "bg-slate-100 text-slate-650 border-slate-200"
                      }`}>
                        {order.typeLivraison === "domicile" ? "À domicile" : "Bureau (Stop)"}
                      </span>
                    </td>
                    <td className={`py-4 px-6 font-extrabold whitespace-nowrap ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${config.style}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className={`p-2 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center border ${
                          theme === "dark"
                            ? "text-slate-500 hover:text-pink-400 hover:bg-pink-500/10 border-transparent hover:border-pink-500/20"
                            : "text-slate-400 hover:text-pink-655 hover:bg-pink-50 border-transparent hover:border-pink-100"
                        }`}
                        title="Détails de la commande"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    Aucune commande ne correspond à votre recherche ou filtre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl border max-w-2xl w-full shadow-2xl overflow-hidden animate-in scale-in duration-200 flex flex-col max-h-[90vh] transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className={`font-bold text-lg tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>Détails de la Commande</h3>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    theme === "dark" 
                      ? "bg-slate-955 border-slate-800 text-slate-400" 
                      : "bg-slate-100 border-slate-200 text-slate-600"
                  }`}>
                    {selectedOrder.id}
                  </span>
                </div>
                <div className={`text-xs font-semibold mt-1.5 flex items-center gap-1 ${
                  theme === "dark" ? "text-slate-500" : "text-slate-400"
                }`}>
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Reçue le {selectedOrder.date}
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-transparent hover:border-slate-700/50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border-transparent hover:border-slate-200"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-900/10">
              
              {/* Order Status Timeline Banner */}
              <div className={`border rounded-xl p-4 transition-colors ${
                theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Statut Actuel</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusConfig(selectedOrder.status).style}`}>
                    {getStatusConfig(selectedOrder.status).label}
                  </span>
                </div>

                {/* Transitions workflow actions */}
                <div className="space-y-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Mettre à jour le statut (Règles métiers Supabase) :</h4>
                  <div className="flex flex-wrap gap-2">
                    {getAllowedTransitions(selectedOrder.status).map((t) => (
                      <button
                        key={t.status}
                        onClick={() => handleUpdateStatus(selectedOrder.id, t.status)}
                        className={`text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-all shadow-xs active:scale-95 flex items-center gap-1.5 ${t.color}`}
                      >
                        <span>{t.label}</span>
                        <ChevronRight className="w-3 h-3 opacity-70" />
                      </button>
                    ))}
                    
                    {getAllowedTransitions(selectedOrder.status).length === 0 && (
                      <p className={`text-xs font-semibold italic ${theme === "dark" ? "text-slate-555" : "text-slate-500"}`}>
                        {selectedOrder.status === "completed" 
                          ? "Commande complétée avec succès. Aucune transition supplémentaire."
                          : "Cette commande a été annulée. Aucune transition possible."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customer Card */}
                <div className={`border rounded-xl p-4 space-y-3 transition-colors ${
                  theme === "dark" ? "border-slate-855 bg-slate-950/20" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-center gap-2 text-pink-500 font-bold border-b pb-2 transition-colors border-slate-800/10 dark:border-slate-800">
                    <User className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Client</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Nom Complet</span>
                      <span className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedOrder.nom}</span>
                    </div>
                    <div>
                      <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Téléphone</span>
                      <a href={`tel:${selectedOrder.telephone}`} className={`font-bold hover:underline inline-flex items-center gap-1 ${
                        theme === "dark" ? "text-pink-400" : "text-pink-600"
                      }`}>
                        <Phone className="w-3.5 h-3.5" /> {selectedOrder.telephone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Delivery Card */}
                <div className={`border rounded-xl p-4 space-y-3 transition-colors ${
                  theme === "dark" ? "border-slate-855 bg-slate-950/20" : "border-slate-200 bg-white"
                }`}>
                  <div className="flex items-center gap-2 text-pink-500 font-bold border-b pb-2 transition-colors border-slate-800/10 dark:border-slate-800">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Livraison</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Wilaya</span>
                        <span className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedOrder.wilaya}</span>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Commune</span>
                        <span className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedOrder.commune}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Mode de livraison</span>
                      <span className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                        {selectedOrder.typeLivraison === "domicile" ? "À domicile" : "Au bureau (Stop Desk Yalidine)"}
                      </span>
                    </div>
                    {selectedOrder.typeLivraison === "domicile" && selectedOrder.adresse && (
                      <div>
                        <span className={`text-xs font-semibold block ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>Adresse Domicile</span>
                        <span className={`font-medium ${theme === "dark" ? "text-slate-350" : "text-slate-700"}`}>{selectedOrder.adresse}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Order details and product card */}
              <div className={`border rounded-xl p-4 space-y-4 transition-colors ${
                theme === "dark" ? "border-slate-800 bg-slate-950/20" : "border-slate-200 bg-white"
              }`}>
                <div className="flex items-center gap-2 text-pink-500 font-bold border-b pb-2 transition-colors border-slate-800/10 dark:border-slate-800">
                  <ShoppingBag className="w-4 h-4 text-pink-500" />
                  <span className="text-sm">Produits commandés</span>
                </div>
                
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-3.5">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm pb-3 border-b border-dashed border-outline-variant/20 last:border-none last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 bg-white rounded border border-outline-variant/20 p-1 flex-shrink-0 flex items-center justify-center">
                            <Image 
                              src={item.image} 
                              alt={item.productTitle} 
                              fill 
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h5 className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{item.productTitle}</h5>
                            <p className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                              Quantité: {item.quantite} × {item.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${theme === "dark" ? "text-slate-205" : "text-slate-700"}`}>
                            {formatPrice((parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0) * item.quantite)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-outline-variant/20">
                      <span className={`text-xs font-semibold ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Total articles ({selectedOrder.quantite}) :</span>
                      <span className={`font-extrabold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                        {formatPrice(selectedOrder.items.reduce((sum, item) => sum + (parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0) * item.quantite, 0))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <h5 className={`font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedOrder.productTitle}</h5>
                      <p className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-slate-555" : "text-slate-400"}`}>Quantité commandée: {selectedOrder.quantite}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30 text-sm">
                  <span className={`text-xs font-bold ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Total Facturé :</span>
                  <div className="text-right">
                    <span className={`font-extrabold text-lg ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{formatPrice(selectedOrder.totalPrice)}</span>
                    <span className={`text-[10px] block font-bold ${theme === "dark" ? "text-slate-555" : "text-slate-400"}`}>TTC (Livraison incluse)</span>
                  </div>
                </div>
              </div>

              {/* Optional client note */}
              {selectedOrder.note && (
                <div className={`border rounded-xl p-4 space-y-2 transition-all ${
                  theme === "dark" 
                    ? "border-amber-500/20 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)] text-amber-400" 
                    : "border-amber-100 bg-amber-50/50 text-amber-800"
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Instructions de livraison</span>
                  </div>
                  <p className={`text-sm italic font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                    &quot;{selectedOrder.note}&quot;
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t flex justify-end transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <button
                onClick={() => setSelectedOrder(null)}
                className={`font-semibold py-2 px-5 rounded-xl text-sm border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/50"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                }`}
              >
                Fermer
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
