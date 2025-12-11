export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
  metaImage?: StrapiImage;
  structuredData?: Record<string, unknown>;
}

export interface StrapiPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: unknown[];
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: unknown[];
  featuredImage?: StrapiImage;
  author?: StrapiAuthor;
  category?: StrapiCategory;
  seo?: StrapiSEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  bio?: string;
  avatar?: StrapiImage;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}
