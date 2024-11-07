import type { ISeoPage } from "~/server/api/models";

export const CreateSEOMetaPage = (seo: ISeoPage | undefined | null) => {
  return {
    title: seo?.title || "Título predeterminado",

    meta: [
      // Meta description
      {
        name: "description",
        content: seo?.description || "Descripción predeterminada",
      },
      // Open Graph / Facebook
      {
        property: "og:title",
        content: seo?.title || "Título OG predeterminado",
      },
      {
        property: "og:description",
        content: seo?.description || "Descripción OG predeterminada",
      },
      {
        property: "og:image",
        content: seo?.image || "/default-image.jpg",
      },
      {
        property: "og:url",
        content: seo?.url || "https://tu-sitio.com/pagina-ejemplo",
      },
      {
        property: "og:type",
        content: "website", // Cambia a "article" si es una página de blog o artículo
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: seo?.title || "Título Twitter predeterminado",
      },
      {
        name: "twitter:description",
        content: seo?.description || "Descripción Twitter predeterminada",
      },
      {
        name: "twitter:image",
        content: seo?.image || "/default-image.jpg",
      },
      // Keywords (opcional, aunque ya no tan relevante para SEO)
      {
        name: "keywords",
        content: seo?.keywords || "palabra clave 1, palabra clave 2",
      },
      // Autor (para artículos o blogs)
      {
        name: "author",
        content: seo?.author || "Nombre del autor",
      },
      // Robots (para indexación)
      {
        name: "robots",
        content: "index, follow",
      },
      // Datos estructurados (JSON-LD para mejorar el SEO en Google)
      {
        hid: "structured-data",
        // type: "application/ld+json",
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: seo?.title || "Título estructurado predeterminado",
          description:
            seo?.description || "Descripción estructurada predeterminada",
          url: seo?.url || "https://tu-sitio.com/pagina-ejemplo",
          image: seo?.image || "/default-image.jpg",
          author: {
            "@type": "Person",
            name: seo?.author || "Nombre del autor",
          },
          publisher: {
            "@type": "Organization",
            name: "Nombre de tu organización",
            logo: {
              "@type": "ImageObject",
              url: "/logo.jpg", // Cambia a la URL de tu logo
            },
          },
        }),
      },
    ],
    link: [
      // Canonical URL
      {
        rel: "canonical",
        href: seo?.url || "https://tu-sitio.com/pagina-ejemplo",
      },
    ],
  };
};
