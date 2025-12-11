import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // TODO: Add dynamic routes from Strapi (blog posts, services, etc.)
  // const blogPosts = await fetchStrapi<StrapiBlogPost[]>({ endpoint: '/blog-posts' });
  // const blogRoutes = blogPosts.data.map((post) => ({
  //   url: `${siteConfig.url}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  return [...staticRoutes];
}
