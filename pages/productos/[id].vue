<script setup lang="ts">
import { useForm } from "vee-validate";
import { CONTACT_COFING } from "~/mocks/contact";
import { useCartStore } from "~/store/cart";
import type { IFrontProduct } from "~/types/front";
import { capitalizeText } from "~/utils/capitalize";
import { object, string } from "yup";

const route = useRoute();
const response = await useFetch<{ product: IFrontProduct }>(
  `/api/getProductById?productById=${route?.params?.id}`
);
const data = response?.data?.value;

const product = computed(() => {
  return {
    name: data?.product?.name,
    descripcion: data?.product?.descripcion,
    colores: data?.product?.color,
    measures: data?.product?.medida,
    clave: data?.product?.clave,
    categoria: data?.product?.category,
    presentacion: data?.product?.presentacion,
    descripcion_larga: data?.product?.descripcion_larga,
    images: data?.product?.images,
  };
});
const viewImage = ref(product.value?.images?.[0] ?? null);

const { setProduct } = useCartStore();

const url = useRequestURL();

const message = computed(() => {
  return `¡Hola! Me gustaría obtener más información sobre este producto: ${url}. ¿Podrías ayudarme, por favor?`;
});

const { errors, handleSubmit, defineField, handleReset } = useForm({
  initialValues: {
    presentationId: "",
    measureId: "",
    colorId: "",
  },
  validationSchema: object({
    presentationId: string().required("Debes escoger una presentacion"),
    measureId: string().required("Debes escoger una medida"),
    colorId: string().required("Debes escoger un color"),
  }),
  initialTouched: {
    presentationId: false, // touched
    measureId: false, // non-touched
    colorId: false,
  },
});

type Values = {
  presentationId: string;
  measureId: string;
  colorId: string;
};

const onSubmit = (values: Values) => {
  const product = data?.product;
  if (!product) {
    return;
  }
  const color = product?.color?.find((e) => e?.id === values?.colorId);
  const medida = product?.medida?.find((e) => e?.id === values?.measureId);
  const presentacion = product?.presentacion?.find(
    (e) => e?.id === values?.presentationId
  );

  if (!color || !medida || !presentacion) {
    return;
  }
  setProduct({
    product,
    selection: {
      color,
      medida,
      presentacion,
    },
  });

  handleReset();
};

const handleFormSubmit = () => {
  handleSubmit(onSubmit)();
};
const [presentationId] = defineField("presentationId");
const [measureId] = defineField("measureId");
const [colorId] = defineField("colorId");
</script>

<template>
  <main class="flex-col pt-5 flex items-center justify-center px-3 mb-20">
    <div class="w-full max-w-[1240px] grid grid-cols-4 gap-2 grid-rows-1">
      <section class="col-1 col-span-2 gap-2">
        <div
          :class="`sticky top-24 w-full gap-2 grid ${
            Number(product?.images?.length) > 1
              ? ' grid-cols-[50px,1fr]'
              : ' grid-cols-[1fr]'
          }`"
        >
          <aside
            v-if="Number(product?.images?.length) > 1"
            class="flex flex-col w-full gap-2"
          >
            <div
              v-for="img in product?.images"
              :key="`image-preview-product-${img?.id}`"
              class="bg-gray-200 w-[50px] h-[50px] rounded-md border-primary border-2"
              :style="{
                borderColor:
                  viewImage?.id === img?.id
                    ? 'rgb(41 91 172 / var(--tw-border-opacity))'
                    : 'transparent',
              }"
              @click="() => (viewImage = img)"
            >
              <img
                :src="img?.image_url"
                class="w-full h-full object-contain mix-blend-darken"
                alt=""
                srcset=""
              />
            </div>
          </aside>
          <figure
            class="w-full h-[520px] bg-gray-200 rounded-md flex items-center justify-center"
          >
            <img
              v-if="viewImage?.image_url"
              :src="viewImage?.image_url"
              class="w-full h-full object-contain mix-blend-darken"
              alt=""
              srcset=""
            />
            <p v-else class="opacity-50">No hay imagenes disponibles</p>
          </figure>
        </div>
      </section>

      <section class="col-3 col-span-2 p-2 flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p
            class="text-gray-400 font-bold"
            v-for="c in product?.clave"
            :key="`clave-product-${c}`"
          >
            #{{ c }}
          </p>
          <p class="font-bold text-2xl">{{ capitalizeText(product?.name) }}</p>
          <p>
            {{ product?.descripcion }}
          </p>
        </div>
        <a
          target="_blank"
          :href="`https://wa.me/${
            CONTACT_COFING.whatsapp?.format
          }?text=${encodeURIComponent(message)}`"
          class="bg-[#25d366] w-fit p-2 px-4 flex flex-row gap-2 items-center rounded-sm"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.05 4.91006C18.1332 3.98399 17.0412 3.24973 15.8376 2.75011C14.6341 2.25049 13.3431 1.99552 12.04 2.00006C6.57999 2.00006 2.12999 6.45006 2.12999 11.9101C2.12999 13.6601 2.58999 15.3601 3.44999 16.8601L2.04999 22.0001L7.29999 20.6201C8.74999 21.4101 10.38 21.8301 12.04 21.8301C17.5 21.8301 21.95 17.3801 21.95 11.9201C21.95 9.27006 20.92 6.78006 19.05 4.91006ZM12.04 20.1501C10.56 20.1501 9.10999 19.7501 7.83999 19.0001L7.53999 18.8201L4.41999 19.6401L5.24999 16.6001L5.04999 16.2901C4.22773 14.977 3.79113 13.4593 3.78999 11.9101C3.78999 7.37006 7.48999 3.67006 12.03 3.67006C14.23 3.67006 16.3 4.53006 17.85 6.09006C18.6175 6.85402 19.2257 7.76272 19.6394 8.76348C20.0531 9.76425 20.264 10.8372 20.26 11.9201C20.28 16.4601 16.58 20.1501 12.04 20.1501ZM16.56 13.9901C16.31 13.8701 15.09 13.2701 14.87 13.1801C14.64 13.1001 14.48 13.0601 14.31 13.3001C14.14 13.5501 13.67 14.1101 13.53 14.2701C13.39 14.4401 13.24 14.4601 12.99 14.3301C12.74 14.2101 11.94 13.9401 11 13.1001C10.26 12.4401 9.76999 11.6301 9.61999 11.3801C9.47999 11.1301 9.59999 11.0001 9.72999 10.8701C9.83999 10.7601 9.97999 10.5801 10.1 10.4401C10.22 10.3001 10.27 10.1901 10.35 10.0301C10.43 9.86006 10.39 9.72006 10.33 9.60006C10.27 9.48006 9.76999 8.26006 9.56999 7.76006C9.36999 7.28006 9.15999 7.34006 9.00999 7.33006H8.52999C8.35999 7.33006 8.09999 7.39006 7.86999 7.64006C7.64999 7.89006 7.00999 8.49006 7.00999 9.71006C7.00999 10.9301 7.89999 12.1101 8.01999 12.2701C8.13999 12.4401 9.76999 14.9401 12.25 16.0101C12.84 16.2701 13.3 16.4201 13.66 16.5301C14.25 16.7201 14.79 16.6901 15.22 16.6301C15.7 16.5601 16.69 16.0301 16.89 15.4501C17.1 14.8701 17.1 14.3801 17.03 14.2701C16.96 14.1601 16.81 14.1101 16.56 13.9901Z"
              fill="black"
            />
          </svg>
          <p class="font-bold text-black">Consulta por WhatsApp</p>
        </a>

        <section
          class="border p-3 rounded-lg flex flex-col max-w-[320px] gap-4 mt-5"
        >
          <p class="font-bold text-lg">Agregar al cotizador</p>
          <article class="w-full flex flex-col">
            <label for="presentation" class="text-sm font-bold"
              >Presentacion</label
            >
            <div class="border p-2 rounded-lg">
              <select id="presentation" class="w-full" v-model="presentationId">
                <option disabled value="">Selecciona una opción</option>

                <option v-for="p in product?.presentacion" :value="p.id">
                  {{ capitalizeText(p.value) }}
                </option>
              </select>
            </div>
            <span
              v-if="errors.presentationId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.presentationId }}</span
            >
          </article>
          <div class="w-full flex flex-col">
            <label for="measure" class="text-sm font-bold">Medidas</label>
            <div class="border p-2 rounded-lg">
              <select id="measure" class="w-full" v-model="measureId">
                <option disabled value="">Selecciona una opción</option>
                <option v-for="p in product?.measures" :value="p.id">
                  {{ capitalizeText(p?.name) }}
                </option>
              </select>
            </div>
            <span
              v-if="errors.measureId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.measureId }}</span
            >
          </div>
          <div class="w-full flex flex-col">
            <label for="colors" class="text-sm font-bold">Colores</label>
            <div class="border p-2 rounded-lg">
              <select id="colors" class="w-full" v-model="colorId">
                <option disabled value="">Selecciona una opción</option>

                <option v-for="p in product?.colores" :value="p.id">
                  {{ capitalizeText(p?.nombre) }}
                </option>
              </select>
            </div>
            <span
              v-if="errors.colorId"
              class="text-red-500 font-bold text-xs py-2"
              >{{ errors.colorId }}</span
            >
          </div>
          <button
            @click="handleFormSubmit"
            :class="'mt-2 w-full text-sm flex flex-row justify-center items-center gap-2 bg-primary hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded'"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 151 151"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M99.0937 81.7917C99.0937 80.5402 98.5966 79.3399 97.7117 78.455C96.8267 77.5701 95.6265 77.0729 94.375 77.0729H56.625C55.3735 77.0729 54.1733 77.5701 53.2883 78.455C52.4034 79.3399 51.9062 80.5402 51.9062 81.7917C51.9062 83.0431 52.4034 84.2434 53.2883 85.1283C54.1733 86.0133 55.3735 86.5104 56.625 86.5104H94.375C95.6265 86.5104 96.8267 86.0133 97.7117 85.1283C98.5966 84.2434 99.0937 83.0431 99.0937 81.7917ZM99.0937 106.958C99.0937 105.707 98.5966 104.507 97.7117 103.622C96.8267 102.737 95.6265 102.24 94.375 102.24H56.625C55.3735 102.24 54.1733 102.737 53.2883 103.622C52.4034 104.507 51.9062 105.707 51.9062 106.958C51.9062 108.21 52.4034 109.41 53.2883 110.295C54.1733 111.18 55.3735 111.677 56.625 111.677H94.375C95.6265 111.677 96.8267 111.18 97.7117 110.295C98.5966 109.41 99.0937 108.21 99.0937 106.958Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.0418 14.1562C39.453 14.1563 35.0522 15.9791 31.8074 19.2239C28.5626 22.4687 26.7397 26.8695 26.7397 31.4583V119.542C26.7397 124.13 28.5626 128.531 31.8074 131.776C35.0522 135.021 39.453 136.844 44.0418 136.844H106.959C111.547 136.844 115.948 135.021 119.193 131.776C122.438 128.531 124.261 124.13 124.261 119.542V50.132C124.261 47.7349 123.48 45.407 122.033 43.4943L103.171 18.529C102.145 17.1707 100.817 16.0689 99.2933 15.3102C97.7693 14.5515 96.0902 14.1565 94.3877 14.1562H44.0418ZM36.1772 31.4583C36.1772 27.1171 39.7006 23.5937 44.0418 23.5937H89.6564V51.2582C89.6564 53.863 91.7704 55.977 94.3752 55.977H114.823V119.542C114.823 123.883 111.3 127.406 106.959 127.406H44.0418C39.7006 127.406 36.1772 123.883 36.1772 119.542V31.4583Z"
                fill="white"
              />
            </svg>
            Agregar
          </button>
        </section>
        <div class="mt-10">
          <p class="font-bold">Sobre este artículo</p>
          <p>
            {{ product?.descripcion_larga }}
          </p>
        </div>
      </section>
    </div>
  </main>
  <ExploreProducts />
  <AboutUs />
  <Contact />
</template>
