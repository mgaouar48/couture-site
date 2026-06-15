"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Package } from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES, Product, Badge } from "@/lib/shop-data";
import { useTheme } from "../../layout";

const PRESET_IMAGES = [
  "/images/sewing_machine.png",
  "/images/sewing_scissors.png",
  "/images/rotary_cutter.png",
  "/images/measuring_tape.png",
  "/images/sewing_ruler.png",
  "/images/accessories_kit.png"
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setLocalCategories] = useState<typeof CATEGORIES>(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { theme } = useTheme();
  
  // Form States
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("machines");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState<Badge>(null);
  const [image, setImage] = useState("/images/sewing_machine.png");
  const [imageSource, setImageSource] = useState<"preset" | "upload">("preset");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("L'image est trop volumineuse (maximum 2 Mo).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(ALL_PRODUCTS);
      localStorage.setItem("admin_products", JSON.stringify(ALL_PRODUCTS));
    }

    const storedCats = localStorage.getItem("admin_categories");
    if (storedCats) {
      setLocalCategories(JSON.parse(storedCats));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("admin_products", JSON.stringify(newProducts));
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setCategory("machines");
    setDescription("");
    setBadge(null);
    setImage("/images/sewing_machine.png");
    setImageSource("preset");
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setBadge(product.badge);
    setImage(product.image);
    if (PRESET_IMAGES.includes(product.image)) {
      setImageSource("preset");
    } else {
      setImageSource("upload");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !price.trim() || !description.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Ensure price ends with DA
    let formattedPrice = price.trim();
    if (!formattedPrice.toUpperCase().endsWith("DA")) {
      formattedPrice = formattedPrice + " DA";
    }

    if (editingProduct) {
      // Edit mode
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title,
            price: formattedPrice,
            category,
            description,
            badge,
            image,
          };
        }
        return p;
      });
      saveProducts(updated);
    } else {
      // Add mode
      const newProduct: Product = {
        id: (Date.now()).toString(),
        title,
        price: formattedPrice,
        category,
        description,
        badge,
        image,
      };
      saveProducts([newProduct, ...products]);
    }
    
    handleCloseModal();
  };

  return (
    <div className={`space-y-6 select-none ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
      {/* Header action */}
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Gérez le catalogue des produits visibles par vos clients</p>
        </div>
        <button
          onClick={openAddModal}
          className={`flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm border transition-all cursor-pointer active:scale-95 ${
            theme === "dark" 
              ? "shadow-[0_0_15px_rgba(219,39,119,0.3)] border-pink-500/30" 
              : "border-transparent shadow-sm"
          }`}
        >
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </button>
      </div>

      {/* Table Card */}
      <div className={`rounded-2xl border shadow-md overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900/40 backdrop-blur-md border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={`font-bold text-xs border-b ${
                theme === "dark" ? "bg-slate-900/60 text-slate-400 border-slate-800/80" : "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
                <th className="py-4 px-6 tracking-wider">IMAGE</th>
                <th className="py-4 px-6 tracking-wider">NOM DU PRODUIT</th>
                <th className="py-4 px-6 tracking-wider">CATÉGORIE</th>
                <th className="py-4 px-6 tracking-wider">PRIX</th>
                <th className="py-4 px-6 tracking-wider">BADGE</th>
                <th className="py-4 px-6 text-right tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-slate-800/85 text-slate-350" : "divide-slate-100 text-slate-700"
            }`}>
              {products.map((product) => (
                <tr key={product.id} className={`transition-colors ${theme === "dark" ? "hover:bg-slate-800/20" : "hover:bg-slate-50/50"}`}>
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-1.5 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="object-contain max-h-full max-w-full mix-blend-multiply"
                      />
                    </div>
                  </td>
                  <td className={`py-4 px-6 font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                    <div className="line-clamp-1">{product.title}</div>
                    <div className={`text-xs font-semibold font-mono mt-0.5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>ID: {product.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${
                      theme === "dark" 
                        ? "bg-slate-800/70 border-slate-700/50 text-slate-300" 
                        : "bg-slate-100 border-slate-200 text-slate-650"
                    }`}>
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </span>
                  </td>
                  <td className={`py-4 px-6 font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{product.price}</td>
                  <td className="py-4 px-6">
                    {product.badge ? (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        product.badge === "NOUVEAU" 
                          ? theme === "dark"
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.1)]" 
                            : "bg-sky-50 text-sky-700 border-sky-100"
                          : product.badge === "POPULAIRE"
                          ? theme === "dark"
                            ? "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]"
                            : "bg-pink-50 text-pink-700 border-pink-100"
                          : theme === "dark"
                            ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
                            : "bg-red-50 text-red-700 border-red-100"
                      }`}>
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center border ${
                        theme === "dark"
                          ? "text-slate-500 hover:text-pink-400 hover:bg-pink-500/10 border-transparent hover:border-pink-500/20"
                          : "text-slate-400 hover:text-pink-600 hover:bg-pink-50 border-transparent hover:border-pink-100"
                      }`}
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center border ${
                        theme === "dark"
                          ? "text-slate-500 hover:text-red-400 hover:bg-red-500/10 border-transparent hover:border-red-500/20"
                          : "text-slate-400 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
                      }`}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-555">
                    Aucun produit répertorié. Cliquez sur &quot;Ajouter un produit&quot; pour démarrer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl border max-w-lg w-full shadow-2xl overflow-hidden animate-in scale-in duration-200 flex flex-col max-h-[90vh] transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between transition-colors ${
              theme === "dark" ? "border-slate-800/80 bg-slate-900/40" : "border-slate-100 bg-slate-50"
            }`}>
              <h3 className={`font-extrabold text-lg tracking-tight ${theme === "dark" ? "text-white" : "text-slate-850"}`}>
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h3>
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

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-900/10">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`} htmlFor="m-title">
                  Nom du produit *
                </label>
                <input
                  id="m-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
                    theme === "dark"
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                  }`}
                  placeholder="Ex: Machine à coudre professionnelle"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`} htmlFor="m-price">
                    Prix (DA) *
                  </label>
                  <input
                    id="m-price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 font-bold transition-colors ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                        : "bg-slate-50 border-slate-200 text-slate-850 placeholder-slate-400"
                    }`}
                    placeholder="Ex: 45 000 ou 45 000 DA"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`} htmlFor="m-category">
                    Catégorie *
                  </label>
                  <select
                    id="m-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id} className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-500"
                }`} htmlFor="m-desc">
                  Description *
                </label>
                <textarea
                  id="m-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 resize-none transition-colors ${
                    theme === "dark"
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-450"
                  }`}
                  placeholder="Description détaillée du produit..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`} htmlFor="m-badge">
                    Badge promotionnel
                  </label>
                  <select
                    id="m-badge"
                    value={badge || ""}
                    onChange={(e) => setBadge(e.target.value ? e.target.value as Badge : null)}
                    className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
                      theme === "dark"
                        ? "bg-slate-950 border-slate-800 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <option value="" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Aucun</option>
                    <option value="NOUVEAU" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>NOUVEAU</option>
                    <option value="POPULAIRE" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>POPULAIRE</option>
                    <option value="PROMO" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>PROMO</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-widest mb-1.5 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}>
                    Image du produit *
                  </label>
                  
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImageSource("preset");
                        if (!PRESET_IMAGES.includes(image)) {
                          setImage("/images/sewing_machine.png");
                        }
                      }}
                      className={`flex-grow py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        imageSource === "preset"
                          ? "bg-pink-600 text-white border-pink-500 shadow-sm"
                          : theme === "dark"
                            ? "bg-slate-955 border-slate-800 text-slate-400 hover:bg-slate-800/80"
                            : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Prédéfinie
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageSource("upload");
                        if (PRESET_IMAGES.includes(image)) {
                          setImage("");
                        }
                      }}
                      className={`flex-grow py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        imageSource === "upload"
                          ? "bg-pink-600 text-white border-pink-500 shadow-sm"
                          : theme === "dark"
                            ? "bg-slate-955 border-slate-800 text-slate-400 hover:bg-slate-800/80"
                            : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Télécharger
                    </button>
                  </div>

                  {imageSource === "preset" ? (
                    <select
                      id="m-image"
                      value={PRESET_IMAGES.includes(image) ? image : "/images/sewing_machine.png"}
                      onChange={(e) => setImage(e.target.value)}
                      className={`w-full border rounded-xl text-sm py-2.5 px-4 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition-colors ${
                        theme === "dark"
                          ? "bg-slate-955 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <option value="/images/sewing_machine.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Machine à coudre</option>
                      <option value="/images/sewing_scissors.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Ciseaux couture</option>
                      <option value="/images/rotary_cutter.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Cutter rotatif</option>
                      <option value="/images/measuring_tape.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Mètre ruban / Équerre</option>
                      <option value="/images/sewing_ruler.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Règle de couture</option>
                      <option value="/images/accessories_kit.png" className={theme === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-800"}>Kit couture complet</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 shadow-xs">
                        {image && !PRESET_IMAGES.includes(image) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={image} alt="Preview" className="object-contain max-h-full max-w-full mix-blend-multiply" />
                        ) : (
                          <Package className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <div className="relative flex-grow">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className={`block w-full text-center border border-dashed rounded-xl py-2 px-3 text-[11px] font-bold cursor-pointer transition-colors ${
                            theme === "dark"
                              ? "bg-slate-950 border-slate-800 text-slate-350 hover:bg-slate-800/80"
                              : "bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {image && !PRESET_IMAGES.includes(image) ? "Changer l'image" : "Choisir un fichier"}
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className={`pt-4 border-t flex justify-end gap-3 mt-4 ${
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
                  className={`bg-pink-600 hover:bg-pink-505 text-white font-bold py-2.5 px-6 rounded-xl text-sm border transition-all cursor-pointer active:scale-95 ${
                    theme === "dark" 
                      ? "shadow-[0_0_15px_rgba(219,39,119,0.3)] border-pink-500/30" 
                      : "border-transparent"
                  }`}
                >
                  {editingProduct ? "Enregistrer" : "Créer le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
