const BASE = "https://dolphinaquariumandpets.com";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/care-guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/appointment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/rights`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/image-credits`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
