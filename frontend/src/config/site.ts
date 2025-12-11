export const siteConfig = {
  name: "OpSprocket",
  description: "OpSprocket - Your trusted partner for operational excellence",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://opsprocket.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/opsprocket",
    linkedin: "https://linkedin.com/company/opsprocket",
  },
  keywords: [
    "operations",
    "business automation",
    "workflow optimization",
    "OpSprocket",
  ] as string[],
};

export type SiteConfig = typeof siteConfig;
