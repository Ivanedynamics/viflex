<script setup>
import { CONTACT_COFING } from "~/mocks/contact";
import { useFetch, useHead } from "#imports";

// Llama a la API en el mismo servidor para obtener los datos SEO
const { data: seoData } = await useFetch("/api/seo/page", {
  params: { slug: "PRIVACY" },
});

// Configura los metadatos SEO utilizando useHead
useHead(CreateSEOMetaPage(seoData?.value?.seo?.page));
</script>
<template>
  <section
    class="min-h-[320px] flex-col pt-10 flex items-center justify-center px-3"
  >
    <div class="w-full max-w-[1240px] flex flex-col gap-4 items-start">
      <h1>Política de Privacidad de Viflex Inc.</h1>
      <p><strong>Última actualización:</strong> 7 de noviembre de 2024</p>

      <p>
        En <strong>Viflex Inc.</strong>Nos comprometemos a proteger la
        privacidad y seguridad de los usuarios que utilizan nuestro sitio web y
        cotizador de productos de vinilos flexibles. Esta Política de Privacidad
        explica cómo la empresa recopila, usa, almacena y comparte la
        información personal que proporcionas al utilizar nuestros servicios.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        La empresa recopila los siguientes tipos de información cuando visitas
        nuestro sitio web o usas el cotizador de productos:
      </p>
      <ul>
        <li>
          <strong>Información personal:</strong> Cuando te registras o realizas
          una cotización, la empresa recopila tu nombre, dirección de correo
          electrónico, número de teléfono y otros datos de contacto que nos
          proporciones.
        </li>
        <li>
          <strong>Información de cotización:</strong> La empresa recopila
          detalles sobre los productos que deseas cotizar, como el tipo de
          vinilo, tamaño, cantidad y cualquier personalización adicional.
        </li>
      </ul>

      <h2>2. Cómo Utilizamos Tu Información</h2>
      <p>
        La empresa utiliza la información recopilada para los siguientes fines:
      </p>
      <ul>
        <li>
          <strong>Proveer el servicio de cotización:</strong> Para generar y
          enviarte cotizaciones personalizadas de vinilos flexibles basadas en
          las especificaciones que proporcionas.
        </li>
        <li>
          <strong>Mejorar el servicio y la experiencia del usuario:</strong>
          Analizar el comportamiento en el sitio para mejorar la funcionalidad,
          la oferta de productos y la experiencia del usuario.
        </li>
        <li>
          <strong>Envío de comunicaciones:</strong> Para enviarte cotizaciones,
          actualizaciones de productos y servicios, y otros mensajes
          relacionados con tu cotización o con los servicios de la empresa.
        </li>
        <li>
          <strong>Cumplimiento legal:</strong> Para cumplir con las leyes y
          regulaciones aplicables, resolver disputas y hacer cumplir nuestros
          acuerdos.
        </li>
      </ul>

      <h2>3. Seguridad de la Información</h2>
      <p>
        La empresa toma medidas razonables para proteger la información personal
        de los usuarios. Sin embargo, ninguna transmisión de datos por Internet
        o almacenamiento electrónico es 100% seguro. Aunque la empresa se
        esfuerza por proteger tu información personal, no puede garantizar la
        seguridad absoluta de los datos.
      </p>

      <h2>4. Tus Derechos</h2>
      <p>
        Dependiendo de la jurisdicción en la que te encuentres, puedes tener
        ciertos derechos sobre tu información personal, incluyendo el derecho a
        acceder, corregir, eliminar o limitar el uso de tu información. Si
        deseas ejercer cualquiera de estos derechos, por favor, contáctanos a
        través de los medios proporcionados a continuación.
      </p>

      <h2>5. Cookies y Tecnologías Similares</h2>
      <p>
        La empresa utiliza cookies y tecnologías similares para mejorar la
        experiencia del usuario en el sitio web. Las cookies son pequeños
        archivos de texto almacenados en tu dispositivo que permiten recordar
        tus preferencias y personalizar tu experiencia. Puedes controlar el uso
        de cookies a través de la configuración de tu navegador.
      </p>

      <h2>6. Cómo Contactarnos</h2>
      <p>
        Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer
        tus derechos sobre tus datos personales, puedes contactarnos a través
        de:
      </p>
      <ul>
        <li class="flex flex-row gap-2">
          <strong>Correo electrónico:</strong>
          <a
            class="link link-hover flex flex-row items-center gap-2"
            :href="`mailto:${CONTACT_COFING?.email?.value}`"
          >
            <p>{{ CONTACT_COFING?.email?.value }}</p>
          </a>
        </li>
        <li>
          <strong>Dirección:</strong> Viflex Ltd., Soldadores 1703 INT #24 y
          #25, La Alianza, 64103 Monterrey, N.L., México
        </li>
      </ul>
    </div>
  </section>
</template>
