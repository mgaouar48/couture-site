"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  FolderOpen, 
  Search, 
  X, 
  Package, 
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Palette,
  AlertTriangle
} from "lucide-react";
import { CATEGORIES, ALL_PRODUCTS, Category, Product } from "@/lib/shop-data";
import { useTheme } from "../../layout";

const COLOR_PRESETS = [
  { label: "Rose", value: "from-pink-100 to-rose-200", preview: "bg-gradient-to-tr from-pink-100 to-rose-200" },
  { label: "Ambre", value: "from-amber-100 to-yellow-200", preview: "bg-gradient-to-tr from-amber-100 to-yellow-200" },
  { label: "Ciel", value: "from-sky-100 to-blue-200", preview: "bg-gradient-to-tr from-sky-100 to-blue-200" },
  { label: "Violet", value: "from-violet-100 to-purple-200", preview: "bg-gradient-to-tr from-violet-100 to-purple-200" },
  { label: "Émeraude", value: "from-emerald-100 to-green-200", preview: "bg-gradient-to-tr from-emerald-100 to-green-200" },
  { label: "Orange", value: "from-orange-100 to-red-200", preview: "bg-gradient-to-tr from-orange-100 to-red-200" },
  { label: "Indigo", value: "from-indigo-100 to-indigo-200", preview: "bg-gradient-to-tr from-indigo-100 to-indigo-200" },
  { label: "Teal", value: "from-teal-100 to-teal-200", preview: "bg-gradient-to-tr from-teal-100 to-teal-200" },
  { label: "Fuchsia", value: "from-fuchsia-100 to-fuchsia-200", preview: "bg-gradient-to-tr from-fuchsia-100 to-fuchsia-200" },
  { label: "Lime", value: "from-lime-100 to-lime-200", preview: "bg-gradient-to-tr from-lime-100 to-lime-200" },
  { label: "Cyan", value: "from-cyan-100 to-cyan-200", preview: "bg-gradient-to-tr from-cyan-100 to-cyan-200" },
  { label: "Slate", value: "from-slate-100 to-slate-200", preview: "bg-gradient-to-tr from-slate-100 to-slate-200" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { theme } = useTheme();

  // CRUD modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formColor, setFormColor] = useState(COLOR_PRESETS[0].value);
  const [autoSlug, setAutoSlug] = useState(true);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("admin_products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Failed to parse admin_products from localStorage", e);
        setProducts(ALL_PRODUCTS);
      }
    } else {
      setProducts(ALL_PRODUCTS);
      localStorage.setItem("admin_products", JSON.stringify(ALL_PRODUCTS));
    }

    const storedCategories = localStorage.getItem("admin_categories");
    if (storedCategories) {
      try {
        setCategories(JSON.parse(storedCategories));
      } catch (e) {
        console.error("Failed to parse admin_categories from localStorage", e);
        setCategories(CATEGORIES);
      }
    } else {
      setCategories(CATEGORIES);
      localStorage.setItem("admin_categories", JSON.stringify(CATEGORIES));
    }
  }, []);

  const saveCategories = useCallback((newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem("admin_categories", JSON.stringify(newCategories));
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (autoSlug && formName) {
      setFormSlug(slugify(formName));
    }
  }, [formName, autoSlug]);

  // Compute product counts dynamically
  const dynamicCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat.id] = 0;
    });
    products.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      } else {
        counts[p.category] = 1;
      }
    });
    return counts;
  }, [products, categories]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryProducts = (catId: string) => {
    return products.filter(p => p.category === catId);
  };

  // ── Modal handlers ──────────────────────────────────────────────
  const openAddModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormColor(COLOR_PRESETS[0].value);
    setAutoSlug(true);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormColor(cat.color);
    setAutoSlug(false); // Don't overwrite existing slug during edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formSlug.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const slug = slugify(formSlug);

    // Check for duplicate slug (excluding the one being edited)
    const duplicate = categories.find(
      c => c.slug === slug && c.id !== editingCategory?.id
    );
    if (duplicate) {
      alert(`Le slug "${slug}" est déjà utilisé par la catégorie "${duplicate.name}".`);
      return;
    }

    if (editingCategory) {
      // Edit mode
      const updated = categories.map(c => {
        if (c.id === editingCategory.id) {
          return {
            ...c,
            name: formName.trim(),
            slug,
            color: formColor,
          };
        }
        return c;
      });
      saveCategories(updated);
    } else {
      // Add mode — use slug as id
      const newCategory: Category = {
        id: slug,
        name: formName.trim(),
        slug,
        icon: "folder",
        count: 0,
        color: formColor,
      };
      saveCategories([...categories, newCategory]);
    }

    handleCloseModal();
  };

  // ── Delete handlers ─────────────────────────────────────────────
  const confirmDelete = (cat: Category) => {
    setDeleteTarget(cat);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const updated = categories.filter(c => c.id !== deleteTarget.id);
    saveCategories(updated);
    setDeleteTarget(null);
  };

  // ── Shared style helpers ────────────────────────────────────────
  const inputClass = `w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
    theme === "dark"
      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
  }`;

  const labelClass = `block text-xs font-bold uppercase tracking-widest mb-1.5 ${
    theme === "dark" ? "text-slate-400" : "text-slate-500"
  }`;

  return (
    <div className={`space-y-6 select-none font-sans ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Gerez et organisez les familles de produits disponibles dans votre boutique. Les produits associés sont mis à jour en temps réel.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className={`flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm border transition-all cursor-pointer active:scale-95 flex-shrink-0 ${
            theme === "dark" 
              ? "shadow-[0_0_15px_rgba(219,39,119,0.3)] border-pink-500/30" 
              : "border-transparent shadow-sm"
          }`}
        >
          <Plus className="w-4 h-4" />
          Ajouter une catégorie
        </button>
      </div>

      {/* Search Bar */}
      <div className={`rounded-2xl border shadow-md p-4 flex gap-4 items-center justify-between transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/40 backdrop-blur-md border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
              theme === "dark"
                ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
            }`}
          />
        </div>
        
        <div className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          Total: {categories.length} familles
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const count = dynamicCounts[cat.id] ?? 0;
          return (
            <div 
              key={cat.id} 
              className={`rounded-2xl border shadow-md transition-all duration-305 p-6 flex flex-col justify-between group ${
                theme === "dark"
                  ? "bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-pink-500/30 hover:shadow-lg"
                  : "bg-white border-slate-200 hover:border-pink-500/20 hover:shadow-sm"
              }`}
            >
              <div>
                {/* Header Icon / Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center shadow-xs`}>
                    <FolderOpen className="w-5 h-5 text-slate-800" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Edit button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(cat); }}
                      className={`p-1.5 rounded-lg border opacity-0 group-hover:opacity-100 transition-all cursor-pointer ${
                        theme === "dark"
                          ? "text-slate-500 hover:text-pink-400 hover:bg-pink-500/10 border-transparent hover:border-pink-500/20"
                          : "text-slate-400 hover:text-pink-600 hover:bg-pink-50 border-transparent hover:border-pink-100"
                      }`}
                      title="Modifier la catégorie"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); confirmDelete(cat); }}
                      className={`p-1.5 rounded-lg border opacity-0 group-hover:opacity-100 transition-all cursor-pointer ${
                        theme === "dark"
                          ? "text-slate-500 hover:text-red-400 hover:bg-red-500/10 border-transparent hover:border-red-500/20"
                          : "text-slate-400 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
                      }`}
                      title="Supprimer la catégorie"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className={`border px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wide transition-colors ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 text-slate-400"
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}>
                      /{cat.slug}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className={`font-extrabold text-lg mb-1 transition-colors duration-200 ${
                  theme === "dark" ? "text-white group-hover:text-pink-400" : "text-slate-850 group-hover:text-pink-600"
                }`}>{cat.name}</h3>
                <p className="text-slate-450 text-xs font-bold uppercase tracking-widest mb-4">Famille de produits</p>
              </div>

              {/* Footer specs & action */}
              <div className={`border-t pt-4 flex items-center justify-between mt-4 ${
                theme === "dark" ? "border-slate-800/80" : "border-slate-100"
              }`}>
                <span className={`text-sm font-semibold flex items-center gap-1.5 ${theme === "dark" ? "text-slate-350" : "text-slate-600"}`}>
                  <Package className={`w-4 h-4 ${theme === "dark" ? "text-slate-550" : "text-slate-400"}`} />
                  {count} {count > 1 ? "produits" : "produit"}
                </span>
                
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1 text-xs font-bold transition-all cursor-pointer group-hover:translate-x-0.5 duration-200 ${
                    theme === "dark" ? "text-pink-400 hover:text-pink-300" : "text-pink-600 hover:text-pink-700"
                  }`}
                >
                  Voir les produits
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {filteredCategories.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <FolderOpen className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-slate-700" : "text-slate-300"}`} />
            <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
              {searchQuery ? "Aucune catégorie ne correspond à votre recherche." : "Aucune catégorie créée. Cliquez sur \"Ajouter une catégorie\" pour commencer."}
            </p>
          </div>
        )}
      </div>

      {/* ════════════════ Add / Edit Category Modal ════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl border max-w-lg w-full shadow-2xl overflow-hidden animate-in scale-in duration-200 flex flex-col max-h-[90vh] transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${formColor} flex items-center justify-center shadow-xs`}>
                  <FolderOpen className="w-4 h-4 text-slate-800" />
                </div>
                <h3 className={`font-extrabold text-lg tracking-tight ${theme === "dark" ? "text-white" : "text-slate-850"}`}>
                  {editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-transparent hover:border-slate-700/50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border-transparent hover:border-slate-200"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className={`flex-grow overflow-y-auto p-6 space-y-5 ${
              theme === "dark" ? "bg-slate-900/10" : "bg-white"
            }`}>
              {/* Category name */}
              <div>
                <label className={labelClass} htmlFor="cat-name">
                  Nom de la catégorie *
                </label>
                <input
                  id="cat-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={inputClass}
                  placeholder="Ex: Fils & Bobines"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className={labelClass} htmlFor="cat-slug">
                  Slug (URL) *
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-mono ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>/</span>
                  <input
                    id="cat-slug"
                    type="text"
                    value={formSlug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setFormSlug(e.target.value);
                    }}
                    className={inputClass}
                    placeholder="fils-bobines"
                    required
                  />
                </div>
                {autoSlug && formName && (
                  <p className={`text-[11px] mt-1 ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                    Généré automatiquement depuis le nom
                  </p>
                )}
              </div>

              {/* Color picker */}
              <div>
                <label className={labelClass}>
                  <Palette className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  Couleur de la catégorie
                </label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setFormColor(preset.value)}
                      className={`relative w-full aspect-square rounded-xl ${preset.preview} transition-all cursor-pointer border-2 ${
                        formColor === preset.value
                          ? "border-pink-500 shadow-md scale-105 ring-2 ring-pink-500/30"
                          : theme === "dark"
                            ? "border-slate-800 hover:border-slate-600"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                      title={preset.label}
                    >
                      {formColor === preset.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-pink-500 shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className={`text-[11px] mt-2 ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                  Couleur sélectionnée : <span className="font-semibold">{COLOR_PRESETS.find(p => p.value === formColor)?.label || "Personnalisée"}</span>
                </p>
              </div>

              {/* Preview */}
              <div className={`rounded-xl border p-4 transition-colors ${
                theme === "dark" ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${
                  theme === "dark" ? "text-slate-600" : "text-slate-400"
                }`}>Aperçu</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${formColor} flex items-center justify-center shadow-xs`}>
                    <FolderOpen className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <p className={`font-extrabold text-sm ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                      {formName || "Nom de la catégorie"}
                    </p>
                    <p className={`font-mono text-[11px] ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      /{formSlug || "slug"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={`pt-4 border-t flex justify-end gap-3 ${
                theme === "dark" ? "border-slate-800/80" : "border-slate-200"
              }`}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`font-semibold py-2.5 px-4 rounded-xl text-sm border transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/50"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                  }`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`bg-pink-600 hover:bg-pink-500 text-white font-bold py-2.5 px-6 rounded-xl text-sm border transition-all cursor-pointer active:scale-95 ${
                    theme === "dark" 
                      ? "shadow-[0_0_15px_rgba(219,39,119,0.3)] border-pink-500/30" 
                      : "border-transparent"
                  }`}
                >
                  {editingCategory ? "Enregistrer" : "Créer la catégorie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════ Delete Confirmation Modal ════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl border max-w-md w-full shadow-2xl overflow-hidden animate-in scale-in duration-200 transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            {/* Header */}
            <div className={`p-6 border-b flex items-center gap-3 transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-red-500/5" : "border-slate-100 bg-red-50/50"
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === "dark" ? "bg-red-500/10" : "bg-red-100"
              }`}>
                <AlertTriangle className={`w-5 h-5 ${theme === "dark" ? "text-red-400" : "text-red-600"}`} />
              </div>
              <div>
                <h3 className={`font-extrabold text-base tracking-tight ${theme === "dark" ? "text-white" : "text-slate-850"}`}>
                  Supprimer la catégorie
                </h3>
                <p className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Cette action est irréversible
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                Êtes-vous sûr de vouloir supprimer la catégorie <strong className={theme === "dark" ? "text-white" : "text-slate-800"}>« {deleteTarget.name} »</strong> ?
              </p>

              {(dynamicCounts[deleteTarget.id] ?? 0) > 0 && (
                <div className={`rounded-xl border p-3 flex items-start gap-2.5 ${
                  theme === "dark" ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"
                }`}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme === "dark" ? "text-amber-400" : "text-amber-600"}`} />
                  <p className={`text-xs leading-relaxed ${theme === "dark" ? "text-amber-300/80" : "text-amber-700"}`}>
                    <strong>{dynamicCounts[deleteTarget.id]}</strong> produit{(dynamicCounts[deleteTarget.id] ?? 0) > 1 ? "s" : ""} {(dynamicCounts[deleteTarget.id] ?? 0) > 1 ? "sont associés" : "est associé"} à cette catégorie. {(dynamicCounts[deleteTarget.id] ?? 0) > 1 ? "Ils resteront" : "Il restera"} dans le catalogue mais sans catégorie attribuée.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-6 border-t flex justify-end gap-3 transition-colors ${
              theme === "dark" ? "border-slate-800/80" : "border-slate-100"
            }`}>
              <button
                onClick={() => setDeleteTarget(null)}
                className={`font-semibold py-2.5 px-4 rounded-xl text-sm border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/50"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                }`}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className={`font-bold py-2.5 px-6 rounded-xl text-sm border transition-all cursor-pointer active:scale-95 ${
                  theme === "dark"
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] border-red-500/30"
                    : "bg-red-600 hover:bg-red-500 text-white border-transparent"
                }`}
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════ Products in Category Modal ════════════════ */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl border max-w-lg w-full shadow-2xl overflow-hidden animate-in scale-in duration-200 flex flex-col max-h-[80vh] transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${selectedCategory.color} flex items-center justify-center shadow-xs`}>
                  <FolderOpen className="w-4.5 h-4.5 text-slate-800" />
                </div>
                <h3 className={`font-extrabold text-lg tracking-tight ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                  {selectedCategory.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
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
            <div className={`flex-grow overflow-y-auto p-6 space-y-4 ${
              theme === "dark" ? "bg-slate-900/10" : "bg-white"
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Produits répertoriés ({getCategoryProducts(selectedCategory.id).length})
              </h4>
              
              <div className={`divide-y max-h-[50vh] overflow-y-auto pr-2 ${
                theme === "dark" ? "divide-slate-800/80" : "divide-slate-100"
              }`}>
                {getCategoryProducts(selectedCategory.id).map((prod) => (
                  <div key={prod.id} className={`py-3 flex items-center gap-4 rounded-lg px-2 transition-colors ${
                    theme === "dark" ? "hover:bg-slate-800/20" : "hover:bg-slate-50/50"
                  }`}>
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={prod.image} 
                        alt={prod.title} 
                        className="object-contain max-h-full max-w-full mix-blend-multiply"
                      />
                    </div>
                    {/* Title */}
                    <div className="flex-grow min-w-0">
                      <p className={`font-bold text-sm truncate ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{prod.title}</p>
                      <p className={`text-xs font-mono mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>ID: {prod.id}</p>
                    </div>
                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <span className={`font-extrabold text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{prod.price}</span>
                    </div>
                  </div>
                ))}
                
                {getCategoryProducts(selectedCategory.id).length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-8">
                    Aucun produit répertorié dans cette catégorie pour le moment.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t flex justify-end transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`font-semibold py-2 px-5 rounded-xl text-sm border transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-350 border-slate-700/50"
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
