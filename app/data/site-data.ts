// ─── Site-wide Constants ───────────────────────────────────

export const SITE = {
  name: "StudioBina",
  tagline: "Konsultan Arsitektur & Perancang",
  year: 2026,
  location: "Lombok Timur, Indonesia",
  address: "Selong, Kabupaten Lombok Timur, Nusa Tenggara Barat",
  phone: "+62 812 3456 7890",
  email: "hello@studiobina.id",
  url: "https://konsultan-web-alpiant.vercel.app",
  est: "EST. 2020",
  keywords: [
    "Arsitek Lombok Timur",
    "Konsultan Arsitektur NTB",
    "Desain Rumah Minimalis Lombok",
    "Arsitektur Swiss Indonesia",
    "Jasa DED NTB",
    "Studio Arsitektur Selong",
    "Architectural Consultant Lombok",
  ],
  image: "/swiss_architecture_hero_1772712304283.png",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/studiobina",
  behance: "https://behance.net/studiobina",
  linkedin: "https://linkedin.com/company/studiobina",
} as const;

export const NAV_LINKS = ["Beranda", "Karya", "Metodologi", "Kontak"] as const;

// ─── Services ──────────────────────────────────────────────

export interface Service {
  num: string;
  label: string;
  desc: string;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    label: "Arsitektur",
    desc: "Perancangan struktur yang mengintegrasikan fungsi dan estetika murni.",
  },
  {
    num: "02",
    label: "Detailing",
    desc: "Presisi tinggi dalam Gambar Kerja (DED) untuk realisasi tanpa cela.",
  },
  {
    num: "03",
    label: "Masterplan",
    desc: "Pengembangan lahan strategis berskala besar dengan visi berkelanjutan.",
  },
];

// ─── Projects ──────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  size: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Residence L01",
    category: "Residensial",
    year: "2025",
    image: "/swiss_architecture_hero_1772712304283.png",
    size: "650m²",
  },
  {
    id: "02",
    title: "V-Pavilion",
    category: "Interiors",
    year: "2024",
    image: "/modern_villa_interior_1772712323735.png",
    size: "120m²",
  },
  {
    id: "03",
    title: "G-Studio Facade",
    category: "Komersial",
    year: "2025",
    image: "/architectural_detail_geometric_1772712343974.png",
    size: "1200m²",
  },
];

// ─── Social Links ──────────────────────────────────────────

export const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

// ─── Contact Form Categories ───────────────────────────────

export const PROJECT_TYPES = ["Residensial", "Komersial", "Interior"] as const;
