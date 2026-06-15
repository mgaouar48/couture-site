export type Badge = "NOUVEAU" | "POPULAIRE" | "PROMO" | null;

export interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  badge: Badge;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "machines",
    name: "Machines à coudre",
    slug: "machines",
    icon: "sewing-machine",
    count: 12,
    color: "from-pink-100 to-rose-200",
  },
  {
    id: "ciseaux",
    name: "Ciseaux",
    slug: "ciseaux",
    icon: "scissors",
    count: 8,
    color: "from-amber-100 to-yellow-200",
  },
  {
    id: "regles",
    name: "Règles & mesures",
    slug: "regles",
    icon: "ruler",
    count: 6,
    color: "from-sky-100 to-blue-200",
  },
  {
    id: "accessoires",
    name: "Accessoires couture",
    slug: "accessoires",
    icon: "sparkles",
    count: 20,
    color: "from-violet-100 to-purple-200",
  },
  {
    id: "kits",
    name: "Kits couture",
    slug: "kits",
    icon: "package",
    count: 5,
    color: "from-emerald-100 to-green-200",
  },
  {
    id: "coupe",
    name: "Outils de coupe",
    slug: "coupe",
    icon: "cut",
    count: 9,
    color: "from-orange-100 to-red-200",
  },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    image: "/images/sewing_machine.png",
    title: "Machine à coudre professionnelle",
    price: "45,000 DA",
    description: "Performance et précision pour vos projets d'envergure. Idéale pour usage intensif.",
    badge: "NOUVEAU",
    category: "machines",
  },
  {
    id: "2",
    image: "/images/sewing_machine.png",
    title: "Machine à coudre compacte",
    price: "28,000 DA",
    originalPrice: "32,000 DA",
    description: "Légère et performante, parfaite pour les débutants et ateliers mobiles.",
    badge: "PROMO",
    category: "machines",
  },
  {
    id: "3",
    image: "/images/sewing_scissors.png",
    title: "Ciseaux de couture robustes",
    price: "3,500 DA",
    description: "Lame tranchante pour une découpe nette de tous tissus. Inox premium.",
    badge: null,
    category: "ciseaux",
  },
  {
    id: "4",
    image: "/images/sewing_scissors.png",
    title: "Ciseaux de broderie fins",
    price: "2,200 DA",
    description: "Précision millimétrique pour coupes délicates et broderies.",
    badge: null,
    category: "ciseaux",
  },
  {
    id: "5",
    image: "/images/rotary_cutter.png",
    title: "Cutter rotatif 45mm",
    price: "2,800 DA",
    description: "Idéal pour le patchwork et les découpes droites rapides.",
    badge: null,
    category: "coupe",
  },
  {
    id: "6",
    image: "/images/measuring_tape.png",
    title: "Mètre ruban de couture",
    price: "450 DA",
    description: "L'indispensable classique, souple, gradué recto-verso.",
    badge: null,
    category: "regles",
  },
  {
    id: "7",
    image: "/images/sewing_ruler.png",
    title: "Règle de couture transparente",
    price: "1,200 DA",
    description: "Graduations précises pour le modélisme et la retouche.",
    badge: null,
    category: "regles",
  },
  {
    id: "8",
    image: "/images/accessories_kit.png",
    title: "Kit d'accessoires complet",
    price: "5,500 DA",
    description: "Le nécessaire complet pour démarrer sereinement la couture.",
    badge: "POPULAIRE",
    category: "kits",
  },
  {
    id: "9",
    image: "/images/accessories_kit.png",
    title: "Kit débutant couture",
    price: "3,800 DA",
    description: "Tout pour débuter : aiguilles, fils, épingles et plus.",
    badge: null,
    category: "kits",
  },
  {
    id: "10",
    image: "/images/sewing_scissors.png",
    title: "Ciseaux cranteurs",
    price: "2,900 DA",
    description: "Finition anti-effilochage en un seul geste, lames inox.",
    badge: null,
    category: "ciseaux",
  },
  {
    id: "11",
    image: "/images/rotary_cutter.png",
    title: "Cutter rotatif 28mm",
    price: "2,200 DA",
    description: "Format compact pour coupes courbes et détails fins.",
    badge: "NOUVEAU",
    category: "coupe",
  },
  {
    id: "12",
    image: "/images/measuring_tape.png",
    title: "Équerre de couturière",
    price: "850 DA",
    description: "Tracés d'angles parfaits, plastique renforcé résistant.",
    badge: null,
    category: "regles",
  },
];
