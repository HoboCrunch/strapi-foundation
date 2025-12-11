const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface FetchOptions {
  endpoint: string;
  query?: Record<string, string>;
  revalidate?: number | false;
  tags?: string[];
}

export async function fetchStrapi<T>({
  endpoint,
  query = {},
  revalidate = 60,
  tags = [],
}: FetchOptions): Promise<StrapiResponse<T>> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi fetch failed: ${response.statusText}`);
  }

  return response.json();
}

export function getStrapiMedia(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}
