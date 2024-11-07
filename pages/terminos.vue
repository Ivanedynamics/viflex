<script setup>
import { useFetch, useHead } from "#imports";

// Llama a la API en el mismo servidor para obtener los datos SEO
const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "TERMNS" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>
<template>
  <section
    class="min-h-[320px] flex-col pt-10 flex items-center justify-center px-3"
  >
    <div class="w-full max-w-[1240px] flex flex-col gap-4 items-start">
      <h1>Términos de Uso de Viflex Inc.</h1>
      <p><strong>Última actualización:</strong> 7 de noviembre de 2024</p>

      <p>
        Bienvenido al sitio web de <strong>Viflex Inc.</strong> Al acceder y
        utilizar nuestro sitio web y cotizador de productos de vinilos
        flexibles, aceptas cumplir con los siguientes Términos de Uso. Si no
        estás de acuerdo con estos términos, te recomendamos no utilizar
        nuestros servicios.
      </p>

      <h2>1. Uso del Sitio Web</h2>
      <p>
        El acceso y uso del sitio web de la empresa están destinados
        exclusivamente a fines personales y comerciales legítimos. Te
        comprometes a utilizar el sitio web de manera responsable y a no
        involucrarte en actividades que puedan dañar la plataforma o interferir
        con su funcionamiento.
      </p>

      <h2>2. Propiedad Intelectual</h2>
      <p>
        Todo el contenido, incluyendo textos, imágenes, gráficos, logotipos,
        íconos, y software en el sitio web de la empresa es propiedad de Viflex
        Inc. o sus licenciantes y está protegido por las leyes de propiedad
        intelectual. No se permite la reproducción, distribución o modificación
        del contenido sin el consentimiento previo por escrito de la empresa.
      </p>

      <h2>3. Exactitud de la Información</h2>
      <p>
        La empresa se esfuerza por proporcionar información precisa y
        actualizada en el sitio web. Sin embargo, no garantiza la precisión,
        integridad o actualidad de los datos, incluyendo precios y
        especificaciones de productos. Nos reservamos el derecho de corregir
        cualquier error en la información en cualquier momento sin previo aviso.
      </p>

      <h2>4. Limitación de Responsabilidad</h2>
      <p>
        El uso del sitio web y del cotizador es bajo tu propio riesgo. La
        empresa no será responsable de daños directos, indirectos, incidentales,
        o consecuentes que resulten del uso o la imposibilidad de usar el sitio
        web, incluso si la empresa ha sido informada de la posibilidad de tales
        daños.
      </p>

      <h2>5. Enlaces a Sitios de Terceros</h2>
      <p>
        El sitio web de la empresa puede contener enlaces a sitios web de
        terceros. Estos enlaces se proporcionan únicamente para tu conveniencia
        y no implican la aprobación o respaldo de la empresa. No nos hacemos
        responsables del contenido o prácticas de privacidad de los sitios
        enlazados.
      </p>

      <h2>6. Modificaciones a los Términos de Uso</h2>
      <p>
        La empresa se reserva el derecho de modificar estos Términos de Uso en
        cualquier momento. Las modificaciones entrarán en vigor en el momento de
        su publicación en el sitio web. Te recomendamos revisar periódicamente
        estos términos para estar informado de cualquier cambio.
      </p>
    </div>
  </section>
</template>
