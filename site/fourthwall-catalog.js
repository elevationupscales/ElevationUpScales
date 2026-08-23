const STOREFRONT = "https://elevationupscales-shop.fourthwall.com";

const products = [
  ["signature-collection-golden-moon-tee", "Signature Collection Golden Moon Tee", 18.45, "apparel", "assets/logo.webp"],
  ["gold-collection-hoodie", "Gold Collection Hoodie", 36.24, "apparel", "assets/logo.webp"],
  ["elevation-upscales-4k-die-cut-stickers", "Elevation Upscales 4k Die Cut Stickers", 6.78, "stickers", "assets/store/stickers.webp"],
  ["signature-collection-bull-vs-bear-hoodie", "Signature Collection Bull vs Bear Hoodie", 47.66, "apparel", "assets/logo.webp"],
  ["signature-collection-emblem-tee", "Signature Collection Emblem Tee", 24.40, "apparel", "assets/logo.webp"],
  ["signature-gold-patch-brand-hoodie", "Signature Gold Patch Brand Hoodie", 36.80, "apparel", "assets/logo.webp"],
  ["bull-vs-bear-mountain-clash-mug", "Bull vs Bear Mountain Clash Mug", 8.95, "accessories", "assets/logo.webp"],
  ["elevation-polar-bear-hoodie", "Elevation Signature Series Polar Bear Hoodie", 56.08, "apparel", "assets/store/featured-hoodie-back-mockup.webp"],
  ["bull-polar-bear-sunset-clash-sweatshirt", "Bull & Polar Bear Sunset Clash Sweatshirt", 43.02, "apparel", "assets/logo.webp"],
  ["elevation-upscales-bull-vs-bear-crest-patch", "Elevation Upscales Bull vs Bear Crest Patch", 11.95, "accessories", "assets/logo.webp"],
  ["elevation-upscales-tie-die-bull-vs-bear-logo-tee", "Elevation Upscales Tie Die Bull vs Bear Logo Tee", 23.33, "apparel", "assets/logo.webp"],
  ["elevation-upscales-vintage-bull-bear-crest-jacket", "Elevation Upscales Vintage Bull & Bear Crest Jacket", 55.00, "apparel", "assets/logo.webp"],
  ["elevation-upscales-signature-pom-pom-beanie", "Elevation Upscales Signature Pom-Pom Beanie", 19.99, "headwear", "assets/logo.webp"],
  ["black-and-gold-signature-t-shirt", "Black and Gold Signature T- Shirt", 18.45, "apparel", "assets/store/signature-tshirt-preview.webp"],
  ["golden-bear-and-bull-snapback", "Golden Bear and Bull SnapBack", 25.00, "headwear", "assets/store/hat-coming-soon.webp"],
  ["elevation-golden-bear-and-bull-hoodie", "Elevation Golden Bear and Bull Hoodie", 40.00, "apparel", "assets/logo.webp"],
  ["elevation-upscales-true-grit-trucker-hat", "Elevation Upscales True Grit Trucker Hat", 27.99, "headwear", "assets/store/true-grit-trucker-hat-approved.webp"],
  ["elevation-upscales-4k-wall-art", "Elevation Upscales 4k Wall art", 55.00, "wall-art", "assets/store/combined-brand-wall-art.webp"],
  ["polar-bear-elevation-upscales-4k-wall-art", "Polar Bear Elevation Upscales 4k Wall art", 45.00, "wall-art", "assets/store/polar-bear-wall-art.webp"],
  ["golden-bull-elevation-upscales-4k-wall-art", "Golden Bull Elevation Upscales 4k Wall art", 45.00, "wall-art", "assets/store/golden-bull-wall-art.webp"],
  ["emergency-response-4k-wall-art", "Emergency Response 4k Wall art", 45.00, "wall-art", "assets/store/emergency-wall-art.webp"],
  ["elevationupscales-kiss-cut-stickers", "ElevationUpscales Kiss Cut Stickers", 10.29, "stickers", "assets/store/stickers.webp"],
  ["elevationupscales-trucker-hat", "ElevationUpscales Trucker Hat", 23.00, "headwear", "assets/store/signature-hat.webp"],
  ["signature-trucker-hat", "Signature Trucker Hat", 14.00, "headwear", "assets/store/premium-hat.webp"],
];

export function fourthwallCatalog() {
  return products.map(([slug, name, price, category, image]) => ({
    id: `fourthwall-${slug}`,
    slug,
    name,
    price,
    category,
    image,
    url: `${STOREFRONT}/products/${slug}`,
    description: "Official Elevation UpScales product fulfilled through Fourthwall.",
  }));
}

export function fourthwallCatalogResponse() {
  const items = fourthwallCatalog();
  return Response.json({
    products: items,
    count: items.length,
    source: "fourthwall-verified-snapshot",
    storefront: STOREFRONT,
  }, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
